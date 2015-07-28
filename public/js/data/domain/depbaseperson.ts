//depbaseperson.ts
//
import {Person} from './person';
import {IDepBasePerson} from 'infodata';
//
export class DepartementBasePerson extends Person implements IDepBasePerson {
    //
    public _departementids: string[];
    //
    constructor(oMap?: any) {
        super(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.departementids !== undefined) {
                this._departementids = oMap.departementids;
            } //
        } // oMap
    } // constructor
    //
    public from_map(oMap: any): void {
        super.from_map(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.departementids !== undefined) {
                this._departementids = oMap.departementids;
            } //
        } // oMap
    }
    //
    public to_map(oMap: any): void {
        super.to_map(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            oMap.departementids = this.departementids;
        }
    } // to_insert_map
    //
	public get departementids(): string[] {
		if ((this._departementids == undefined) || (this._departementids === null)) {
			this._departementids = [];
		}
		return this._departementids;
	}
} // class Person
