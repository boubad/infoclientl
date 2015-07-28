//semestre.ts
//
import { IntervalItem} from "./intervalitem";
import {IBaseItem,
ISemestre, IDatabaseManager, IProfAffectation, IEtudAffectation} from 'infodata';
import {SEMESTRE_TYPE, SEMESTRE_PREFIX, PROFAFFECTATION_BY_SEMESTRE, ETUDAFFECTATION_BY_SEMESTRE} from '../utils/infoconstants';
//
export class Semestre extends IntervalItem implements ISemestre {
    public _anneeid: string = null;
    constructor(oMap?: any) {
        super(oMap);
        if ((oMap != undefined) && (oMap != null)) {
            if (oMap.anneeid != undefined) {
                this._anneeid = oMap.anneeid;
            }
        } // oMap
    } // constructor
    public to_map(oMap: any): void {
        super.to_map(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            oMap.anneeid = this.anneeid;
        }
    }// to_map
    public from_map(oMap: any): void {
        super.from_map(oMap);
        if ((oMap != undefined) && (oMap != null)) {
            if (oMap.anneeid != undefined) {
                this._anneeid = oMap.anneeid;
            }
        }// oMap
    }
    public get anneeid(): string {
        return (this._anneeid !== undefined) ? this._anneeid : null;
    }
    public set anneeid(s: string) {
        this._anneeid = (s !== undefined) ? s : null;
    }
    public base_prefix(): string {
        return SEMESTRE_PREFIX;
    }
    public type(): string {
        return SEMESTRE_TYPE;
    }
    public start_key(): string {
        let s = this.base_prefix();
        if ((s !== null) && (this.anneeid !== null)) {
            s = s + this.anneeid;
        }
        return s;
    }
    public is_storeable(): boolean {
        return super.is_storeable() && (this.anneeid !== null);
    }
    public remove(service: IDatabaseManager): Promise<any> {
        if ((this.id === null) || (this.rev === null)) {
            throw new Error('Item not removeable error');
        }
        let self = this;
        let id: string = this.id;
        let docids: string[] = [];
        return service.dm_get_children_ids(PROFAFFECTATION_BY_SEMESTRE, id).then((aa_ids) => {
            if ((aa_ids !== undefined) && (aa_ids !== null)) {
                for (let x of aa_ids) {
                    self.add_id_to_array(docids, x);
                }
            }
            return service.dm_get_children_ids(ETUDAFFECTATION_BY_SEMESTRE, id);
        }).then((uu_ids) => {
            if ((uu_ids !== undefined) && (uu_ids !== null)) {
                for (let x of uu_ids) {
                    self.add_id_to_array(docids, x);
                }
            }
            return self.remove_with_children(service,docids,id);
        });
    }// remove
} // class Semestre
