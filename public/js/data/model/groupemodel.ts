//groupemodel.ts
import {InfoUserInfo} from './infouserinfo';
import {DepSigleNameViewModel} from './depsiglenamemodel';
import {Groupe} from '../domain/groupe';
//
export class GroupeModel extends DepSigleNameViewModel<Groupe> {
    constructor(userinfo:InfoUserInfo) {
        super(userinfo);
        this.title = 'Groupes';
    }// constructor
    protected create_item(): Groupe {
        return new Groupe({
			departementid: this.departementid
		});
    }
    public canActivate(params?: any, config?: any, instruction?: any): any {
        return  this.is_admin;
    }// activate
}// class GroupeModel
