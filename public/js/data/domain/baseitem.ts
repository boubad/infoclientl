//basitem.ts
//
import {ElementDesc} from '../utils/elementdesc';
import {IBaseItem, IDatabaseManager} from 'infodata';
import {BASEITEM_TYPE, BASEITEM_PREFIX} from '../utils/infoconstants';
//
export class BaseItem extends ElementDesc implements IBaseItem {
    //
    private _attachments: any = null;
    //
    constructor(oMap?: any) {
        super(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap._attachments !== undefined) {
                this._attachments = oMap._attachments;
            }
        }// oMap
    }// constructor
    //
    public from_map(oMap: any): void {
        super.from_map(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap._attachments !== undefined) {
                this._attachments = oMap._attachments;
            }
        }// oMap
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
    public is_storeable(): boolean {
        return (this.base_prefix() !== null);
    }
    //
    public get attachments(): any {
        return (this._attachments !== undefined) ? this._attachments : null;
    }
    //
    public load(service: IDatabaseManager): Promise<IBaseItem> {
        this.check_id();
        if (this.id === null) {
          return Promise.resolve(this);
        }
        let self = this;
        return service.dm_find_item_by_id(this.id,true).then((oMap)=>{
           self.from_map(oMap);
           return self;
          })
    }// laod
    //
    public save(service: IDatabaseManager): Promise<IBaseItem> {
        this.check_id();
        if (!this.is_storeable()){
          throw new Error('Item not storeable error');
        }
        let self = this;
        let oMap:any = {};
        this.to_map(oMap);
        return service.dm_maintains_doc(oMap).then((ur)=>{
            if ((ur !== undefined) && (ur !== null) && (ur.ok !== undefined) && (ur.ok == true)){
				self.set_id_rev(ur.id,ur.rev);
            }
            return self;
          });
    }// save
    public remove(service: IDatabaseManager): Promise<any> {
        if ((this.id === null) || (this.rev === null)) {
            throw new Error('Item not removeable error');
        }
        return service.dm_remove_item(this);
    }// save
    protected remove_with_children(service: IDatabaseManager,
          ids: string [],  id: string): Promise<any> {
			  let self = this;
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
                return service.dm_remove_item(self);
            });
    }//remove_with_children
}// class BaseItem
