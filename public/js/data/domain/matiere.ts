//matiere.ts
//
import {DepSigleNameItem} from './depsiglename';
import {IMatiere, IDatabaseManager, IProfAffectation} from 'infodata';
import {MATIERE_TYPE, MATIERE_PREFIX, PROFAFFECTATION_BY_MATIERE} from '../infoconstants';
//
export class Matiere extends DepSigleNameItem implements IMatiere {
    //
    private _uniteid: string;
    private _genre: string;
    private _mat_module: string;
    private _coef: number;
    private _ecs: number;
    //
    constructor(oMap?: any) {
        super(oMap);
        if ((oMap != undefined) && (oMap != null)) {
            if (oMap.uniteid != undefined) {
                this.uniteid = oMap.uniteid;
            }
            if (oMap.coefficient != undefined) {
                this.coefficient = oMap.coefficient;
            }
            if (oMap.ecs != undefined) {
                this.ecs = oMap.ecs;
            }
            if (oMap.genre != undefined) {
                this.genre = oMap.genre;
            }
            if (oMap.mat_module != undefined) {
                this.mat_module = oMap.mat_module;
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
        }
    }// to_map
    public from_map(oMap: any): void {
        super.from_map(oMap);
        if ((oMap != undefined) && (oMap != null)) {
            if (oMap.uniteid != undefined) {
                this.uniteid = oMap.uniteid;
            }
            if (oMap.coefficient != undefined) {
                this.coefficient = oMap.coefficient;
            }
            if (oMap.ecs != undefined) {
                this.ecs = oMap.ecs;
            }
            if (oMap.genre != undefined) {
                this.genre = oMap.genre;
            }
            if (oMap.mat_module != undefined) {
                this.mat_module = oMap.mat_module;
            }
        }// oMap
    }
    //
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
        return (this._coef !== undefined) ? this._coef : null;
    }
    public set coefficient(d: number) {
        let v = this.check_number(d);
        if ((v != undefined) && (v != null) && (v > 0)) {
            this._coef = v;
        } else {
            this._coef = null;
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

    public remove(service: IDatabaseManager): Promise<any> {
        if ((service === undefined) || (service === null)) {
            return Promise.reject(new Error('Invalid service'));
        }
        if ((this.id === null) || (this.rev === null)) {
            return Promise.reject(new Error('Item not removeable error'));
        }
        let self = this;
        let id: string = this.id;
        return service.get_children_ids(PROFAFFECTATION_BY_MATIERE, id).then((aa_ids) => {
            return self.remove_with_children(service,aa_ids,id);
        });
    }// remove
} // class Unite
