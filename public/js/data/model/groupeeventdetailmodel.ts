// groupeeventdetailmodel.ts
import {InfoUserInfo} from './infouserinfo';
import {BaseDetailModel} from './basedetailmodel';
import {IGroupeEvent, IEtudEvent, IUIManager, IBaseItem} from 'infodata';
import {EtudiantPerson} from '../domain/etudperson';
import {EtudEvent} from '../domain/etudevent';
import {GroupeEvent} from '../domain/groupeevent';

export class GroupeEventDetailModel extends BaseDetailModel {
  //
  public notes: IEtudEvent[] = [];
  public evts: IEtudEvent[] = [];
  private _evt_model: IEtudEvent = null;
  public currentItem: IGroupeEvent = null;
  //
  constructor(userinfo:InfoUserInfo) {
    super(userinfo);
    this.title = "Détails Devoirs";
  }
  public activate(params?: any, config?: any, instruction?: any): any {
    let self = this;
    if (this._evt_model === null) {
      this._evt_model = new EtudEvent();
    }
    if ((this.currentItem !== null) && (this.currentItem.url !== null)) {
      this.revokeUrl(this.currentItem.url);
      this.currentItem.url = null;
    }
    if (this.currentItem === null) {
      this.currentItem = new GroupeEvent();
    }
    this.notes = [];
    this.evts = [];
    let id: string = null;
    if (params.id !== undefined) {
      id = params.id;
    }
    return super.activate(params, config, instruction).then((r) => {
      return self.dataService.dm_find_item_by_id(id, true);
    }).then((p: IGroupeEvent) => {
      if (p !== null) {
        self.currentItem = p;
        self.title = p.name;
      }
      return self.retrieve_one_avatar(self.currentItem);
    }).then((xx) => {
      return self.fill_notes();
    }).then((x)=>{
      return self.initialize_groupeevent(self.currentItem);
    })
  }// activate
  public deactivate(): any {
    if ((this.currentItem !== null) && (this.currentItem.url !== null)) {
      this.uiManager.revokeUrl(this.currentItem.url);
      this.currentItem.url = null;
    }
    return super.deactivate();
  }
  public get hasUrl(): boolean {
    return (this.currentItem.url !== null);
  }// hasUrl
  public set hasUrl(s: boolean) { }
  public get url(): string {
    return this.currentItem.url;
  }
  protected fill_notes(): Promise<any> {
    this.notes = [];
    this.evts = [];
    let x = this.currentItem;
    let id = (x !== null) ? x.id : null;
    if (id === null) {
      return Promise.resolve(true);
    }
    let model = this._evt_model;
    model.groupeeventid = id;
    let self = this;
    return this.dataService.dm_get_items(model.start_key(),model.end_key()).then(( xx: IEtudEvent[]) => {
      let rx = ((xx !== undefined) && (xx !== null)) ? xx : [];
      return self.retrieve_avatars(rx);
    }).then((ee: IEtudEvent[]) => {
      if ((ee !== undefined) && (ee !== null)) {
        let xee = self.filter_etudevents(ee);
        for (let x of xee) {
          if (x.genre.toLowerCase() == 'note') {
            self.add_to_array(self.notes, x);
          } else {
            self.add_to_array(self.evts, x);
          }
        }// e
      }// ee
      return true;
    });
  }
  public get genre(): string {
    return (this.currentItem !== null) ? this.currentItem.genre : "";
  }
  public set genre(s: string) {
  }
  public get name(): string {
    return (this.currentItem !== null) ? this.currentItem.name : "";
  }
  public set name(s: string) {
  }
  public get location(): string {
    return (this.currentItem !== null) ? this.currentItem.location : "";
  }
  public set location(s: string) {
  }
  public get description():string {
    return (this.currentItem !== null) ? this.currentItem.description : "";
  }
  public set description(s:string){}
  public get eventDate(): string {
    return (this.currentItem !== null) ?
      this.date_to_string(this.currentItem.eventDate) : null;
  }
  public set eventDate(s: string) {
  }
  public get coefficient(): string {
    return (this.currentItem !== null) ?
      this.number_to_string(this.currentItem.coefficient) : "";
  }
  public set coefficient(s: string) {
  }
  public get startTime(): string {
    return (this.currentItem !== null) ?
      this.date_to_string(this.currentItem.startTime) : null;
  }
  public set startTime(s: string) {
  }
  public get endTime(): string {
    return (this.currentItem !== null) ?
      this.date_to_string(this.currentItem.endTime) : null;
  }
  public set endTime(s: string) {
  }
}// class Profgroupeevents
