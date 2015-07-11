//enseignant.ts
//
import {DepartementPerson} from './depperson';
import {IEnseignantPerson,
IPerson, IEnseignant, IProfAffectation, IDatabaseManager} from 'infodata';
import {ENSEIGNANT_TYPE, ENSEIGNANT_PREFIX, ROLE_PROF,
PROFAFFECTATION_BY_ENSEIGNANT} from '../infoconstants';
//
export class Enseignant extends DepartementPerson implements IEnseignant {
    //
    constructor(oMap?: any) {
        super(oMap);
    }// constructor
    public type(): string {
        return ENSEIGNANT_TYPE;
    }
    public base_prefix(): string {
        return ENSEIGNANT_PREFIX;
    }
    public update_person(pPers: IEnseignantPerson): void {
        super.update_person(pPers);
        if ((pPers !== undefined) && (pPers !== null)) {
            if ((pPers.enseignantids === undefined) ||
                (pPers.enseignantids === null)) {
                pPers.enseignantids = [];
            }
            this.add_id_to_array(pPers.enseignantids, this.id);
            if ((pPers.roles === undefined) || (pPers.roles === null)) {
                pPers.roles = [];
            }
            this.add_id_to_array(pPers.roles, ROLE_PROF);
        }// pPers
    }// update_person
    public remove(service: IDatabaseManager): Promise<any> {
        if ((service === undefined) || (service === null)) {
            return Promise.reject(new Error('Invalid service'));
        }
        if ((this.id === null) || (this.rev === null)) {
            return Promise.reject(new Error('Item not removeable error'));
        }
        let self = this;
        let id: string = this.id;
        return service.get_children_ids(PROFAFFECTATION_BY_ENSEIGNANT, id).then((aa_ids) => {
            return self.remove_with_children(service,aa_ids,id);
        });
    }// remove
}// class Enseignant
