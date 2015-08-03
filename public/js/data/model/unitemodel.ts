//unitemodel.ts
import {InfoUserInfo} from './infouserinfo';
import {DepSigleNameViewModel} from './depsiglenamemodel';
import {Unite} from '../domain/unite';
//
export class UniteModel extends DepSigleNameViewModel<Unite> {
    constructor(userinfo: InfoUserInfo) {
        super(userinfo);
        this.title = 'Unités';
    }// constructor
    protected create_item(): Unite {
        return new Unite({
            departementid: this.departementid
        });
    }
    public get coefficient(): string {
        return (this.currentItem !== null) ? this.number_to_string(this.currentItem.coefficient) : null;
    }
    public set coefficient(s: string) {
    }
}// class UniteModel
