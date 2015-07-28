//etudaffectation.ts
//
import {AffectationItem} from './affectation';
import {IEtudAffectation, IDatabaseManager} from 'infodata';
import {ETUDAFFECTATION_TYPE, ETUDAFFECTATION_PREFIX, ETUDEVENTS_BY_ETUDAFFECTATION} from '../utils/infoconstants';
//
export class EtudAffectation extends AffectationItem
    implements IEtudAffectation {
    public _etudiantid: string = null;
    //
    constructor(oMap?: any) {
        super(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.etudiantid !== undefined) {
                this._etudiantid = oMap.etudiantid;
            }
        } // oMap
    } // constructor
    public to_map(oMap: any): void {
        super.to_map(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            oMap.etudiantid = this.etudiantid;
        }
    } // toInsertMap
    public from_map(oMap: any): void {
        super.from_map(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.etudiantid !== undefined) {
                this._etudiantid = oMap.etudiantid;
            }
        } // oMap
    }
	public get etudiantid(): string {
		return (this._etudiantid !== undefined) ? this._etudiantid : null;
	}
	public set etudiantid(s: string) {
		this._etudiantid = (s !== undefined) ? s : null;
	}
    public is_storeable(): boolean {
        return super.is_storeable() && (this.etudiantid !== null);
    }
    public create_id(): string {
        let s = this.start_key();
        if ((s !== null) && (this.lastname !== null)) {
            s = s + this.lastname.trim().toUpperCase();
        }
        if ((s !== null) && (this.firstname !== null)) {
            s = s + this.firstname.trim().toUpperCase();
        }
        return s;
    } // create_id

    public base_prefix(): string {
        return ETUDAFFECTATION_PREFIX;
    }
    public type(): string {
        return ETUDAFFECTATION_TYPE;
    }
    public remove(service: IDatabaseManager): Promise<any> {
        if ((this.id === null) || (this.rev === null)) {
            throw new Error('Item not removeable error');
        }
        let self = this;
        let id: string = this.id;
        return service.dm_get_children_ids(ETUDEVENTS_BY_ETUDAFFECTATION, id).then((aa_ids) => {
            return self.remove_with_children(service, aa_ids, id);
        });
    }// remove
}
