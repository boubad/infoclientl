//unite.ts
//
import {DepSigleNameItem} from './depsiglenameitem';
import {IUnite, IMatiere, IDatabaseManager} from 'infodata';
import {UNITE_TYPE, UNITE_PREFIX,MATIERE_BY_UNITE} from '../utils/infoconstants';
//
export class Unite extends DepSigleNameItem implements IUnite {
    constructor(oMap?: any) {
        super(oMap);
    } // constructor
    public type(): string {
        return UNITE_TYPE;
    }
    public base_prefix(): string {
        return UNITE_PREFIX;
    }
    public remove(service: IDatabaseManager): Promise<any> {
        if ((this.id === null) || (this.rev === null)) {
            throw new Error('Item not removeable error');
        }
        let self = this;
        let id: string = this.id;
        return service.dm_get_children_ids(MATIERE_BY_UNITE, id).then((aa_ids) => {
           return self.remove_with_children(service,aa_ids,id);
        });
    }// remove
} // class Unite
