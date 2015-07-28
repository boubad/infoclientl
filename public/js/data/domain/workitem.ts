//workitem.ts
//
import {DepartementPerson} from './depperson';
import {IWorkItem, IUserPerson} from 'infodata';
//
export class WorkItem extends DepartementPerson
    implements IWorkItem {
    private _anneeid: string;
    private _semestreid: string;
    private _groupeid: string;
    private _date: Date = null;
    private _status: string;
    private _genre: string;
    private _semestreSigle: string;
    private _anneeSigle: string;
    private _departementSigle: string;
    private _groupeSigle: string;
    //
    constructor(oMap?: any) {
        super(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.anneeid !== undefined) {
                this._anneeid = oMap.anneeid;
            }
            if (oMap.semestreid !== undefined) {
                this._semestreid = oMap.semestreid;
            }
            if (oMap.groupeid !== undefined) {
                this._groupeid = oMap.groupeid;
            }
            if (oMap.eventDate !== undefined) {
                this._date = oMap.eventDate;
            }
            if (oMap.status !== undefined) {
                this._status = oMap.status;
            }
            if (oMap.genre !== undefined) {
                this._genre = oMap.genre;
            }
            if (oMap.departementSigle !== undefined) {
                this._departementSigle = oMap.departementSigle;
            }
            if (oMap.anneeSigle !== undefined) {
                this._anneeSigle = oMap.anneeSigle;
            }
            if (oMap.semestreSigle !== undefined) {
                this._semestreSigle = oMap.semestreSigle;
            }
            if (oMap.groupeSigle !== undefined) {
                this._groupeSigle = oMap.groupeSigle;
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
                this._anneeid = oMap.anneeid;
            }
            if (oMap.semestreid !== undefined) {
                this._semestreid = oMap.semestreid;
            }
            if (oMap.groupeid !== undefined) {
                this._groupeid = oMap.groupeid;
            }
            if (oMap.eventDate !== undefined) {
                this._date = oMap.eventDate;
            }
            if (oMap.status !== undefined) {
                this._status = oMap.status;
            }
            if (oMap.genre !== undefined) {
                this._genre = oMap.genre;
            }
            if (oMap.departementSigle !== undefined) {
                this._departementSigle = oMap.departementSigle;
            }
            if (oMap.anneeSigle !== undefined) {
                this._anneeSigle = oMap.anneeSigle;
            }
            if (oMap.semestreSigle !== undefined) {
                this._semestreSigle = oMap.semestreSigle;
            }
            if (oMap.groupeSigle !== undefined) {
                this._groupeSigle = oMap.groupeSigle;
            }
        }
    }// from_map
	public get anneeid():string {
		return (this._anneeid !== undefined) ? this._anneeid : null;
	}
	public set anneeid(s:string){
		this._anneeid = (s !== undefined) ? s : null;
	}
	public get semestreid():string {
		return (this._semestreid !== undefined) ? this._semestreid : null;
	}
	public set semestreid(s:string){
		this._semestreid = (s !== undefined) ? s : null;
	}
	public get groupeid():string {
		return (this._groupeid !== undefined) ? this._groupeid : null;
	}
	public set groupeid(s:string){
		this._groupeid = (s !== undefined) ? s : null;
	}
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
	public get status():string {
		return (this._status !== undefined) ? this._status : null;
	}
	public set status(s:string){
		this._status = (s !== undefined) ? s : null;
	}
	public get genre():string {
		return (this._genre !== undefined) ? this._genre : null;
	}
	public set genre(s:string){
		this._genre = (s !== undefined) ? s : null;
	}
	public get semestreSigle():string {
		return (this._semestreSigle !== undefined) ? this._semestreSigle : null;
	}
	public set semestreSigle(s:string){
		this._semestreSigle = (s !== undefined) ? s : null;
	}
	public get departementSigle():string {
		return (this._departementSigle !== undefined) ? this._departementSigle : null;
	}
	public set departementSigle(s:string){
		this._departementSigle = (s !== undefined) ? s : null;
	}
	public get groupeSigle():string {
		return (this._groupeSigle !== undefined) ? this._groupeSigle : null;
	}
	public set groupeSigle(s:string){
		this._groupeSigle = (s !== undefined) ? s : null;
	}
	public get anneeSigle():string {
		return (this._anneeSigle !== undefined) ? this._anneeSigle : null;
	}
	public set anneeSigle(s:string){
		this._anneeSigle = (s !== undefined) ? s : null;
	}
    public update_person<T extends IUserPerson>(pPers: T): void {
        super.update_person(pPers);
        if ((pPers !== undefined) && (pPers !== null)) {
            this.add_id_to_array(pPers.anneeids, this.anneeid);
            this.add_id_to_array(pPers.semestreids, this.semestreid);
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
