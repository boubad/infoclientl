//rootconsultmodel.ts
//
import {InfoUserInfo} from './infouserinfo';
import {InfoBaseView} from './infobaseview';
import {FileDesc} from '../utils/filedesc';
import {IElementDesc, IFileDesc} from 'infodata';
//
const DEFAULT_PAGE_SIZE: number = 10;
//
export class RootConsultViewModel<T extends IElementDesc> extends InfoBaseView {
    //
    private _items: T[];
    private _current_item: T;
    private _model: T;
    private _fileDesc: IFileDesc;
    //
    private _page_size: number;
    private _current_page: number;
    private _pages_count: number;
    private _allIds: string[];
    private _in_refresh: boolean;
    private _in_activate: boolean;
    //
    public hasItems: boolean;
    public hasPages: boolean;
    public canPrevPage: boolean;
    public canNextPage: boolean;
    public pageStatus: string;
    //
    constructor(userinfo: InfoUserInfo) {
        super(userinfo);
        this._fileDesc = new FileDesc();
        this._items = [];
        this._current_item = this.create_item();
        this._model = this.create_item();
        this._page_size = DEFAULT_PAGE_SIZE;
        this._current_page = 0;
        this._pages_count = 0;
        this._allIds = [];
        this.hasItems = false;
        this.hasPages = false;
        this.canPrevPage = false;
        this.canNextPage = false;
        this.pageStatus = null;
        this._in_refresh = false;
        this._in_activate = false;
    }
    //
    protected get is_in_activate(): boolean {
        return this._in_activate;
    }
    //
    protected get_start_key(): string {
        return this.modelItem.start_key();
    }
    protected get_end_key(): string {
        return this.modelItem.end_key();
    }
    //
    protected get_all_ids(): Promise<string[]> {
        let model = this.modelItem;
        let startKey = this.get_start_key();
        let endKey = this.get_end_key();
        return this.dataService.dm_get_ids(startKey, endKey);
    }// get_all_ids
    //
    protected get fileDesc(): IFileDesc {
        if ((this._fileDesc === undefined) || (this._fileDesc === null)) {
            this._fileDesc = new FileDesc();
        }
        return this._fileDesc;
    }
    protected get modelItem(): T {
        if ((this._model === undefined) || (this._model === null)) {
            this._model = this.create_item();
        }
        return (this._model !== undefined) ? this._model : null;
    }
    protected get defaultPageSize(): number {
        return DEFAULT_PAGE_SIZE;
    }
    //
    protected post_change_item(): Promise<any> {
        return Promise.resolve(true);
    }// post_change_item
    protected create_item(): T {
        return null;
    }
    public get allIds(): string[] {
        return ((this._allIds !== undefined) && (this._allIds !== null)) ? this._allIds : [];
    }
    public set allIds(s: string[]) {
        this._allIds = ((s !== undefined) && (s !== null) && (s.length > 0)) ? s : [];
    }
    public get items(): T[] {
        return ((this._items !== undefined) && (this._items !== null)) ? this._items : [];
    }
    public set items(s: T[]) {
        this._items = ((s !== undefined) && (s !== null) && (s.length > 0)) ? s : [];
    }
    public get currentItem(): T {
        if ((this._current_item === undefined) || (this._current_item === null)) {
            this._current_item = this.create_item();
            if (this._current_item === undefined) {
                this._current_item = null;
            }
        }
        return this._current_item;
    }
    public set currentItem(s: T) {
        this._current_item = ((s !== undefined) && (s !== null)) ? s : this.create_item();
        this.fileDesc.clear();
        let self = this;
        this.retrieve_one_avatar(this.currentItem).then((x) => {
            return self.post_change_item();
        }).catch((err) => {
            self.set_error(err);
        });
    }
    //
    protected is_refresh(): boolean {
        return true;
    }
    protected perform_activate(): Promise<any> {
        let self = this;
        return super.perform_activate().then((x) => {
            if ((self.departement === null) && (self.departements.length > 0)) {
                self.departement = self.departements[0];
            }
            if ((self.annee === null) && (self.annees.length > 0)) {
                self.annee = self.annees[0];
            }
            if ((self.unite === null) && (self.unites.length > 0)) {
                self.unite = self.unites[0];
            }
            if ((self.matiere === null) && (self.matieres.length > 0)) {
                self.matiere = self.matieres[0];
            }
            if ((self.semestre === null) && (self.semestres.length > 0)) {
                self.semestre = self.semestres[0];
            }
            if ((self.groupe === null) && (self.groupes.length > 0)) {
                self.groupe = self.groupes[0];
            }
            return true;
        });
    }
    //
    public get canShowForm(): boolean {
        return this.is_refresh();
    }
    public canActivate(params?: any, config?: any, instruction?: any): any {
        return (this.is_connected);
    }// canActivate
    public activate(params?: any, config?: any, instruction?: any): any {
        this._in_activate = true;
        let self = this;
        return super.activate(params, config, instruction).then((r) => {
            return self.perform_activate();
        }).then((x) => {
            return self.refreshAll();
        }).then((x) => {
            self._in_activate = false;
            return true;
        }).catch((err) => {
            self.set_error(err);
            self._in_activate = false;
            return false;
        });
    }// activate
    public refresh(): Promise<any> {
        if (!this.is_refresh()) {
            return Promise.resolve(true);
        }
        if (this._in_refresh) {
            return Promise.resolve(true);
        }
        this._in_refresh = true;
        this.pageStatus = null;
        this.canPrevPage = false;
        this.canNextPage = false;
        let oldid = (this.currentItem !== null) ? this.currentItem.id : null;
        let startKey = null;
        let endKey = null;
        let nbItems = this.allIds.length;
        let nc = this.itemsPerPage;
        let istart = (this.currentPage - 1) * nc;
        if ((istart >= 0) && (istart < nbItems)) {
            startKey = this.allIds[istart];
        }
        let iend = istart + nc - 1;
        if (iend >= nbItems) {
            iend = nbItems - 1;
        }
        if ((iend >= 0) && (iend < nbItems)) {
            endKey = this.allIds[iend];
        }
        if ((startKey === null) || (endKey === null)) {
            this._in_refresh = false;
            return Promise.resolve(true);
        }
        this.clear_error();
        let self = this;
        return this.dataService.dm_get_items(startKey, endKey).then((rr) => {
            let rx = ((rr !== undefined) && (rr !== null)) ? rr : [];
            return self.retrieve_avatars(rx);
        }).then((xx: T[]) => {
            self.items = xx;
            self.canPrevPage = (self.currentPage > 1);
            self.canNextPage = (self.currentPage < self.pagesCount);
            self.pageStatus = (self.pagesCount > 1) ?
                ('Page ' + self.currentPage + ' sur ' + self.pagesCount) : null;
            let p = self.sync_array(self.items, oldid);
            self.currentItem = (p !== null) ? p : self.create_item();
            self._in_refresh = false;
            return true;
        }).catch((err) => {
            self.set_error(err);
            self._in_refresh = false;
            return false;
        })
    }// refresh

