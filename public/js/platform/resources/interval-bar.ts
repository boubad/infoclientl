//interval-bar.ts
//
import {IntervalItem} from '../../data/domain/intervalitem';
import {IntervalViewModel} from '../../data/model/intervalmodel';
//
export class IntervalBar {
    //
    private _parent: IntervalViewModel<IntervalItem>;
    constructor() {
    }
    public bind(s: IntervalViewModel<IntervalItem>) {
        this._parent = s;
    }
    //
    protected get parent(): IntervalViewModel<IntervalItem> {
        return (this._parent !== undefined) ? this._parent : null;
    }
    //
    public get isReadOnly():boolean {
      return (this.parent !== null) ? this.parent.isReadOnly : true;
    }
    //
    public get minDate():string {
      return (this.parent !== null) ? this.parent.minDate : null;
    }
    public get maxDate():string {
      return (this.parent !== null) ? this.parent.maxDate : null;
    }
    //
    public get startDate(): string {
      return (this.parent !== null) ? this.parent.startDate : null;
    }
    public set startDate(s: string) {
        if (this.parent !== null){
          this.parent.startDate = s;
        }
    }
    public get endDate(): string {
      return (this.parent !== null) ? this.parent.endDate : null;
    }
    public set endDate(s: string) {
        if (this.parent !== null){
          this.parent.endDate = s;
        }
    }
    //
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

}
