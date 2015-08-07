// elementdesc.ts
//
import {MenuDesc} from './menudesc';
import {IElementDesc, IPerson, IUIManager, IDatabaseManager} from 'infodata';
//
export class ElementDesc extends MenuDesc implements IElementDesc {
    //
    private _rev: string;
    private _deleted: boolean;
    private _avatarid: string;
    //
    constructor(oMap?: any) {
        super(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap._rev !== undefined) {
                this._rev = oMap._rev;
            }
            if (oMap._deleted !== undefined) {
                this._deleted = oMap._deleted;
            }
            if (oMap.avatarid !== undefined) {
                this._avatarid = oMap.avatarid;
            }
        }// oMap
    }// constructor
    //
    public to_map(oMap: any): void {
		super.to_map(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            oMap._rev = this.rev;
            oMap.avatarid = this.avatarid;
            oMap.type = this.type();
        }
    }
    public from_map(oMap: any): void {
		super.from_map(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap._rev !== undefined) {
                this._rev = oMap._rev;
            }
            if (oMap._deleted !== undefined) {
                this._deleted = oMap._deleted;
            }
            if (oMap.avatarid !== undefined) {
                this._avatarid = oMap.avatarid;
            }
        }// oMap
    }
    //
    public type(): string {
        return null;
    }
    public base_prefix(): string {
        return 'element';
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
    protected set_id_rev(id: string, rev: string) {
		super.set_id_rev(id,rev);
        this._rev = rev;
    }
    public create_id(): string {
        return null;
    }
    public avatardocid(): string {
        return this.id;
    }
    //
    public get rev(): string {
        return (this._rev !== undefined) ? this._rev : null;
    }
    public get avatarid(): string {
        return (this._avatarid !== undefined) ? this._avatarid : null;
    }
    public set avatarid(s: string) {
        this._avatarid = (s !== undefined) ? s : null;
    }
    public get deleted(): boolean {
        return ((this._deleted !== undefined) && (this._deleted !== null)) ?
            this._deleted : false;
    }
    //
    public check_id(): void {
        if (this.id === null) {
			super.set_id_rev(this.create_id(),null);
        }
    }
    public check_url(service: IDatabaseManager, man: IUIManager): Promise<ElementDesc> {
        if (this.url !== null) {
            return Promise.resolve(this);
        }
        let id = this.avatardocid();
        if (id === null) {
            return Promise.resolve(this);
        }
        let oData: Blob = null;
        let self = this;
        let attid = this.avatarid;
        if (attid !== null) {
            return service.dm_find_attachment(id, attid).then((data) => {
                if ((data !== undefined) && (data !== null)) {
                    self.url = man.createUrl(data);
                }
                return self;
            });
        } else {
            return service.dm_find_item_by_id(id).then((pPers: IPerson) => {
                if ((pPers !== undefined) && (pPers !== null) && (pPers.avatarid !== null)) {
                    self.avatarid = pPers.avatarid;
                }
                return self.avatarid;
            }).then((x: string) => {
                if ((x !== undefined) && (x !== null)) {
                    return service.dm_find_attachment(id, x);
                } else {
                    return oData;
                }
            }).then((data: Blob) => {
                if ((data !== undefined) && (data !== null)) {
                    self.url = man.createUrl(data);
                }
                return self;
            });
        }
    }
} // class ElementDesc
//
