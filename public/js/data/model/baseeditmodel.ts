//baseeditmodel.ts
//
import {InfoUserInfo} from './infouserinfo';
import {RootConsultViewModel} from './rootconsultmodel';
import {IBaseItem, IFileDesc, IUIManager, IInfoMessage} from 'infodata';
//
export class BaseEditViewModel<T extends IBaseItem> extends RootConsultViewModel<T> {
    private _add_mode: boolean;
    private _old_item: T;
    //
    constructor(userinfo: InfoUserInfo) {
        super(userinfo);
        this._add_mode = false;
        this._old_item = null;
    }
    //
    protected prepare_refresh(): void {
        super.prepare_refresh();
        this._add_mode = false;
        this._old_item = null;
    }
    public refresh(): Promise<any> {
        let self = this;
        return super.refresh().then((r) => {
            this.addMode = (self.allIds.length < 1);
        });
    }// refresh
    //
    protected is_storeable(): boolean {
        return (this.currentItem !== null) && this.currentItem.is_storeable();
    }
    public get isEditable(): boolean {
        return this.is_admin;
    }
    public set isEditable(s:boolean){}
    public get isReadOnly(): boolean {
        return (!this.isEditable);
    }
    public get avatarUrl(): string {
        return (this.currentItem != null) ? this.currentItem.url : null;
    }
    public set avatarUrl(s: string) { }
    public get hasAvatarUrl(): boolean {
        return (this.avatarUrl !== null);
    }
    public get canRemoveAvatar(): boolean {
        return this.isEditable && (this.currentItem !== null) && (this.currentItem.id !== null) &&
            (this.currentItem.rev !== null) && (this.currentItem.avatarid !== null);
    }
    public get cannotRemoveAvatar(): boolean {
        return (!this.canRemoveAvatar);
    }
    public get canSaveAvatar(): boolean {
        return this.isEditable && (this.currentItem !== null) && (this.currentItem.rev !== null) &&
            (this.currentItem.id !== null) && this.fileDesc.is_storeable;
    }
    public get cannotSaveAvatar(): boolean {
        return (!this.canSaveAvatar);
    }
    public get workingUrl(): string {
        return this.fileDesc.url;
    }
    public get hasWorkingUrl(): boolean {
        return (this.workingUrl !== null);
    }
    public get isEditItem(): boolean {
        return (this.currentItem !== null) &&
            (this.currentItem.id !== null) && (this.currentItem.rev !== null);
    }
    public set isEditItem(s: boolean) { }
    public avatarFileChanged(event: any): any {
        this.fileDesc.changed(event);
    }// fileChanged
    public removeAvatar(): any {
        let p = this.currentItem;
        if (p === null) {
            return;
        }
        if ((p.id === null) || (p.rev === null)) {
            return;
        }
        let id = p.avatardocid();
        let avatarid = p.avatarid;
        if ((id === null) || (avatarid === null)) {
            return;
        }
        if (this.confirm('Voulez-vous vraiment supprimer cet avatar?')) {
            let self = this;
            let service = this.dataService;
            this.clear_error();
            return service.dm_remove_attachment(id, avatarid).then((r) => {
                if (p.url !== null) {
                    self.revokeUrl(p.url);
                    p.url = null;
                }
                p.avatarid = null;
                return service.dm_maintains_item(p);
            }).then((x) => {
                self.fileDesc.clear();
                self.infoMessage = 'Avatar supprimé!.';
            }).catch((err) => {
                self.set_error(err);
            });
        }
    }
    public saveAvatar(): any {
        let f = this.fileDesc;
        let p = this.currentItem;
        if ((f === null) || (p === null)) {
            return;
        }
        if ((p.id === null) || (p.rev === null) || (!f.is_storeable)) {
            return;
        }
        let id = p.avatardocid();
        if (id === null) {
            return;
        }
        let avatarid = f.name;
        let type = f.type;
        let data = f.data;
        if ((avatarid === null) || (type === null) || (data === null)) {
            return;
        }
        let service = this.dataService;
        this.clear_error();
        let self = this;
        return service.dm_maintains_attachment(id, avatarid, data, type).then((r) => {
            p.avatarid = avatarid;
            return service.dm_maintains_item(p);
        }).then((px) => {
            p.url = self.fileDesc.remove_url();
            self.fileDesc.clear();
            self.infoMessage = 'Avatar modifié!.';
        }).catch((err) => {
            self.set_error(err);
        });
    }// saveAvatar
    protected get oldItem(): T {
        return this._old_item;
    }
    protected set oldItem(s: T) {
        this._old_item = (s !== undefined) ? s : null;
    }
    protected get addMode(): boolean {
        return this._add_mode;
    }
    protected set addMode(b: boolean) {
        this._add_mode = b;
    }
    public get canAdd(): boolean {
        return (!this.addMode) && this.isEditable;
    }
    public addNew(): any {
        this.oldItem = this.currentItem;
        this.currentItem = this.create_item();
        this.addMode = true;
    }
    public get canCancel(): boolean {
        return this.addMode;
    }
    public get cannotCancel(): boolean {
        return (!this.canCancel);
    }
    public cancel_add(): void {
        this.currentItem = this.oldItem;
        this.addMode = false;
    }
    public cancel(): void {
        this.cancel_add();
    }
    public get canRemove(): boolean {
        return this.isEditItem && this.isEditable;
    }
    public set canRemove(s: boolean) { }
    public get cannotRemove(): boolean {
        return (!this.canRemove);
    }
    public get canSave(): boolean {
        return this.is_storeable() && this.isEditable;
    }
    public set canSave(s: boolean) { }
    public get cannotSave(): boolean {
        return (!this.canSave);
    }
    //
    public save(): Promise<any> {
        let item = this.currentItem;
        if (item === null) {
             return Promise.resolve(false);
        }
        if (!item.is_storeable()) {
             return Promise.resolve(false);
        }
        var self = this;
        this.clear_error();
        return item.save(this.dataService).then((r) => {
            return self.refreshAll();
        }).catch((err) => {
            self.set_error(err);
            return false;
        });
    }// save
    public remove(): Promise<any> {
        let item = this.currentItem;
        if (item === null) {
            return Promise.resolve(false);
        }
        if ((item.id === null) || (item.rev === null)) {
             return Promise.resolve(false);
        }
        if (this.confirm('Voulez-vous vraiment supprimer ' + item.id + '?')) {
            let self = this;
            this.clear_error();
            return item.remove(this.dataService).then((r) => {
                return self.refreshAll();
            }, (err) => {
                return self.set_error(err);
            });
        } else {
			 return Promise.resolve(false);
		}
    }// remove
    public get description(): string {
        return (this.currentItem !== null) ? this.currentItem.description : null;
    }
    public set description(s: string) {
        let x = this.currentItem;
        if (x !== null) {
            x.description = s;
        }
    }
}// class BaseEditViewModel
