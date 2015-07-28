// adminperson.ts
//
import {DepartementBasePerson} from './depbaseperson';
import {IAdministratorPerson} from 'infodata';
import {ADMINISTRATORPERSON_KEY, ROLE_ADMIN} from '../utils/infoconstants';
//
export class AdministratorPerson extends DepartementBasePerson implements IAdministratorPerson {
    public _administratorids: string[];
    //
    constructor(oMap?: any) {
        super(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.administratorids !== undefined) {
                this._administratorids = oMap.administratorids;
            }
        } // oMap
        this.roles = [ROLE_ADMIN];
    } // constructor
    public type(): string {
        return ADMINISTRATORPERSON_KEY;
    }
    public from_map(oMap: any): void {
        super.from_map(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.administratorids !== undefined) {
                this._administratorids = oMap.administratorids;
            }
        } // oMap
    }
    public to_map(oMap: any): void {
        super.to_map(oMap);
        if ((this._administratorids !== undefined) && (this._administratorids !== null) &&
            (this._administratorids.length > 0)) {
            oMap.administratorids = this._administratorids;
        }
    } // to_insert_map
	public get administratorids():string[] {
		if ((this._administratorids === undefined) || (this._administratorids === null)){
			this._administratorids = [];
		}
		return this._administratorids;
	}
} // class EtudiantPerson
