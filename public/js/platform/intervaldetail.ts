//intervaldetail.ts
import {InfoRootElement} from './inforootelement';
import {SigleNameDetail} from './siglenamedetail';
import {IIntervalItem} from 'infodata';
//
export class IntervalDetail<T extends IIntervalItem, P extends InfoRootElement> extends SigleNameDetail<T, P> {
    constructor() {
        super();
    }
    //
    public get startDate(): string {
        return ((this.item !== null) && (this.item.startDate !== null)) ?
            this.date_to_string(this.item.startDate) : null;
    }
    public set startDate(s: string) {
        if (this.item !== null) {
            this.item.startDate = this.string_to_date(s);
        }
    }
    public get endDate(): string {
        return ((this.item !== null) && (this.item.endDate !== null)) ?
            this.date_to_string(this.item.endDate) : null;
    }
    public set endDate(s: string) {
        if (this.item !== null) {
            this.item.endDate = this.string_to_date(s);
        }
    }
    //
}
