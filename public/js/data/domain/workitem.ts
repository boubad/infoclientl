//workitem.ts
//
import {DepartementPerson} from './depperson';
import {IWorkItem, IPerson} from 'infodata';
//
export class WorkItem extends DepartementPerson
    implements IWorkItem {
    public anneeid: string = null;
    public semestreid: string = null;
    public groupeid: string = null;
    private _date: Date = null;
    public status: string = null;
    public genre: string = null;
    public semestreSigle: string = null;
    public anneeSigle: string = null;
    public departementSigle: string = null;
    public groupeSigle: string = null;
    //
    constructor(oMap?: any) {
        super(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.anneeid !== undefined) {
                this.anneeid = oMap.anneeid;
            }
            if (oMap.semestreid !== undefined) {
                this.semestreid = oMap.semestreid;
            }
            if (oMap.groupeid !== undefined) {
                this.groupeid = oMap.groupeid;
            }
            if (oMap.eventDate !== undefined) {
                this.eventDate = oMap.eventDate;
            }
            if (oMap.status !== undefined) {
                this.status = oMap.status;
            }
            if (oMap.genre !== undefined) {
                this.genre = oMap.genre;
            }
            if (oMap.departementSigle !== undefined) {
                this.departementSigle = oMap.departementSigle;
            }
            if (oMap.anneeSigle !== undefined) {
                this.anneeSigle = oMap.anneeSigle;
            }
            if (oMap.semestreSigle !== undefined) {
                this.semestreSigle = oMap.semestreSigle;
            }
            if (oMap.groupeSigle !== undefined) {
                this.groupeSigle = oMap.groupeSigle;
            }
        } // oMap
    } // constructor
    public to_map(oMap: any): void {
        super.to_map(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            oMap.anneeid = this.anneeid;
            oMap.semestreid = this.semestreid;
            oMap.groupeid = this.groupeid;
            oMap.eventDate = this.eventDate;
            oMap.status = this.status;
            oMap.genre = this.genre;
            oMap.departementSigle = this.departementSigle;
            oMap.anneeSigle = this.anneeSigle;
            oMap.semestreSigle = this.semestreSigle;
            oMap.groupeSigle = this.groupeSigle;
        }
    } // toInsertMap
    public from_map(oMap: any): void {
        super.from_map(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.anneeid !== undefined) {
                this.anneeid = oMap.anneeid;
            }
            if (oMap.semestreid !== undefined) {
                this.semestreid = oMap.semestreid;
            }
            if (oMap.groupeid !== undefined) {
                this.groupeid = oMap.groupeid;
            }
            if (oMap.eventDate !== undefined) {
                this.eventDate = oMap.eventDate;
            }
            if (oMap.status !== undefined) {
                this.status = oMap.status;
            }
            if (oMap.genre !== undefined) {
                this.genre = oMap.genre;
            }
            if (oMap.departementSigle !== undefined) {
                this.departementSigle = oMap.departementSigle;
            }
            if (oMap.anneeSigle !== undefined) {
                this.anneeSigle = oMap.anneeSigle;
            }
            if (oMap.semestreSigle !== undefined) {
                this.semestreSigle = oMap.semestreSigle;
            }
            if (oMap.groupeSigle !== undefined) {
                this.groupeSigle = oMap.groupeSigle;
            }
        }
    }// from_map
    public get eventDate(): Date {
        return (this._date !== undefined) ? this._date : null;
    }
    public set eventDate(d: Date) {
        this._date = this.check_date(d);
    }
    public get dateString(): string {
        return this.date_to_string(this.eventDate);
    }
    public set dateString(s: string) {
        this._date = this.string_to_date(s);
    }
    public update_person<T extends IPerson>(pPers: T): void {
        super.update_person(pPers);
        if ((pPers !== undefined) && (pPers !== null)) {
            if ((pPers.anneeids === undefined) || (pPers.anneeids === null)) {
                pPers.anneeids = [];
            }
            this.add_id_to_array(pPers.anneeids, this.anneeid);
            if ((pPers.semestreids === undefined) || (pPers.semestreids === null)) {
                pPers.semestreids = [];
            }
            this.add_id_to_array(pPers.semestreids, this.semestreid);
            if ((pPers.groupeids === undefined) || (pPers.groupeids === null)) {
                pPers.groupeids = [];
            }
            this.add_id_to_array(pPers.groupeids, this.groupeid);
        }// pPers
    }// update_person
    public start_key(): string {
        let s = this.base_prefix();
        if ((s !== null) && (this.semestreid !== null)) {
            s = s + this.semestreid;
        }
        if ((s !== null) && (this.groupeid !== null)) {
            s = s  + this.groupeid;
        }
        return s;
    }
    public is_storeable(): boolean {
        return super.is_storeable() && (this.anneeid !== null) &&
            (this.semestreid !== null) && (this.groupeid !== null);
    }
    public get sort_func(): (p1: IWorkItem, p2: IWorkItem) => number {
        return WorkItem.g_sort_func;
    }
    public static g_sort_func(p1: IWorkItem, p2: IWorkItem): number {
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
}
