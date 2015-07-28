//annee.ts
//
import { IntervalItem} from "./intervalitem";
import {IBaseItem,IAnnee, ISemestre, IDatabaseManager} from 'infodata';
import {ANNEE_TYPE, ANNEE_PREFIX, SEMESTRE_BY_ANNEE} from '../utils/infoconstants';
//
export class Annee extends IntervalItem implements IAnnee {
    constructor(oMap?: any) {
        super(oMap);
    } // constructor
    public type(): string {
        return ANNEE_TYPE;
    }
    public base_prefix(): string {
        return ANNEE_PREFIX;
    }
    public remove(service: IDatabaseManager): Promise<any> {
        if ((this.id === null) || (this.rev === null)) {
            throw new Error('Item not removeable error');
        }
        let id: string = this.id;
        let self = this;
        return service.dm_get_children_ids(SEMESTRE_BY_ANNEE, id).then((aa_ids) => {
            return self.remove_with_children(service,aa_ids,id);
        });
    }// remove
} // class Annee
