//etudaffectation.ts
//
import {WorkItem} from './workitem';
import {IPerson, IEtudAffectation, IDatabaseManager, IEtudEvent} from 'infodata';
import {ETUDAFFECTATION_TYPE, ETUDAFFECTATION_PREFIX, ETUDEVENTS_BY_ETUDAFFECTATION} from '../infoconstants';
//
export class EtudAffectation extends WorkItem
    implements IEtudAffectation {
    public etudiantid: string = null;
    private _start: Date = null;
    private _end: Date = null;
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
            if (oMap.etudiantid !== undefined) {
                this.etudiantid = oMap.etudiantid;
            }
        } // oMap
    } // constructor
    public to_map(oMap: any): void {
        super.to_map(oMap);
        if ((oMap !== undefined) && (oMap !== null))
            oMap.etudiantid = this.etudiantid;
        oMap.startDate = this.startDate;
        oMap.endDate = this.endDate;

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
            if (oMap.etudiantid !== undefined) {
                this.etudiantid = oMap.etudiantid;
            }
        } // oMap
    }
    public is_storeable(): boolean {
        let bRet: boolean = super.is_storeable() && (this.etudiantid !== null);
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
    public create_id(): string {
        let s = this.start_key();
        if ((s !== null) && (this.lastname !== null)) {
            s = s + '-' + this.lastname.trim().toUpperCase();
        }
        if ((s !== null) && (this.firstname !== null)) {
            s = s + '-' + this.firstname.trim().toUpperCase();
        }
        return s;
    } // create_id

    public update_person<T extends IPerson>(pPers: T): void {
        super.update_person(pPers);
        if ((pPers !== undefined) && (pPers !== null)) {
            if ((pPers.etudiantids === undefined) || (pPers.etudiantids === null)) {
                pPers.etudiantids = [];
            }
            this.add_id_to_array(pPers.etudiantids, this.etudiantid);
        }// pPers
    }// update_person

    public base_prefix(): string {
        return ETUDAFFECTATION_PREFIX;
    }
    public type(): string {
        return ETUDAFFECTATION_TYPE;
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
        return service.get_children_ids(ETUDEVENTS_BY_ETUDAFFECTATION, id).then((aa_ids) => {
            return self.remove_with_children(service,aa_ids,id);
        });
    }// remove
}
