//etudiant.ts
//
import {DepartementPerson} from './depperson';
import {IEtudiantPerson, IEtudiant, IDatabaseManager} from 'infodata';
import {ETUDIANT_TYPE, ETUDIANT_PREFIX, ROLE_ETUD, ETUDAFFECTATION_BY_ETUDIANT} from '../utils/infoconstants';
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
    public update_person(pPers: IEtudiantPerson): void {
        super.update_person(pPers);
        if ((pPers !== undefined) && (pPers !== null)) {
            this.add_id_to_array(pPers.etudiantids, this.id);
        }// pPers
    }// update_person
    public remove(service: IDatabaseManager): Promise<any> {
        if ((this.id === null) || (this.rev === null)) {
            throw new Error('Item not removeable error');
        }
        let self = this;
        let id: string = this.id;
        return service.dm_get_children_ids(ETUDAFFECTATION_BY_ETUDIANT, id).then((aa_ids) => {
            return self.remove_with_children(service,aa_ids,id);
        });
    }// remove
}// class Etudiant
