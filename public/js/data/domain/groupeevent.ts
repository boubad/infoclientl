//groupeevent.ts
//
import {MatiereWorkItem} from './matiereworkitem';
import {IEnseignantPerson,
   IGroupeEvent, IPerson, IDatabaseManager,IEtudEvent} from 'infodata';
import { GROUPEEVENT_TYPE, GROUPEEVENT_PREFIX,ETUDEVENTS_BY_GROUPEEVENT } from '../utils/infoconstants';
//
export class GroupeEvent extends MatiereWorkItem
    implements IGroupeEvent {
    private _profaffectationid: string;
    private _name: string;
    private _location: string;
    private _t1: Date;
    private _t2: Date;
    private _coef: number;
    //
    constructor(oMap?: any) {
        super(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.profaffectationid !== undefined) {
                this._profaffectationid = oMap.profaffectationid;
            }
            if (oMap.name !== undefined) {
                this._name = oMap.name;
            }
            if (oMap.location !== undefined) {
                this._location = oMap.location;
            }
            if (oMap.coefficient !== undefined) {
                this.coefficient = oMap.coefficient;
            }
            if (oMap.startTime !== undefined) {
                this.startTime = oMap.startTime;
            }
            if (oMap.endTime !== undefined) {
                this.endTime = oMap.endTime;
            }
        } // oMap
    } // constructor
	public get profaffectationid():string {
		return (this._profaffectationid !== undefined) ? this._profaffectationid : null;
	}
	public set profaffectationid(s:string){
		this._profaffectationid = (s !== undefined) ? s : null;
	}
	public get name():string {
		return (this._name !== undefined) ? this._name : null;
	}
	public set name(s:string){
		this._name = (s !== undefined) ? s : null;
	}
	public get location():string {
		return (this._location !== undefined) ? this._location : null;
	}
	public set location(s:string){
		this._location = (s !== undefined) ? s : null;
	}
    public to_map(oMap: any): void {
        super.to_map(oMap);
        if ((oMap !== undefined) && (oMap !== null)){
            oMap.profaffectationid = this.profaffectationid;
            oMap.name = this.name;
            oMap.location = this.location;
            oMap.coefficient = this.coefficient;
            oMap.startTime = this.startTime;
            oMap.endTime = this.endTime;
      }
    } // toInsertMap
    public from_map(oMap:any): void {
      super.from_map(oMap);
      if ((oMap !== undefined) && (oMap !== null)) {
          if (oMap.profaffectationid !== undefined) {
              this.profaffectationid = oMap.profaffectationid;
          }
          if (oMap.name !== undefined) {
              this.name = oMap.name;
          }
          if (oMap.location !== undefined) {
              this.location = oMap.location;
          }
          if (oMap.coefficient !== undefined) {
              this.coefficient = oMap.coefficient;
          }
          if (oMap.startTime !== undefined) {
              this.startTime = oMap.startTime;
          }
          if (oMap.endTime !== undefined) {
              this.endTime = oMap.endTime;
          }
      } // oMap
    }
    public is_storeable(): boolean {
        let bRet = super.is_storeable() && (this.profaffectationid !== null) &&
             (this.eventDate !== null) &&
            (this.name !== null) && (this.genre !== null);
        if (!bRet) {
            return false;
        }
        if ((this.startTime === null) || (this.endTime === null)) {
            return true;
        }
        let t1 = Date.parse(this.startTime.toString());
        let t2 = Date.parse(this.endTime.toString());
        if (isNaN(t1) || isNaN(t2)) {
            return false;
        }
        return (t1 <= t2);
    }
    public get startTime(): Date {
        return (this._t1 !== undefined) ? this._t1 : null;
    }
    public set startTime(d: Date) {
        this._t1 = this.check_date(d);
    }
    public get endTime(): Date {
        return (this._t2 !== undefined) ? this._t2 : null;
    }
    public set endTime(d: Date) {
        this._t2 = this.check_date(d);
    }
    public get coefficient(): number {
        return this._coef;
    }
    public set coefficient(s: number) {
        let d = this.check_number(s);
        if ((d !== null) && (d > 0)) {
            this._coef = d;
        } else {
            this._coef = null;
        }
    }
    public update_person(pPers: IEnseignantPerson): void {
        super.update_person(pPers);
        this.check_id();
        if ((pPers !== undefined) && (pPers !== null)) {
            this.add_id_to_array(pPers.eventids, this.id);
        }// pPers
    }// update_person
    public get sort_func(): (p1:IGroupeEvent, p2:IGroupeEvent) => number {
        return GroupeEvent.g_sort_func;
    }
    public static g_sort_func(p1: IGroupeEvent, p2: IGroupeEvent): number {
        let d1 = p1.eventDate;
        let d2 = p2.eventDate;
        if ((d1 !== null) && (d2 !== null)) {
            let t1 = Date.parse(d1.toString());
            let t2 = Date.parse(d2.toString());
            if (t1 > t2) {
                return -1;
            } else if (t1 < t2) {
                return 1;
            } else {
                return 0;
            }
        } else if ((d1 === null) && (d2 !== null)) {
            return 1;
        } else if ((d1 !== null) && (d2 === null)) {
            return -1;
        } else {
            return 0;
        }
    } // sort_func
    protected get_text():string {
      return this.name;
    }
    public start_key(): string {
        let s = this.base_prefix();
        if ((s !== null) && (this.semestreid !== null)) {
            s = s  + this.semestreid;
        }
        if ((s !== null) && (this.matiereid !== null)) {
            s = s + this.matiereid;
        }
        if ((s !== null) && (this.groupeid !== null)) {
            s = s + this.groupeid;
        }
        return s;
    }
    public create_id(): string {
        let s = this.start_key();
        if ((s !== null) && (this.personid !== null)) {
            s = s + '-' + this.personid;
        }
        if ((s !== null) && (this.genre !== null)) {
            s = s + '-' + this.genre.trim().toUpperCase();
        }
        if ((s !== null) && (this.eventDate !== null)) {
            s = s + '-' + this.eventDate.toISOString().substr(0, 10);
        }
        return s;
    } // create_id
    public type(): string {
        return GROUPEEVENT_TYPE;
    }
    public base_prefix(): string {
        return GROUPEEVENT_PREFIX;
    }
    public remove(service: IDatabaseManager): Promise<any> {
        if ((this.id === null) || (this.rev === null)) {
            throw new Error('Item not removeable error');
        }
        let self = this;
        let id: string = this.id;
        return service.dm_get_children_ids(ETUDEVENTS_BY_GROUPEEVENT, id).then((aa_ids) => {
            return self.remove_with_children(service,aa_ids,id);
        });
    }// remove
}// class GroupeEvent
