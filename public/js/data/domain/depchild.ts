//depchild.ts
//
import {BaseItem} from './baseitem';
import {IDepartementChildItem} from 'infodata';
//
export class DepartementChildItem extends BaseItem
    implements IDepartementChildItem {
    public _departementid: string = null;
    constructor(oMap?: any) {
        super(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.departementid !== undefined) {
                this._departementid = oMap.departementid;
            }
        } // oMap
    } // constructor
    public to_map(oMap: any): void {
        super.to_map(oMap);
        if (this.departementid !== null) {
            oMap.departementid = this.departementid;
        }
    } // toInsertMap
    public from_map(oMap: any): void {
        super.from_map(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.departementid !== undefined) {
                this._departementid = oMap.departementid;
            }
        } // oMap
    }
	public get departementid():string {
		return (this._departementid !== undefined) ? this._departementid : null;
	}
	public set departementid(s:string){
		this._departementid = (s !== undefined) ? s : null;
	}
    public start_key(): string {
        let s = this.base_prefix();
        if ((s !== null) && (this.departementid !== null)) {
            s = s + this.departementid;
        }
        return s;
    }
	public create_id(): string {
		let sx = this.create_random_id();
        let s = this.start_key();
        if (s !== null) {
            s = s  + sx;
        } else {
          s = sx;
        }
        return s;
    }
    public is_storeable(): boolean {
        return super.is_storeable() && (this.departementid !== null);
    }

}
