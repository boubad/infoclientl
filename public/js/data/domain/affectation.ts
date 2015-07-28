//affecttaion.ts
//
import {WorkItem} from './workitem';
import {IAffectation, IUserPerson} from 'infodata';
//
export class AffectationItem extends WorkItem
    implements IAffectation {
    private _start: Date;
    private _end: Date;
    //
    constructor(oMap?: any) {
        super(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
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
            oMap.startDate = this.startDate;
            oMap.endDate = this.endDate;
        }
    } // toInsertMap
    public from_map(oMap: any): void {
        super.from_map(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.startDate !== undefined) {
                this.startDate = oMap.startDate;
            }
            if (oMap.endDate !== undefined) {
                this.endDate = oMap.endDate;
            }
        } // oMap
    }// from_map
    public get startDate(): Date {
        return (this._start !== undefined) ? this._start : null;
    }
    public set startDate(d: Date) {
        this._start = this.check_date(d);
    }
    public get endDate(): Date {
        return (this._end !== undefined) ? this._end : null;
    }
    public set endDate(d: Date) {
        this._end = this.check_date(d);
    }
    public is_storeable(): boolean {
        if (!super.is_storeable()) {
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
    public update_person<T extends IUserPerson>(pPers: T): void {
        super.update_person(pPers);
        if ((pPers !== undefined) && (pPers !== null)) {
            this.check_id();
            this.add_id_to_array(pPers.affectationids, this.id);
        }// pPers
    }// update_person
}
