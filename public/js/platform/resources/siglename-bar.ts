//siglename-bar.ts
//
import {SigleNameItem} from '../../data/domain/siglenameitem';
import {SigleNameViewModel} from '../../data/model/siglenamemodel';
//
export class SiglenameBar {
    //
    private _parent: SigleNameViewModel<SigleNameItem>;
    constructor() {
    }
    public bind(s: SigleNameViewModel<SigleNameItem>) {
        this._parent = s;
    }
    //
    public get isReadOnly():boolean {
      return (this.parent !== null) ? this.parent.isReadOnly : true;
    }
    //
    protected get parent(): SigleNameViewModel<SigleNameItem> {
        return (this._parent !== undefined) ? this._parent : null;
    }
    public get sigle(): string {
        return (this.parent !== null) ? this.parent.sigle : null;
    }
    public set sigle(s: string) {
        if (this.parent !== null) {
            this.parent.sigle = s;
        }
    }
    public get name(): string {
        return (this.parent !== null) ? this.parent.name : null;
    }
    public set name(s: string) {
        if (this.parent !== null) {
            this.parent.name = s;
        }
    }
    public get description(): string {
        return (this.parent !== null) ? this.parent.description : null;
    }
    public set description(s: string) {
        if (this.parent !== null) {
            this.parent.description = s;
        }
    }
}
