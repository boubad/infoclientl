//matiere.ts
//
import {DepSigleNameItem} from './depsiglenameitem';
import {IBaseItem, IMatiere, IUnite, IDatabaseManager, IProfAffectation} from 'infodata';
import {MATIERE_TYPE, MATIERE_PREFIX, PROFAFFECTATION_BY_MATIERE} from '../utils/infoconstants';
//
export class Matiere extends DepSigleNameItem implements IMatiere {
    //
    private _uniteid: string;
    private _genre: string;
    private _mat_module: string;
    private _coef: number;
    private _ecs: number;
    private _order: number;
    //
    constructor(oMap?: any) {
        super(oMap);
        if ((oMap != undefined) && (oMap != null)) {
            if (oMap.uniteid != undefined) {
                this._uniteid = oMap.uniteid;
            }
            if (oMap.coefficient != undefined) {
                this._coef = oMap.coefficient;
            }
            if (oMap.ecs != undefined) {
                this._ecs = oMap.ecs;
            }
            if (oMap.genre != undefined) {
                this._genre = oMap.genre;
            }
            if (oMap.mat_module != undefined) {
                this._mat_module = oMap.mat_module;
            }
            if (oMap.order !== undefined) {
                this._order = oMap.order;
            }
        }// oMap
    } // constructor
    //
    public to_map(oMap: any): void {
        super.to_map(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            oMap.uniteid = this.uniteid;
            oMap.genre = this.genre;
            oMap.mat_module = this.mat_module;
            oMap.coefficient = this.coefficient;
            oMap.ecs = this.ecs;
            oMap.order = this.order;
        }
    }// to_map
    public from_map(oMap: any): void {
        super.from_map(oMap);
        if ((oMap != undefined) && (oMap != null)) {
            if (oMap.uniteid != undefined) {
                this._uniteid = oMap.uniteid;
            }
            if (oMap.coefficient != undefined) {
                this._coef = oMap.coefficient;
            }
            if (oMap.ecs != undefined) {
                this._ecs = oMap.ecs;
            }
            if (oMap.genre != undefined) {
                this._genre = oMap.genre;
            }
            if (oMap.mat_module != undefined) {
                this._mat_module = oMap.mat_module;
            }
            if (oMap.order !== undefined) {
                this._order = oMap.order;
            }
        }// oMap
    }
    //
    public get order(): number {
        return (this._order !== undefined) ? this._order : 0;
    }
    public set order(d: number) {
        let v = this.check_number(d);
        if ((v != undefined) && (v != null) && (v > 0)) {
            this._order = v;
        } else {
            this._order = 0;
        }
    }
    public get uniteid(): string {
        return (this._uniteid !== undefined) ? this._uniteid : null;
    }
    public set uniteid(s: string) {
        this._uniteid = (s !== undefined) ? s : null;
    }
    public get genre(): string {
        return (this._genre !== undefined) ? this._genre : null;
    }
    public set genre(s: string) {
        this._genre = ((s !== undefined) && (s !== null) && (s.trim().length > 0)) ?
            s.trim().toUpperCase() : null;
    }
    public get mat_module(): string {
        return (this._mat_module !== undefined) ? this._mat_module : null;
    }
    public set mat_module(s: string) {
        this._mat_module = ((s !== undefined) && (s !== null) && (s.trim().length > 0)) ?
            s.trim().toUpperCase() : null;
    }
    public get ecs(): number {
        return (this._ecs !== undefined) ? this._ecs : null;
    }
    public set ecs(d: number) {
        let v = this.check_number(d);
        if ((v != undefined) && (v != null) && (v > 0)) {
            this._ecs = v;
        } else {
            this._ecs = null;
        }
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
    public base_prefix(): string {
        return MATIERE_PREFIX;
    }
    public type(): string {
        return MATIERE_TYPE;
    }
    public start_key(): string {
        let s = this.base_prefix();
        if ((s !== null) && (this.uniteid !== null)) {
            s = s + this.uniteid;
        }
        return s;
    }

    public is_storeable(): boolean {
        return super.is_storeable() && (this.uniteid !== null);
    }
    public save(service: IDatabaseManager): Promise<IBaseItem> {
        if (!this.is_storeable()) {
            throw new Error('Item not storeable error (personid)');
        }
		this.check_id();
		let id = this.id;
        let self = this;
        let start = this.start_key();
        let end = this.end_key();
        let sum: number = 0;
        let pUnite: IUnite = null;
        return service.dm_find_item_by_id(this.uniteid).then((px: IUnite) => {
            if ((px === undefined) || (px === null)) {
                throw new Error('Unknown unite.');
            }
            pUnite = px;
            return service.dm_get_items(start, end);
        }).then((mm: IMatiere[]) => {
            if ((mm !== undefined) && (mm !== null)) {
                for (let x of mm) {
					if (x.id !== id){
                    sum += x.coefficient;
					}
                }
            }
			sum = sum + self.coefficient;
			pUnite.coefficient = (sum > 0) ? sum : 1.0;
            return pUnite.save(service);
        }).then((x) => {
            return super.save(service);
        }).catch((err) => {
            return self;
        });
    }// save
    public remove(service: IDatabaseManager): Promise<any> {
        if ((this.id === null) || (this.rev === null)) {
            throw new Error('Item not removeable error');
        }
        let self = this;
        let id: string = this.id;
        return service.dm_get_children_ids(PROFAFFECTATION_BY_MATIERE, id).then((aa_ids) => {
            return self.remove_with_children(service, aa_ids, id);
        });
    }// remove
} // class Unite
