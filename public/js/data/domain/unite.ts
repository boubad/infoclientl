//unite.ts
//
import {DepSigleNameItem} from './depsiglename';
import {IUnite, IMatiere, IDatabaseManager} from 'infodata';
import {UNITE_TYPE, UNITE_PREFIX,MATIERE_BY_UNITE} from '../infoconstants';
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
        if ((service === undefined) || (service === null)) {
            return Promise.reject(new Error('Invalid service'));
        }
        if ((this.id === null) || (this.rev === null)) {
            return Promise.reject(new Error('Item not removeable error'));
        }
        let self = this;
        let id: string = this.id;
        return service.get_children_ids(MATIERE_BY_UNITE, id).then((aa_ids) => {
           return self.remove_with_children(service,aa_ids,id);
        });
    }// remove
} // class Unite
