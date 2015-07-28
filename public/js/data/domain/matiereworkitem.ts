//matiereworkitem.ts
//
import {WorkItem} from './workitem';
import {IMatiereWorkItem, IUserPerson} from 'infodata';
//
export class MatiereWorkItem extends WorkItem
    implements IMatiereWorkItem {
    private _uniteid: string;
    private _matiereid: string;
    private _matiereSigle: string;
    private _uniteSigle: string;
    //
    constructor(oMap?: any) {
        super(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.uniteid !== undefined) {
                this._uniteid = oMap.uniteid;
            }
            if (oMap.matiereid !== undefined) {
                this._matiereid = oMap.matiereid;
            }
            if (oMap.uniteSigle !== undefined) {
                this._uniteSigle = oMap.uniteSigle;
            }
            if (oMap.matiereSigle !== undefined) {
                this._matiereSigle = oMap.matiereSigle;
            }
        } // oMap
    } // constructor
    public to_map(oMap: any): void {
        super.to_map(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            oMap.uniteid = this.uniteid;
            oMap.matiereid = this.matiereid;
            oMap.uniteSigle = this.uniteSigle;
            oMap.matiereSigle = this.matiereSigle;
        }
    } // toInsertMap
    public from_map(oMap: any): void {
        super.from_map(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
			if (oMap.uniteid !== undefined) {
                this._uniteid = oMap.uniteid;
            }
            if (oMap.matiereid !== undefined) {
                this._matiereid = oMap.matiereid;
            }
            if (oMap.uniteSigle !== undefined) {
                this._uniteSigle = oMap.uniteSigle;
            }
            if (oMap.matiereSigle !== undefined) {
                this._matiereSigle = oMap.matiereSigle;
            }
        }
    }// from_map
	public get uniteid(): string {
		return (this._uniteid !== undefined) ? this._uniteid : null;
	}
	public set uniteid(s: string) {
		this._uniteid = (s !== undefined) ? s : null;
	}
	public get matiereid(): string {
		return (this._matiereid !== undefined) ? this._matiereid : null;
	}
	public set matiereid(s: string) {
		this._matiereid = (s !== undefined) ? s : null;
	}
	public get uniteSigle(): string {
		return (this._uniteSigle !== undefined) ? this._uniteSigle : null;
	}
	public set uniteSigle(s: string) {
		this._uniteSigle = (s !== undefined) ? s : null;
	}
	public get matiereSigle(): string {
		return (this._matiereSigle !== undefined) ? this._matiereSigle : null;
	}
	public set matiereSigle(s: string) {
		this._matiereSigle = (s !== undefined) ? s : null;
	}
    public update_person<T extends IUserPerson>(pPers: T): void {
        super.update_person(pPers);
        if ((pPers !== undefined) && (pPers !== null)) {
            this.add_id_to_array(pPers.uniteids, this.uniteid);
            this.add_id_to_array(pPers.matiereids, this.matiereid);
        }// pPers
    }// update_person
    public is_storeable(): boolean {
        return super.is_storeable() && (this.uniteid !== null) &&
            (this.matiereid !== null);
    }
}
