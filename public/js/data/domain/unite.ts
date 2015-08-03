//unite.ts
//
import {DepSigleNameItem} from './depsiglenameitem';
import {IUnite, IMatiere, IDatabaseManager} from 'infodata';
import {UNITE_TYPE, UNITE_PREFIX, MATIERE_BY_UNITE} from '../utils/infoconstants';
//
export class Unite extends DepSigleNameItem implements IUnite {
    private _coef: number;
    constructor(oMap?: any) {
        super(oMap);
        if ((oMap != undefined) && (oMap != null)) {
            if (oMap.coefficient != undefined) {
                this._coef = oMap.coefficient;
            }
        }// oMap
    } // constructor
    public to_map(oMap: any): void {
        super.to_map(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            oMap.coefficient = this.coefficient;
        }
    }// to_map
    public from_map(oMap: any): void {
        super.from_map(oMap);
        if ((oMap != undefined) && (oMap != null)) {
            if (oMap.coefficient != undefined) {
                this._coef = oMap.coefficient;
            }
        }// oMap
    }
    public get coefficient(): number {
        return ((this._coef !== undefined) && (this._coef !== null) && (this._coef > 0)) ? this._coef : 1.0;
    }
    public set coefficient(d: number) {
        let v = this.check_number(d);
        if ((v != undefined) && (v != null) && (v > 0)) {
            this._coef = v;
        } else {
            this._coef = 1.0;
        }
    }
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
            return self.remove_with_children(service, aa_ids, id);
        });
    }// remove
} // class Unite
