//infobaseview.ts
//
import * as evtagg from 'aurelia-event-aggregator';
import * as userinf from './infouserinfo';
//
import {InfoRootElement} from './inforootelement';
//
export class InfoBaseView extends InfoRootElement {
    //
    constructor(eventAggregator: evtagg.EventAggregator, userinfo: userinf.InfoUserInfo) {
        super(eventAggregator, userinfo);
    }
    public activate(params?: any, config?: any, instruction?: any): any {
        this.perform_attach();
        if ((this.departement === null) && (this.departements.length > 0)){
          this.departement = this.departements[0];
        }
        return Promise.resolve(true);
    }// activate
    public deactivate(): any {
        this.perform_detach();
    }
    //
}// class InfoUserInfo
