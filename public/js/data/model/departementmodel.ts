//departementmodel.ts
import {InfoUserInfo} from './infouserinfo';
import {SigleNameViewModel} from './siglenamemodel';
import {Departement} from '../domain/departement';
//
export class DepartementModel extends SigleNameViewModel<Departement> {
    constructor(userinfo: InfoUserInfo) {
        super(userinfo);
        this.title = 'Départements';
    }// constructor
    protected create_item(): Departement {
        return new Departement();
    }
	protected get_all_ids(): Promise<string[]> {
		if (this.is_super) {
			return super.get_all_ids();
		}
		let aa = this.userInfo.departements;
		let oRet: string[] = [];
		for (let dep of aa) {
			oRet.push(dep.id);
		}
		return Promise.resolve(oRet);
    }// get_all_ids
}// class DepartementModel
