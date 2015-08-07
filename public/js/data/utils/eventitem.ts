//eventitem.ts
//
import {IPerson, IEventItem, INoteItem, INoteItemMap, IEtudEvent} from 'infodata';
import {MyMap} from './mymap';
import {NOTE_GENRE, ETUDDETAIL_ROUTE, GRPEVTDETAIL_ROUTE, ETUDEVTDETAIL_ROUTE} from './infoconstants';
//
export class EventItem implements IEventItem {
	private _name: string;
	private _count: number;
	private _desc:string;
	//
	constructor(xname?: string, nb?: number) {
		if ((xname !== undefined) && (xname !== null) && (xname.trim().length > 0)) {
            this._name = xname;
        }
		if ((nb !== undefined) && (nb !== null) && (nb > 0)) {
			this._count = nb;
		}
	}// constructor
	public add(genre: string, desc?:string): void {
		if ((genre !== undefined) && (genre !== null) && (genre.trim().length > 0)) {
			let s1 = genre.trim().toUpperCase();
			if (this.name !== null) {
				let s2 = this.name.trim().toUpperCase();
				if (s1.localeCompare(s2) == 0) {
					if ((this._count === undefined) || (this._count === null)) {
						this._count = 0;
					}
					this._count = this._count + 1;
					this.add_desc(desc);
				}// match
			}// name
		}
	}// add
	public add_desc(s:string): void{
		let ss = ((s !== undefined) && (s !== null) && (s.trim().length > 0)) ?
		s.trim() : null;
		if (ss === null){
			return;
		}
		if ((this._desc === undefined) || (this._desc == null)){
			this._desc = ss;
		} else {
			this._desc = this._desc + '\r\n' + ss;
		}
	}// add_desc
	public get name(): string {
        return ((this._name !== undefined) && (this._name !== null) &&
            (this._name.trim().length > 0)) ? this._name.trim() : null;
    }
	public get description(): string {
        return ((this._desc !== undefined) && (this._desc !== null) &&
            (this._desc.trim().length > 0)) ? this._desc.trim() : null;
    }
	public get count(): number {
        return (this._count > 0) ? this._count : null;
    }
	public get has_count(): boolean {
		return (this.count !== null) && (this.count > 0);
	}
}
//
export class EventItemMap {
	private _name: string;
    private _notesMap: MyMap<string, EventItem>;
    //
    constructor(xname?: string) {
		this._name = xname;
        this._notesMap = new MyMap<string, EventItem>();
    }// constructor
	public get name(): string {
        return ((this._name !== undefined) && (this._name !== null) &&
            (this._name.trim().length > 0)) ? this._name.trim() : null;
    }
    public get_values(): EventItem[] {
        let oRet: EventItem[] = [];
        this._notesMap.forEach((val, index) => {
            oRet.push(val);
        });
        return oRet;
    }// get_values
    public add(item: string): void {
        if ((item !== undefined) && (item !== null)) {
            let xi: EventItem = null;
            if (!this._notesMap.has(item)) {
                xi = new EventItem(item);
                this._notesMap.set(item, xi);
            } else {
                xi = this._notesMap.get_val(item);
            }
            xi.add(item);
        }// item
    }// add
}// EventItemMap
