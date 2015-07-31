//personmodel.ts
import {InfoUserInfo} from './infouserinfo';
import {BaseEditViewModel} from './baseeditmodel';
import {EMPTY_STRING} from '../utils/infoconstants';
import {IPerson, IDepartementPerson, IDepBasePerson, IUIManager} from 'infodata';
//
export class PersonViewModel<T extends IDepartementPerson, V extends IDepBasePerson>
    extends BaseEditViewModel<T> {
    //
    private _current_person: V = null;
    //
    constructor(userinfo: InfoUserInfo) {
        super(userinfo);
        this._current_person = this.create_person();
    }
	public canActivate(params, routeConfig, navigationInstruction): any {
		let bRet = false;
		if (super.canActivate(params, routeConfig, navigationInstruction)) {
			bRet = (this.departements.length > 0);
		}
		return bRet;
	}// canActivate
    //
    protected perform_activate(): Promise<any> {
        let self = this;
        return super.perform_activate().then((r) => {
            self.choose_departement = true;
            return true;
        });
    }
    //
    protected post_change_departement(): Promise<any> {
        let self = this;
        return super.post_change_departement().then((r) => {
            self.modelItem.departementid = self.departementid;
            self.currentItem = this.create_item();
            return self.refreshAll();
        });
    }
    public get isEditItem(): boolean {
        return (this.currentPerson !== null) &&
            (this.currentPerson.id !== null) && (this.currentPerson.rev !== null) &&
            (this.currentItem !== null) &&
            (this.currentItem.id !== null) && (this.currentItem.rev !== null);
    }
    public set isEditItem(s: boolean) { }
    public get currentPerson(): V {
        return this._current_person;
    }
    public set currentPerson(s: V) {
        this._current_person = ((s !== undefined) && (s !== null)) ?
            s : this.create_person();
    }
    public get avatarUrl(): string {
        return (this.currentPerson != null) ? this.currentPerson.url : null;
    }
    public set avatarUrl(s: string) { }
    //
    public reset_password(): any {
        let x: IPerson = this.currentPerson;
        let id = (x !== null) ? x.id : null;
        if ((id === null) || (x.rev === null)) {
            return;
        }
        let self = this;
        let service = this.dataService;
        this.clear_error();
        return service.dm_find_item_by_id(id, true).then((pPers: IPerson) => {
            pPers.reset_password();
            return service.dm_maintains_item(pPers);
        }).then((r) => {
            self.infoMessage = 'Mot de passe modifié.';
        }).catch((err) => {
            self.set_error(err);
        });
    }// reset_password
    //
    public saveAvatar(): any {
        let f = this.fileDesc;
        let p = this.currentPerson;
        let pp = this.currentItem;
        if ((f === null) || (p === null) || (pp === null)) {
            return;
        }
        if ((p.id === null) || (p.rev === null) || (!f.is_storeable)) {
            return;
        }
        let id = p.id;
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
            pp.avatarid = avatarid;
            return service.dm_maintains_item(p);
        }).then((xx) => {
            return service.dm_maintains_item(pp);
        }).then((px) => {
            p.url = self.fileDesc.remove_url();
            pp.url = p.url;
            self.fileDesc.clear();
            self.infoMessage = 'Avatar modifié.';
        }).catch((err) => {
            self.set_error(err);
        });
    }// saveAvatar
    //
    public removeAvatar(): any {
        let p = this.currentPerson;
        let pp = this.currentItem;
        if ((p === null) || (pp === null)) {
            return;
        }
        if ((p.id === null) || (p.rev === null)) {
            return;
        }
        if ((pp.id === null) || (pp.rev === null)) {
            return;
        }
        let id = p.id;
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
            }).then((xx) => {
                pp.avatarid = null;
                return service.dm_maintains_item(pp);
            }).then((x) => {
                self.fileDesc.clear();
                self.infoMessage = 'Avatar supprimé.';
            }).catch((err) => {
                self.set_error(err);
            });
        }
    }

    //
    protected create_person(): V {
        return null;
    }
    protected post_change_item(): Promise<any> {
        this.currentPerson = null;
        let self = this;
        let p = this.currentItem;
        let personid = (p !== null) ? p.personid : null;
        return super.post_change_item().then((r) => {
            if (personid !== null) {
                return self.dataService.dm_find_item_by_id(personid);
            } else {
                return null;
            }
        }).then((pPers: V) => {
            self.currentPerson = ((pPers !== undefined) && (pPers !== null)) ? pPers :
                self.create_person();
            return self.retrieve_one_avatar(self.currentPerson);
        }).then((r) => {
            return true;
        });

    }// post_change_item
    protected is_refresh(): boolean {
        return (this.departementid !== null);
    }
    protected is_storeable(): boolean {
        return (this.currentPerson !== null) &&
            this.currentPerson.is_storeable() && (this.departementid !== null);
    }
    public get username(): string {
        return (this.currentPerson !== null) ? this.currentPerson.username : null;
    }
    public set username(s: string) {
        let x = this.currentPerson;
        if (x !== null) {
            x.username = s;
        }
    }
    public get firstname(): string {
        return (this.currentPerson !== null) ? this.currentPerson.firstname : null;
    }
    public set firstname(s: string) {
        let x = this.currentPerson;
        if (x !== null) {
            x.firstname = s;
        }
        if ((x !== null) && (this.currentItem !== null)) {
            this.currentItem.firstname = x.firstname;
        }
    }
    public get lastname(): string {
        return (this.currentPerson !== null) ? this.currentPerson.lastname : null;
    }
    public set lastname(s: string) {
        let x = this.currentPerson;
        if (x !== null) {
            x.lastname = s;
        }
        if ((x !== null) && (this.currentItem !== null)) {
            this.currentItem.lastname = x.lastname;
        }
    }
    public get email(): string {
        return (this.currentPerson !== null) ? this.currentPerson.email : null;
    }
    public set email(s: string) {
        let x = this.currentPerson;
        if (x !== null) {
            x.email = s;
        }
    }
    public get phone(): string {
        return (this.currentPerson !== null) ? this.currentPerson.phone : null;
    }
    public set phone(s: string) {
        let x = this.currentPerson;
        if (x !== null) {
            x.phone = s;
        }
    }
    public save(): Promise<any> {
        let pPers = this.currentPerson;
        if ((this.departementid === null) || (pPers === null)) {
             return Promise.resolve(false);
        }
        if (!pPers.is_storeable()) {
            return Promise.resolve(false);
        }
        let item = this.currentItem;
        if (item === null) {
            item = this.create_item();
            if (item === null) {
                return Promise.resolve(false);
            }
        }
        if (pPers.password === null) {
            pPers.reset_password();
        }
        var self = this;
        let bOld = (item.rev !== null);
        this.clear_error();
        let service = this.dataService;
        return service.dm_maintains_item(pPers).then((px: IPerson) => {
            item.personid = px.id;
            item.departementid = self.departementid;
            item.lastname = px.lastname;
            item.firstname = px.firstname;
            item.avatarid = px.avatarid;
            return item.save(service);
        }).then((ox) => {
            if (bOld) {
                return self.refresh();
            } else {
                return self.refreshAll();
            }
        }).catch((err) => {
            self.set_error(err);
            return false;
        });
    }// save
}// class PersonViewModel
