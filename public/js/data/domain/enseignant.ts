//enseignant.ts
//
import {DepartementPerson} from './depperson';
import {IEnseignantPerson, IEnseignant, IProfAffectation, IDatabaseManager} from 'infodata';
import {ENSEIGNANT_TYPE, ENSEIGNANT_PREFIX, ROLE_PROF,
PROFAFFECTATION_BY_ENSEIGNANT} from '../utils/infoconstants';
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
            this.add_id_to_array(pPers.enseignantids, this.id);
        }// pPers
    }// update_person
    public remove(service: IDatabaseManager): Promise<any> {
        if ((this.id === null) || (this.rev === null)) {
            throw new Error('Item not removeable error');
        }
        let self = this;
        let id: string = this.id;
        return service.dm_get_children_ids(PROFAFFECTATION_BY_ENSEIGNANT, id).then((aa_ids) => {
            return self.remove_with_children(service,aa_ids,id);
        });
    }// remove
}// class Enseignant
