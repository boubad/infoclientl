//etudiant.ts
//
import {DepartementPerson} from './depperson';
import {IEtudiantPerson,
IPerson, IEtudiant, IEtudAffectation, IDatabaseManager} from 'infodata';
import {ETUDIANT_TYPE, ETUDIANT_PREFIX, ROLE_ETUD, ETUDAFFECTATION_BY_ETUDIANT} from '../infoconstants';
//
export class Etudiant extends DepartementPerson implements IEtudiant {
    //
    constructor(oMap?: any) {
        super(oMap);
    }// constructor
    public type(): string {
        return ETUDIANT_TYPE;
    }
    public base_prefix(): string {
        return ETUDIANT_PREFIX;
    }
    public update_person(pPers: IPerson): void {
        super.update_person(pPers);
        if ((pPers !== undefined) && (pPers !== null)) {
            super.update_person(pPers);
            if ((pPers.etudiantids === undefined) || (pPers.etudiantids === null)) {
                pPers.etudiantids = [];
            }
            this.add_id_to_array(pPers.etudiantids, this.id);
            if ((pPers.roles === undefined) || (pPers.roles === null)) {
                pPers.roles = [];
            }
            this.add_id_to_array(pPers.roles, ROLE_ETUD);
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
        return service.get_children_ids(ETUDAFFECTATION_BY_ETUDIANT, id).then((aa_ids) => {
            return self.remove_with_children(service,aa_ids,id);
        });
    }// remove
}// class Etudiant
