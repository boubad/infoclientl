//administrator.ts
//
import {DepartementPerson} from './depperson';
import {IAdministrator, IAdministratorPerson} from 'infodata';
import {ADMINISTRATOR_TYPE, ADMINISTRATOR_PREFIX, ROLE_ADMIN} from '../utils/infoconstants';
//
export class Administrator extends DepartementPerson implements IAdministrator {
    //
    constructor(oMap?: any) {
        super(oMap);
    }// constructor
    public type(): string {
        return ADMINISTRATOR_TYPE;
    }
    public base_prefix(): string {
        return ADMINISTRATOR_PREFIX;
    }
    public update_person(pPers: IAdministratorPerson): void {
        super.update_person(pPers);
        if ((pPers !== undefined) && (pPers !== null)) {
            this.add_id_to_array(pPers.administratorids, this.id);
        }// pPers
    }// update_person
}// class Enseignant
