//intervalview.ts
import {InfoUserInfo} from './infouserinfo';
import {DepSigleNameViewModel} from './depsiglenamemodel';
import {IIntervalItem} from 'infodata';
//
export class IntervalViewModel<T extends IIntervalItem>
        extends DepSigleNameViewModel<T> {
    //
    public minDate:  string;
    public maxDate:  string;
    //
    constructor(userinfo: InfoUserInfo) {
        super(userinfo);
              this.minDate = null;
              this.maxDate = null;
    }
    //
    public get startDate(): string {
          return (this.currentItem !== null) ?
                  this.date_to_string(this.currentItem.startDate) : null;
    }
    public set startDate(s: string) {
        let x = this.currentItem;
        if (x !== null) {
            x.startDate   = this.string_to_date(s);
        }
    }
    public get endDate(): string {
          return (this.currentItem !== null) ?
                  this.date_to_string(this.currentItem.endDate) : null;
    }
    public set endDate(s: string) {
        let x = this.currentItem;
        if (x !== null) {
            x.endDate   = this.string_to_date(s);
        }
    }
}// class IntervalViewModel
