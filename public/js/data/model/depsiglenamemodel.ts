//depsiglenamemodel.ts
import {InfoUserInfo} from './infouserinfo';
import {SigleNameViewModel} from './siglenamemodel';
import {IDepartementSigleNameItem} from 'infodata';
//
export class DepSigleNameViewModel<T extends IDepartementSigleNameItem>
    extends SigleNameViewModel<T> {
    //
    constructor(userinfo: InfoUserInfo) {
        super(userinfo);
    }
    //
    protected perform_activate(): Promise<any> {
        let self = this;
        return super.perform_activate().then((r) => {
            self.choose_departement = true;
            return true;
        });
    }
    protected is_refresh(): boolean {
        return (this.departementid !== null);
    }
    protected post_change_departement(): Promise<any> {
        let self = this;
        return super.post_change_departement().then((r) => {
            self.modelItem.departementid = self.departementid;
            self.currentItem = this.create_item();
            return this.refreshAll();
        });
    }
}// class BaseEditViewModel
