//depsiglenameitem.ts
//

import {SigleNameItem} from './siglenameitem';
import {IDepartementSigleNameItem} from 'infodata';
//
export class DepSigleNameItem extends SigleNameItem implements IDepartementSigleNameItem {
    private _departementid: string;
    constructor(oMap?: any) {
        super(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.departementid !== undefined) {
                this.departementid = oMap.departementid;
            }
        } // oMap
    } // constructor
    public from_map(oMap: any): void {
        super.from_map(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.departementid !== undefined) {
                this.departementid = oMap.departementid;
            }
        }// oMap
    }
    public to_map(oMap: any): void {
        super.to_map(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            oMap.departementid = this.departementid;
        }
    }// toMap
    public get departementid(): string {
        return (this._departementid !== undefined) ? this._departementid : null;
    }
    public set departementid(s: string) {
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
        let s = this.start_key();
        if ((s !== null) && (this.sigle !== null)) {
            s = s + this.sigle;
        }
        return s;
    } // create_id
    public is_storeable(): boolean {
        return super.is_storeable() && (this.departementid !== null);
    }
}
