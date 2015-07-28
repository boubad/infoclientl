//unitemodel.ts
import {InfoUserInfo} from './infouserinfo';
import {DepSigleNameViewModel} from './depsiglenamemodel';
import {Unite} from '../domain/unite';
//
export class UniteModel extends DepSigleNameViewModel<Unite> {
    constructor(userinfo:InfoUserInfo) {
        super(userinfo);
        this.title = 'Unités';
    }// constructor
    protected create_item(): Unite {
        return new Unite({
			departementid: this.departementid
		});
    }
    public canActivate(params?: any, config?: any, instruction?: any): any {
        return  this.is_admin;
    }// activate
}// class UniteModel