    protected prepare_refresh(): void {
        this.allIds = [];
        this._pages_count = 0;
        this._current_page = 0;
        this.items = [];
        this.hasItems = false;
        this.hasPages = false;
        this.currentItem = this.create_item();
    }
    public refreshAll(): Promise<any> {
        this.prepare_refresh();
        if (!this.is_refresh()) {
            return Promise.resolve(true);
        }
        let nc = this.itemsPerPage;
        let self = this;
        return this.get_all_ids().then((ids) => {
            self.allIds = ((ids !== undefined) && (ids !== null)) ? ids : [];
            let nt = self.allIds.length;
            self.hasItems = (nt > 0);
            let np = Math.floor(nt / nc);
            if ((np * nc) < nt) {
                ++np;
                self.pagesCount = np;
            }
            self.hasPages = (np > 1);
            self.canPrevPage = false;
            self.canNextPage = false;
            return self.refresh();
        }).catch((err) => {
            self.set_error(err);
        })
    }// refreshAll

    public get pagesCount(): number {
        return ((this._pages_count !== undefined) && (this._pages_count !== null) &&
            (this._pages_count >= 0)) ? this._pages_count : 0;
    }
    public set pagesCount(s: number) {
        this._pages_count = ((s !== undefined) && (s !== null) && (s >= 0)) ? s : 0;
    }
    public get itemsPerPage(): number {
        return ((this._page_size !== undefined) && (this._page_size !== null) && (this._page_size > 0)) ?
            this._page_size : DEFAULT_PAGE_SIZE;
    }
    public set itemsPerPage(s: number) {
        let n = this.check_number(s);
        if ((n !== null) && (n > 0) && (n != this._page_size)) {
            this._page_size = n;
            this.refreshAll();
        }
    }
    public get currentPage(): number {
        return ((this._current_page !== undefined) && (this._current_page !== null) &&
            (this._current_page >= 0)) ? this._current_page + 1 : 1;
    }
    public set currentPage(s: number) {
        let n = this.check_number(s);
        if ((n !== null) && (n > 0)) {
            --n;
            if ((n >= 0) && (n != this._current_page)) {
                this._current_page = n;
                this.refresh();
            }
        }// n
    }// set currentPage
    public firstPage(): void {
        if (this.currentPage > 1) {
            this.currentPage = 1;
        }
    }
    public prevPage(): void {
        if (this.currentPage > 1) {
            let n = this.currentPage - 1;
            this.currentPage = n;
        }
    }
    public nextPage(): void {
        let n = this.currentPage;
        if (n < this._pages_count) {
            this.currentPage = n + 1;
        }
    }// nextPage
    public lastPage(): void {
        let n = this.currentPage;
        if (n < this._pages_count) {
            this.currentPage = this._pages_count;
        }
    }
}//
