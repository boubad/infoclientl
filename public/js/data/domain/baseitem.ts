//basitem.ts
//
import {ElementDesc} from '../elementdesc';
import {IBaseItem, IDatabaseManager} from 'infodata';
import {BASEITEM_TYPE, BASEITEM_PREFIX} from '../infoconstants';
//
export class BaseItem extends ElementDesc implements IBaseItem {
    //
    private _id: string;
    private _rev: string;
    private _deleted: boolean;
    private _attachments: any = null;
    //
    constructor(oMap?: any) {
        super(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap._id !== undefined) {
                this._id = oMap._id;
            }
            if (oMap._rev !== undefined) {
                this._rev = oMap._rev;
            }
            if (oMap._deleted !== undefined) {
                this._deleted = oMap._deleted;
            }
            if ((oMap._attachments !== undefined) && (oMap._attachments !== null)) {
                this._attachments = oMap._attachments;
            }
        }// oMap
    }// constructor
    //
    public from_map(oMap: any): void {
        super.from_map(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap._id !== undefined) {
                this._id = oMap._id;
            }
            if (oMap._rev !== undefined) {
                this._rev = oMap._rev;
            }
            if (oMap._deleted !== undefined) {
                this._deleted = oMap._deleted;
            }
            if ((oMap._attachments !== undefined) && (oMap._attachments !== null)) {
                this._attachments = oMap._attachments;
            }
        }// oMap
    }
    public to_map(oMap: any): void {
        super.to_map(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            oMap.type = this.type();
            if (this.id === null) {
                if (this.is_storeable()) {
                    this.id = this.create_id();
                }
            }
            if (this.id !== null) {
                oMap._id = this.id;
            }
            if (this.rev !== null) {
                oMap._rev = this.rev;
            }
        }// oMap
    }// toMap
    //
    public avatardocid(): string {
        return this.id;
    }
    //
    public type(): string {
        return BASEITEM_TYPE;
    }
    public base_prefix(): string {
        return BASEITEM_PREFIX;
    }
    public start_key(): string {
        return this.base_prefix();
    }
    public end_key(): string {
        let s = this.start_key();
        if (s !== null) {
            s = s + '\uffff';
        }
        return s;
    }
    public create_id(): string {
        let sx = this.create_random_id();
        let s = this.base_prefix();
        if (s !== null) {
            s = s  + sx;
        } else {
          s = sx;
        }
        return s;
    }
    public check_id(): void {
          if ((this._id === undefined) || (this._id === null)) {
                this._id = this.create_id();
          }
    }
    public is_storeable(): boolean {
        return (this.base_prefix() !== null);
    }
    //
    public get id(): string {
        return (this._id !== undefined) ? this._id : null;
    }
    public get rev(): string {
        return (this._rev !== undefined) ? this._rev : null;
    }
    public get deleted(): boolean {
        return (this._deleted !== undefined) ? this._deleted : false;
    }
    public get attachments(): any {
        return (this._attachments !== undefined) ? this._attachments : null;
    }
    //
    public load(service: IDatabaseManager): Promise<IBaseItem> {
        if ((service === undefined) || (service === null)) {
            return Promise.resolve(this);
        }
        this.check_id();
        if (this.id === null) {
          return Promise.resolve(this);
        }
        return service.dm_find_item_by_id(this.id);
    }
    //
    public save(service: IDatabaseManager): Promise<IBaseItem> {
        if ((service === undefined) || (service === null)) {
          return Promise.resolve(this);
        }
        return service.dm_maintains_item(this);
    }// save
    public remove(service: IDatabaseManager): Promise<any> {
        if ((this.id === null) || (this.rev === null)) {
            Promise.reject(new Error('Item not removeable error'));
        }
        return service.dm_remove_item(this);
    }// save
    protected remove_with_children(service: IDatabaseManager,
          ids: string [],  id: string): Promise<any> {
            return service.dm_find_items_array(ids).then((gg: IBaseItem[]) => {
                let pp: Promise<any>[] = [];
                if ((gg !== undefined) && (gg !== null) && (gg.length >  0)) {
                        for (let y of gg) {
                            pp.push(y.remove(service));
                        }
                  }
                if (pp.length > 0) {
                    return Promise.all(pp);
                } else {
                    return [];
                }
            }).then((xx) => {
                return service.remove_item(id);
            });
    }//remove_with_children
}// class BaseItem
