//home.ts
//
import {autoinject} from 'aurelia-framework';
import {InfoBaseView} from '../platform/infobaseview';
import * as userinf from '../platform/infouserinfo';
import * as evtagg from 'aurelia-event-aggregator';
//
@autoinject
export class home extends InfoBaseView {
    constructor(eventAggregator: evtagg.EventAggregator, userinfo: userinf.InfoUserInfo) {
        super(eventAggregator, userinfo);
    }
    public get homeImageUrl(): string {
        return this.baseUrl + 'images/' + this.base_image;
    }
    protected get base_image(): string {
        if (this.is_super) {
            return "oper.jpg";
        }
        else if (this.is_admin) {
            return "admin.jpg";
        } else if (this.is_etud) {
            return "etudiant.jpg";
        } else {
            return "home.jpg";
        }
    }
    public activate(params?: any, config?: any, instruction?: any): any {
        let self = this;
        return super.activate(params, config, instruction).then((r) => {
            return self.dataService.check_database();
        });
    }// activate
}// class Login
