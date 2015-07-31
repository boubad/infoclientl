//interval-bar.ts
//
import {IntervalItem} from '../../data/domain/intervalitem';
import {IntervalViewModel} from '../../data/model/intervalmodel';
import {IntervalComponent} from '../../data/components/intervalcomponent';
//
export class IntervalBar extends IntervalComponent<IntervalItem> {
    constructor() {
      super();
    }
}
