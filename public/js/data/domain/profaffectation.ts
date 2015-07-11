//profaffectation.ts
//
import {MatiereWorkItem} from './matiereworkitem';
import {IProfAffectation, IPerson, IDatabaseManager, IGroupeEvent} from 'infodata';;
import {PROFAFFECTATION_TYPE, PROFAFFECTATION_PREFIX,  GROUPEEVENT_BY_PROFAFFECTATION} from '../infoconstants';
//
export class ProfAffectation extends MatiereWorkItem
    implements IProfAffectation {
    public enseignantid: string = null;
    private _start: Date = null;
    private _end: Date = null;
    //
    constructor(oMap?: any) {
        super(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.enseignantid !== undefined) {
                this.enseignantid = oMap.enseignantid;
            }
            if (oMap.startDate !== undefined) {
                this.startDate = oMap.startDate;
            }
            if (oMap.endDate !== undefined) {
                this.endDate = oMap.endDate;
            }
        } // oMap
    } // constructor
    public to_map(oMap: any): void {
        super.to_map(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            oMap.enseignantid = this.enseignantid;
                oMap.startDate = this.startDate;
                oMap.endDate = this.endDate;
          }

    } // toInsertMap
    public from_map(oMap: any): void {
        super.from_map(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
              if (oMap.enseignantid !== undefined) {
                  this.enseignantid = oMap.enseignantid;
              }
              if (oMap.startDate !== undefined) {
                  this.startDate = oMap.startDate;
              }
              if (oMap.endDate !== undefined) {
                  this.endDate = oMap.endDate;
              }
        } // oMap
    }
    public is_storeable(): boolean {
        let bRet: boolean = super.is_storeable() && (this.enseignantid !== null);
        if (!bRet) {
            return false;
        }
        if ((this.startDate === null) || (this.endDate === null)) {
            return true;
        }
        let t1 = Date.parse(this.startDate.toString());
        let t2 = Date.parse(this.endDate.toString());
        if (isNaN(t1) || isNaN(t2)) {
            return false;
        }
        return (t1 <= t2);
    }
    public get startDate(): Date {
        return this._start;
    }
    public set startDate(d: Date) {
        this._start = this.check_date(d);
    }
    public get endDate(): Date {
        return this._end;
    }
    public set endDate(d: Date) {
        this._end = this.check_date(d);
    }
    public update_person<T extends IPerson>(pPers: T): void {
        super.update_person(pPers);
        if ((pPers !== undefined) && (pPers !== null)) {
              if ((pPers.enseignantids === undefined) || (pPers.enseignantids === null )) {
                    pPers.enseignantids = [];
              }
              this.add_id_to_array(pPers.enseignantids, this.enseignantid);
        }// pPers
    }// update_person
    public start_key(): string {
        let s = this.base_prefix();
        if ((s !== null) && (this.semestreid !== null)) {
            s = s + '-' + this.semestreid;
        }
        if ((s !== null) && (this.matiereid !== null)) {
            s = s + '-' + this.matiereid;
        }
        if ((s !== null) && (this.groupeid !== null)) {
            s = s + '-' + this.groupeid;
        }
        if ((s !== null) && (this.genre !== null)) {
            s = s + '-' + this.genre.trim().toUpperCase();
        }
        return s;
    }
    public create_id(): string {
        let s = this.start_key();
        if ((s !== null) && (this.personid !== null)) {
            s = s + '-' + this.personid;
        }
        if ((s !== null) && (this.startDate !== null)) {
            s = s + '-' + this.startDate.toISOString().substr(0, 10);
        }
        return s;
    } // create_id

    public base_prefix(): string {
        return PROFAFFECTATION_PREFIX;
    }
    public type(): string {
        return PROFAFFECTATION_TYPE;
    }
    public remove(service: IDatabaseManager): Promise<any> {
        if ((service === undefined) || (service === null)) {
            return Promise.reject(new Error('Invalid service'));
        }
        if ((this.id === null) || (this.rev === null)) {
            return Promise.reject(new Error('Item not removeable error'));
        }
        let self = this;
        let id: string = this.id;
        return service.get_children_ids(GROUPEEVENT_BY_PROFAFFECTATION, id).then((aa_ids) => {
            return self.remove_with_children(service,aa_ids,id);
        });
    }// remove
}
