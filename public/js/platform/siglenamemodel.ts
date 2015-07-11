//siglenamemodel.ts
//
import * as evtagg from 'aurelia-event-aggregator';
import * as userinf  from './infouserinfo';
import {BaseEditViewModel} from './baseeditmodel';
import {ISigleNameItem} from 'infodata';
//
export class SigleNameViewModel<T extends ISigleNameItem> extends BaseEditViewModel<T> {
    //
    constructor(eventAggregator: evtagg.EventAggregator, userinfo: userinf.InfoUserInfo) {
        super(eventAggregator, userinfo);
    }
    //
    public get sigle(): string {
        return (this.currentItem !== null) ? this.currentItem.sigle : null;
    }
    public set sigle(s: string) {
        let x = this.currentItem;
        if (x !== null) {
            x.sigle = s.trim().toUpperCase();
        }
    }
    public get name(): string {
        return (this.currentItem !== null) ? this.currentItem.name : null;
    }
    public set name(s: string) {
        let x = this.currentItem;
        if (x !== null) {
            x.name = s.trim();
        }
    }

}// class BaseEditViewModel
