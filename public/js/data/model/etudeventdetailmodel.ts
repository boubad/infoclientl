//etudeventdetail.ts
//
import {InfoUserInfo} from './infouserinfo';
import {BaseDetailModel} from './basedetailmodel';
import {EtudEvent} from '../domain/etudevent';
import {GroupeEvent} from '../domain/groupeevent';
import {IGroupeEvent, IEtudEvent, IBaseItem, ISemestre,
IDepartement, IUnite, IMatiere, IAnnee, IGroupe} from 'infodata';

//
export class EtudEventDetailModel extends BaseDetailModel {
    //
    private _item: IEtudEvent = null;
    private _groupeevent: IGroupeEvent = null;
    private _canedit: boolean = false;
    //
    constructor(userinfo: InfoUserInfo) {
        super(userinfo);
        this.title = "Détails Evènement";
    }
    public activate(params?: any, config?: any, instruction?: any): any {
        let self = this;
        this._item = new EtudEvent();
        this._groupeevent = new GroupeEvent();
        this._canedit = false;
        let id: string = null;
        if (params.id !== undefined) {
            id = params.id;
        }
        let personid = this.userInfo.personid;
        this.clear_error();
        let service = this.dataService;
        return super.activate(params, config, instruction).then((r) => {
            return service.dm_find_item_by_id(id, true);
        }).then((p: IEtudEvent) => {
            if ((p !== undefined) && (p !== null)) {
                self.currentItem = p;
            }
            return self.retrieve_one_avatar(self.currentItem);
        }).then((xx) => {
            let id1 = self.currentItem.groupeeventid;
            return service.dm_find_item_by_id(id1);
        }).then((gvt: IGroupeEvent) => {
            self._groupeevent = ((gvt !== undefined) && (gvt !== null)) ? gvt : null;
            self._canedit = (self._groupeevent.personid == personid);
            return self.initialize_etudevent(self.currentItem);
        });
    }// activate
    public deactivate(): any {
        if (this.currentItem.url !== null) {
            this.revokeUrl(this.currentItem.url);
            this.currentItem.url = null;
        }
        return super.deactivate();
    }
    public get groupeeventid(): string {
        return this.currentItem.groupeeventid;
    }
    public get currentItem(): IEtudEvent {
        return this._item;
    }
    public set currentItem(s: IEtudEvent) {
        this._item = ((s !== undefined) && (s !== null)) ? s : new EtudEvent();
    }
    public get hasUrl(): boolean {
        return (this.currentItem.url !== null);
    }// hasUrl
    public get fullname(): string {
        return this.currentItem.fullname;
    }
    public set hasUrl(s: boolean) { }
    public get url(): string {
        return this.currentItem.url;
    }
    public get eventDate(): string {
        return this.date_to_string(this.currentItem.eventDate);
    }
    public set eventDate(s: string) {
        this.currentItem.eventDate = this.string_to_date(s);
    }
    public get minDate(): string {
        return this.date_to_string(this._groupeevent.eventDate);
    }
    public get genre(): string {
        return this.currentItem.genre;
    }
    public set genre(s: string) {
        this.currentItem.genre = s;
    }
    public get observations(): string {
        return this.currentItem.description;
    }
    public set observations(s: string) {
        this.currentItem.description = s;
    }
    public get note(): string {
        return this.number_to_string(this.currentItem.note);
    }
    public set note(s: string) {
        this.currentItem.note = this.string_to_number(s);
    }
    public get is_note(): boolean {
        return (this.currentItem.genre == 'note');
    }
    public set is_note(s: boolean) { }
    public get is_event(): boolean {
        return (this.currentItem.genre != 'note');
    }
    public set is_event(s: boolean) { }
    //
    public get canSave(): boolean {
        return (this.currentItem.is_storeable() && this.canEdit);
    }
    public set canSave(s: boolean) { }
    public get cannotSave(): boolean {
        return (!this.canSave);
    }
    public set cannotSave(s: boolean) { }
    public save(): any {
        let item = this.currentItem;
        if (!item.is_storeable()) {
            return false;
        }
        var self = this;
        this.clear_error();
        return this.dataService.dm_maintains_item(item).then((r) => {
            self.infoMessage = 'Element modifiÃ©';
            return true;
        }, (err) => {
            self.set_error(err);
            return false;
        });
    }// save
    public get canEdit(): boolean {
        return this._canedit;
    }
    public set canEdit(s: boolean) { }
    public get cannotEdit():boolean {
      return (!this.canEdit);
    }
    public set cannotEdit(s:boolean){}
    //
    public get groupeEventName(): string {
        return (this._groupeevent !== null) ? this._groupeevent.name : null;
    }
}// class Profgroupeevents
