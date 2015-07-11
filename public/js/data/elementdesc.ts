// elementdesc.ts
//
import {InfoElement} from './infoelement';
import {IElementDesc, IRootDatabaseManager, IUIManager, IPouchDoc} from 'infodata';
//
export class ElementDesc extends InfoElement implements IElementDesc {
    //
    private _url: string;
    private _selected: boolean;
    private _avatarid: string;
    private _desc: string;
    //
    constructor(oMap?: any) {
        super();
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.avatarid !== undefined) {
                this.avatarid = oMap.avatarid;
            }
            if (oMap.description !== undefined) {
                this.description = oMap.description;
            }
        }// oMap
    }
    //
    protected get_text(): string {
        return null;
    }
    //
    public to_map(oMap: any): void {
        if ((oMap !== undefined) && (oMap !== null)) {
            oMap.avatarid = this.avatarid;
            oMap.description = this.description;
        }
    }
    public from_map(oMap: any): void {
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.avatarid !== undefined) {
                this.avatarid = oMap.avatarid;
            }
            if (oMap.description !== undefined) {
                this.description = oMap.description;
            }
        }// oMap
    }
    //
    public get description(): string {
        return (this._desc !== undefined) ? this._desc : null;
    }
    public set description(s: string) {
        this._desc = ((s !== undefined) && (s !== null)) ? s.trim() : null;
    }
    public get avatarid(): string {
        return (this._avatarid !== undefined) ? this._avatarid : null;
    }
    public set avatarid(s: string) {
        this._avatarid = (s !== undefined) ? s : null;
    }
    public avatardocid(): string {
        return null;
    }
    public get selected(): boolean {
        return ((this._selected !== undefined) && (this._selected !== null)) ?
            this._selected : false;
    }
    public set selected(s: boolean) {
        this._selected = ((s !== undefined) && (s !== null)) ? s : false;
    }
    public get text(): string {
        return this.get_text();
    }
    public get url(): string {
        return (this._url !== undefined) ? this._url : null;
    }
    public set url(s: string) {
        this._url = (s !== undefined) ? s : null;
    }
    public get has_url(): boolean {
        return (this.url !== null);
    }
    public get sort_func(): (p1: IElementDesc, p2: IElementDesc) => number {
        return ElementDesc.g_sort_func;
    }
    public toString(): string {
        return this.text;
    } // toString
    public static g_sort_func(p1: IElementDesc, p2: IElementDesc): number {
        let nRet = -1;
        if ((p1 !== undefined) && (p1 !== null)) {
            if ((p2 !== undefined) && p2 !== null) {
                let s1 = p1.text;
                let s2 = p2.text;
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
    }// sort_func
    public check_url(service: IRootDatabaseManager, man: IUIManager): Promise<IElementDesc> {
        if ((service === undefined) || (service === null) || (man === undefined) ||
            (man === null)) {
            return Promise.resolve(this);
        }
        if (this.url !== null) {
            return Promise.resolve(this);
        }
        let id = this.avatardocid();
        let attid = this.avatarid;
        if ((id === null) || (attid === null)) {
            return Promise.resolve(this);
        }
        let self = this;
        return service.find_attachment(id, attid).then((data) => {
            if ((data !== undefined) && (data !== null)) {
                self.url = man.createUrl(data);
            }
            return self;
        });
    }
} // class ElementDesc
//
