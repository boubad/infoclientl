//departement.ts
//
import {SigleNameItem} from "./siglenameitem";
import {DEPARTEMENT_TYPE, DEPARTEMENT_PREFIX, ANNEE_BY_DEPARTEMENT,
UNITE_BY_DEPARTEMENT, GROUPE_BY_DEPARTEMENT} from '../infoconstants';
import {IDepartement, IDatabaseManager, IAnnee, IUnite, IGroupe,
IBaseItem} from 'infodata';
//
export class Departement extends SigleNameItem implements IDepartement {
    constructor(oMap?: any) {
        super(oMap);
    }
    public type(): string {
        return DEPARTEMENT_TYPE;
    }
    public base_prefix(): string {
        return DEPARTEMENT_PREFIX;
    }
    public remove(service: IDatabaseManager): Promise<any> {
        if ((service === undefined) || (service === null)) {
            return Promise.reject(new Error('Invalid service'));
        }
        if ((this.id === null) || (this.rev === null)) {
            return Promise.reject(new Error('Item not removeable error'));
        }
        let self = this;
        let id: string = this.id;
        let docids: string[] = [];
        return service.get_children_ids(ANNEE_BY_DEPARTEMENT, id).then((aa_ids) => {
            if ((aa_ids !== undefined) && (aa_ids !== null)) {
                for (let x of aa_ids) {
                    self.add_id_to_array(docids, x);
                }
            }
            return service.get_children_ids(UNITE_BY_DEPARTEMENT, id);
        }).then((uu_ids) => {
            if ((uu_ids !== undefined) && (uu_ids !== null)) {
                for (let x of uu_ids) {
                    self.add_id_to_array(docids, x);
                }
            }
            return service.get_children_ids(GROUPE_BY_DEPARTEMENT, id);
        }).then((gg_ids) => {
            if ((gg_ids !== undefined) && (gg_ids !== null)) {
                for (let x of gg_ids) {
                    self.add_id_to_array(docids, x);
                }
            }
            return self.remove_with_children(service,docids,id);
        });
    }// remove
}// class IDepartement
