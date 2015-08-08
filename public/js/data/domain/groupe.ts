//groupe.ts
//
import {DepSigleNameItem} from './depsiglenameitem';
import {IBaseItem, IDatabaseManager, IProfAffectation, IEtudAffectation, IGroupe} from 'infodata';
import {GROUPE_TYPE, GROUPE_PREFIX, PROFAFFECTATION_BY_GROUPE,
	 ETUDAFFECTATION_BY_GROUPE,GROUPE_GENRE_COURS,GROUPE_GENRE_TD,
	 GROUPE_GENRE_TP} from '../utils/infoconstants';
//
export class Groupe extends DepSigleNameItem implements IGroupe {
    //
	private _genre: string;
	private _childrenids: string[];
	//
	constructor(oMap?: any) {
        super(oMap);
		if ((oMap !== undefined) && (oMap !== null)) {
			if (oMap.genre !== undefined) {
				this._genre = oMap.genre;
			}
			if (oMap.childrenids !== undefined) {
				this._childrenids = oMap.childrenids;
			}
		}// oMap
    } // constructor
	public from_map(oMap: any): void {
        super.from_map(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.genre !== undefined) {
				this._genre = oMap.genre;
			}
			if (oMap.childrenids !== undefined) {
				this._childrenids = oMap.childrenids;
			}
        }// oMap
    }
	public to_map(oMap: any): void {
        super.to_map(oMap);
        if (this.genre !== null) {
            oMap.genre = this.genre;
        }
		if (this.childrenids.length > 0) {
			oMap.childrenids = this.childrenids;
		}
    }
	public get genre(): string {
		return (this._genre !== undefined) ? this._genre : null;
	}
	public set genre(s: string) {
		this._genre = ((s !== undefined) && (s !== null) && (s.trim().length > 0)) ?
			s.trim().toUpperCase() : GROUPE_GENRE_TP;
	}
	public get childrenids(): string[] {
		return ((this._childrenids !== undefined) && (this._childrenids !== null)) ?
			this._childrenids : [];
	}
	public set childrenids(s: string[]) {
		this._childrenids = this.check_array(s);
	}
    public type(): string {
        return GROUPE_TYPE;
    }
    public base_prefix(): string {
        return GROUPE_PREFIX;
    }
	public add_child_groupe(pg: IGroupe): boolean {
		let bRet: boolean = false;
		if ((pg === undefined) || (pg === null)) {
			return bRet;
		}
		pg.check_id();
		let curid = pg.id;
		if (curid == null) {
			return bRet;
		}
		this.check_id();
		if ((this.id == pg.id) || (this.genre == pg.genre) ||
			(this.departementid != pg.departementid)) {
			return false;
		}
		let sg1 = this.genre;
		let sg2 = pg.genre;
		if (sg1 == GROUPE_GENRE_TP) {
			return bRet;
		} else if ((sg1 == GROUPE_GENRE_TD) && (sg2 != GROUPE_GENRE_TP)) {
			return bRet;
		} else if ((sg1 == GROUPE_GENRE_COURS) && (sg2 !== GROUPE_GENRE_TD)) {
			return bRet;
		}
		if ((this._childrenids === undefined) || (this._childrenids === null)) {
			this._childrenids = [];
		}
		let bFound = false;
		for (let x of this._childrenids) {
			if (x == curid) {
				bFound = true;
				break;
			}
		}
		if (!bFound) {
			this._childrenids.push(curid);
			bRet = true;
		}
		return bRet;
	}// add_child_groupe
	public get_tp_ids(service: IDatabaseManager):Promise<string[]>{
	 let oRet:string[] = [];
	 if (this.genre == GROUPE_GENRE_TP){
		 oRet.push(this.id);
		 return Promise.resolve(oRet);
		} else if (this.genre = GROUPE_GENRE_TD){
			oRet = this.childrenids;
			return Promise.resolve(oRet);
		}
		return service.dm_find_items_array(this.childrenids).then((dd:IGroupe[])=>{
			if ((dd !== undefined) && (dd !== null)){
				for (let td of dd){
					let xi = td.childrenids;
					for (let y of xi){
						oRet.push(y);
					}
				}// dd
			}// dd
			return oRet;
		});
	}// get_tp_ids
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
            return self.remove_with_children(service, docids, id);
        });
    }// remove
} // class Groupe
