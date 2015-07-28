//siglenameitem.ts
//
import {BaseItem} from './baseitem';
import {ISigleNameItem} from 'infodata';
//
export class SigleNameItem extends BaseItem implements ISigleNameItem {
    private _sigle: string;
    private _name: string;
	//
    constructor(oMap?: any) {
        super(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.sigle !== undefined) {
                this._sigle = oMap.sigle;
            }
            if (oMap.name !== undefined) {
                this._name = oMap.name;
            }
        } // oMap
    } // constructor
    //
    public from_map(oMap: any): void {
        super.from_map(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.sigle !== undefined) {
                this._sigle = oMap.sigle;
            }
            if (oMap.name !== undefined) {
                this._name = oMap.name;
            }
        }// oMap
    }
    public to_map(oMap: any): void {
        super.to_map(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            oMap.sigle = this.sigle;
            oMap.name = this.name;
        }
    }// toMap
    //
    public get sigle(): string {
        return (this._sigle !== undefined) ? this._sigle : null;
    }
    public set sigle(s: string) {
        let ss: string = null;
        if ((s !== undefined) && (s !== null)) {
            ss = s.trim();
            if (ss.length > 0) {
                ss = ss.toUpperCase();
            } else {
                ss = null;
            }
        }
        this._sigle = ss;
    }
    public get name(): string {
        return (this._name !== undefined) ? this._name : null;
    }
    public set name(s: string) {
        let ss: string = null;
        if ((s !== undefined) && (s !== null)) {
            ss = s.trim();
            if (ss.length > 0) {
                ss = ss.substr(0, 1).toUpperCase() + ss.substr(1);
            } else {
                ss = null;
            }
        }
        this._name = ss;
    }
    public create_id(): string {
        let s = this.start_key();
        if ((s !== null) && (this.sigle !== null)) {
            s = s + this.sigle;
        }
        return s;
    } // create_id
    public is_storeable(): boolean {
        return super.is_storeable() && (this.sigle !== null);
    }
    protected get_text():string {
      return (this.name !== null) ? this.name : this.sigle;
    }
    public get sort_func(): (p1: ISigleNameItem, p2: ISigleNameItem) => number {
        return SigleNameItem.g_sort_func;
    }
    public static g_sort_func(p1: ISigleNameItem, p2: ISigleNameItem): number {
        let nRet = -1;
        if ((p1 !== undefined) && (p1 !== null)) {
            if ((p2 !== undefined) && p2 !== null) {
                let s1 = p1.sigle;
                let s2 = p2.sigle;
                if ((s1 !== null) && (s2 !== null)) {
                    return s1.localeCompare(s2);
                } else if (s1 === null) {
                    nRet = 1;
                }
            }// p2
        } else {
            nRet = 1;
        }
        return nRet;
    } // sort_func
}
