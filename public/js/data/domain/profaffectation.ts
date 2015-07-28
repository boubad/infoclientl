//profaffectation.ts
//
import {AffectationItem} from './affectation';
import {IProfAffectation, IEnseignantPerson, IDatabaseManager} from 'infodata';;
import {PROFAFFECTATION_TYPE, PROFAFFECTATION_PREFIX, GROUPEEVENT_BY_PROFAFFECTATION} from '../utils/infoconstants';
//
export class ProfAffectation extends AffectationItem
    implements IProfAffectation {
    private _enseignantid: string;
    private _uniteid: string;
    private _matiereid: string;
    private _matiereSigle: string;
    private _uniteSigle: string;
    //
    constructor(oMap?: any) {
        super(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.enseignantid !== undefined) {
                this._enseignantid = oMap.enseignantid;
            }
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
            oMap.enseignantid = this.enseignantid;
            oMap.uniteid = this.uniteid;
            oMap.matiereid = this.matiereid;
            oMap.uniteSigle = this.uniteSigle;
            oMap.matiereSigle = this.matiereSigle;
        }

    } // toInsertMap
    public from_map(oMap: any): void {
        super.from_map(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
			if (oMap.enseignantid !== undefined) {
                this._enseignantid = oMap.enseignantid;
            }
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
    }
	public get enseignantid(): string {
		return (this._enseignantid !== undefined) ? this._enseignantid : null;
	}
	public set enseignantid(s: string) {
		this._enseignantid = (s !== undefined) ? s : null;
	}
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
    public is_storeable(): boolean {
        return super.is_storeable() && (this.enseignantid !== null) &&
			(this.uniteid !== null) && (this.matiereid !== null);
    }
    public update_person<T extends IEnseignantPerson>(pPers: T): void {
        super.update_person(pPers);
        if ((pPers !== undefined) && (pPers !== null)) {
            this.add_id_to_array(pPers.enseignantids, this.enseignantid);
            this.add_id_to_array(pPers.uniteids, this.uniteid);
            this.add_id_to_array(pPers.matiereids, this.matiereid);
        }// pPers
    }// update_person
    public start_key(): string {
        let s = this.base_prefix();
        if ((s !== null) && (this.semestreid !== null)) {
            s = s + this.semestreid;
        }
        if ((s !== null) && (this.matiereid !== null)) {
            s = s + this.matiereid;
        }
        if ((s !== null) && (this.groupeid !== null)) {
            s = s + this.groupeid;
        }
        if ((s !== null) && (this.genre !== null)) {
            s = s + this.genre.trim().toUpperCase();
        }
        return s;
    }
    public create_id(): string {
        let s = this.start_key();
        if ((s !== null) && (this.personid !== null)) {
            s = s + this.personid;
        }
        if ((s !== null) && (this.startDate !== null)) {
            s = s + this.startDate.toISOString().substr(0, 10);
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
        if ((this.id === null) || (this.rev === null)) {
            throw new Error('Item not removeable error');
        }
        let self = this;
        let id: string = this.id;
        return service.dm_get_children_ids(GROUPEEVENT_BY_PROFAFFECTATION, id).then((aa_ids) => {
            return self.remove_with_children(service, aa_ids, id);
        });
    }// remove
}
