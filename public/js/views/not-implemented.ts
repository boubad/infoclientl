//not-implemented.ts
import {autoinject} from 'aurelia-framework';
//
import {InfoBaseView} from '../platform/infobaseview';
import * as userinf from '../platform/infouserinfo';
import * as evtagg from 'aurelia-event-aggregator';
//
@autoinject
export class NotImplemented extends InfoBaseView {
    //
    public heading: string = 'Info App. Not (yet) implemented!';
    constructor(eventAggregator: evtagg.EventAggregator, userinfo: userinf.InfoUserInfo) {
        super(eventAggregator, userinfo);
        this.title = 'NotImplemented';
    }
  
}// NotImplemented
