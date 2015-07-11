//depsiglenamemodel.ts
//
import * as evtagg from 'aurelia-event-aggregator';
import * as userinf  from './infouserinfo';
import {SigleNameViewModel} from './siglenamemodel';
import {IDepartementSigleNameItem} from 'infodata';
//
export class DepSigleNameViewModel<T extends IDepartementSigleNameItem>
    extends SigleNameViewModel<T> {
    //
    constructor(eventAggregator: evtagg.EventAggregator, userinfo: userinf.InfoUserInfo) {
        super(eventAggregator, userinfo);
    }
    //
    protected is_refresh(): boolean {
        return (this.departementid !== null);
    }
    protected post_change_departement(): Promise<any> {
        let self = this;
        return super.post_change_departement().then((r) => {
            self.modelItem.departementid = self.departementid;
            return self.refreshAll();
        });
    }
}// class BaseEditViewModel
