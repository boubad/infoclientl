// elementdesc.ts
//
import {InfoElement} from './infoelement';
import {IElementDesc, IUIManager, IDatabaseManager} from 'infodata';
//
export class ElementDesc extends InfoElement implements IElementDesc {
    //
    private _id: string;
    private _rev: string;
    private _url: string;
    private _selected: boolean;
    private _deleted: boolean;
    private _avatarid: string;
    private _desc: string;
    //
    constructor(oMap?: any) {
        super();
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap._id !== undefined) {
                this._id = oMap._id;
            }
            if (oMap._rev !== undefined) {
                this._rev = oMap._rev;
            }
            if (oMap._deleted !== undefined) {
                this._deleted = oMap._deleted;
            }
            if (oMap.avatarid !== undefined) {
                this._avatarid = oMap.avatarid;
            }
            if (oMap.description !== undefined) {
                this._desc = oMap.description;
            }
        }// oMap
    }// constructor
    //
    public to_map(oMap: any): void {
        if ((oMap !== undefined) && (oMap !== null)) {
            oMap._id = this.id;
            oMap._rev = this.rev;
            oMap.avatarid = this.avatarid;
            oMap.description = this.description;
            oMap.type = this.type();
        }
    }
    public from_map(oMap: any): void {
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap._id !== undefined) {
                this._id = oMap._id;
            }
            if (oMap._rev !== undefined) {
                this._rev = oMap._rev;
            }
            if (oMap._deleted !== undefined) {
                this._deleted = oMap._deleted;
            }
            if (oMap.avatarid !== undefined) {
                this._avatarid = oMap.avatarid;
            }
            if (oMap.description !== undefined) {
                this._desc = oMap.description;
            }
        }// oMap
    }
    //
    public type(): string {
        return null;
    }
    public base_prefix(): string {
        return 'element';
    }
    public start_key(): string {
        return this.base_prefix();
    }
    public end_key(): string {
        let s = this.start_key();
        if (s !== null) {
            s = s + '\uffff';
        }
        return s;
    }
    protected set_id_rev(id: string, rev: string) {
        this._id = id;
        this._rev = rev;
    }
    protected get_text(): string {
        return null;
    }
    public create_id(): string {
        return null;
    }
    public avatardocid(): string {
        return this.id;
    }
    //
    public get id(): string {
        return (this._id !== undefined) ? this._id : null;
    }
    public get rev(): string {
        return (this._rev !== undefined) ? this._rev : null;
    }
    public get description(): string {
        return (this._desc !== undefined) ? this._desc : null;
    }
    public set description(s: string) {
        this._desc = ((s !== undefined) && (s !== null)) ? s.trim() : null;
    }
    public get avatarid(): string {
        return (this._avatarid !== undefined) ? this._avatarid : null;
    }
    public set avatarid(s: string) {
        this._avatarid = (s !== undefined) ? s : null;
    }
    public get text(): string {
        return this.get_text();
    }
    public get url(): string {
        return (this._url !== undefined) ? this._url : null;
    }
    public set url(s: string) {
        this._url = (s !== undefined) ? s : null;
    }
    public get has_url(): boolean {
        return (this.url !== null) && (this.url.trim().length > 0);
    }
    public get selected(): boolean {
        return ((this._selected !== undefined) && (this._selected !== null)) ?
            this._selected : false;
    }
    public set selected(s: boolean) {
        this._selected = ((s !== undefined) && (s !== null)) ? s : false;
    }
    public get deleted(): boolean {
        return ((this._deleted !== undefined) && (this._deleted !== null)) ?
            this._deleted : false;
    }
    //
    public check_id(): void {
        if (this.id === null) {
            this._id = this.create_id();
        }
    }
    //
    public get sort_func(): (p1: IElementDesc, p2: IElementDesc) => number {
        return ElementDesc.g_sort_func;
    }
    public toString(): string {
        return this.text;
    } // toString
    public static g_sort_func(p1: IElementDesc, p2: IElementDesc): number {
        let nRet = -1;
        if ((p1 !== undefined) && (p1 !== null)) {
            if ((p2 !== undefined) && p2 !== null) {
                let s1 = p1.text;
                let s2 = p2.text;
                if ((s1 !== null) && (s2 !== null)) {
                    return s1.localeCompare(s2);
                } else if (s1 === null) {
                    nRet = 1;
                }
            }// p2
        } else {
            nRet = 1;
        }
        return nRet;
    }// sort_func
    public check_url(service: IDatabaseManager, man: IUIManager): Promise<ElementDesc> {
        if (this.url !== null) {
            return Promise.resolve(this);
        }
        let id = this.avatardocid();
        let attid = this.avatarid;
        if ((id === null) || (attid === null)) {
            return Promise.resolve(this);
        }
        let self = this;
        return service.dm_find_attachment(id, attid).then((data) => {
            if ((data !== undefined) && (data !== null)) {
                self.url = man.createUrl(data);
            }
            return self;
        });
    }
} // class ElementDesc
//
