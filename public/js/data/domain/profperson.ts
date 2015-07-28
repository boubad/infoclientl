// profperson.ts
//
import {UserPerson} from './userperson';
import {IEnseignantPerson, IEnseignant, IDatabaseManager} from 'infodata';
import {ENSEIGNANTPERSON_KEY, ROLE_PROF, ENSEIGNANT_BY_PERSON} from '../utils/infoconstants';
//
export class EnseignantPerson extends UserPerson implements IEnseignantPerson {
    public _enseignantids: string[];
    //
    constructor(oMap?: any) {
        super(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.enseignantids !== undefined) {
                this._enseignantids = oMap.enseignantids;
            }
        } // oMap
        this.roles = [ROLE_PROF];
    } // constructor
    public to_map(oMap: any): void {
        super.to_map(oMap);
        if ((this._enseignantids !== undefined) && (this._enseignantids !== null) &&
            (this._enseignantids.length > 0)) {
            oMap.enseignantids = this._enseignantids;
        }
    } // to_map
    public from_map(oMap: any): void {
        super.from_map(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            oMap.enseignantids = this.enseignantids;
        }
    }
	public get enseignantids(): string[] {
		if ((this._enseignantids === undefined) || (this._enseignantids === null)) {
			this._enseignantids = [];
		}
		return this._enseignantids;
	}
    public type(): string {
        return ENSEIGNANTPERSON_KEY;
    }
    public remove(service: IDatabaseManager): Promise<any> {
        if ((this.id === null) || (this.rev === null)) {
            throw new Error('Item not removeable error');
        }
        let self = this;
        let id: string = this.id;
        return service.dm_get_children_ids(ENSEIGNANT_BY_PERSON, id).then((aa_ids) => {
            return self.remove_with_children(service, aa_ids, id);
        });
    }// remove
} // class EtudiantPerson
