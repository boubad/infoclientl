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
}// class GroupeModel
