//groupe.ts
//
import {DepSigleNameItem} from './depsiglenameitem';
import {IBaseItem, IDatabaseManager, IProfAffectation, IEtudAffectation, IGroupe} from 'infodata';
import {GROUPE_TYPE, GROUPE_PREFIX, PROFAFFECTATION_BY_GROUPE, ETUDAFFECTATION_BY_GROUPE} from '../utils/infoconstants';
//
export class Groupe extends DepSigleNameItem implements IGroupe {
    constructor(oMap?: any) {
        super(oMap);
    } // constructor
    public type(): string {
        return GROUPE_TYPE;
    }
    public base_prefix(): string {
        return GROUPE_PREFIX;
    }
    public remove(service: IDatabaseManager): Promise<any> {
        if ((this.id === null) || (this.rev === null)) {
            throw new Error('Item not removeable error');
        }
        let self = this;
        let id: string = this.id;
        let docids: string[] = [];
        return service.dm_get_children_ids(PROFAFFECTATION_BY_GROUPE, id).then((aa_ids) => {
            if ((aa_ids !== undefined) && (aa_ids !== null)) {
                for (let x of aa_ids) {
                    self.add_id_to_array(docids, x);
                }
            }
            return service.dm_get_children_ids(ETUDAFFECTATION_BY_GROUPE, id);
        }).then((uu_ids) => {
            if ((uu_ids !== undefined) && (uu_ids !== null)) {
                for (let x of uu_ids) {
                    self.add_id_to_array(docids, x);
                }
            }
            return self.remove_with_children(service,docids,id);
        });
    }// remove
} // class Groupe
