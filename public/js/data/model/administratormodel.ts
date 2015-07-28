//administratormodel.ts
import {InfoUserInfo} from './infouserinfo';
import {PersonViewModel} from './personmodel';
import {Administrator} from '../domain/administrator';
import {AdministratorPerson} from '../domain/adminperson';
//
export class AdministratorModel extends PersonViewModel<Administrator, AdministratorPerson> {
	constructor(userinfo: InfoUserInfo) {
		super(userinfo);
		this.title = 'Opérateurs';
	}// constructor
    protected create_person(): AdministratorPerson {
        let p = new AdministratorPerson();
        return p;
    }
    protected create_item(): Administrator {
        let p = new Administrator({ departementid: this.departementid });
        return p;
    }
    public canActivate(params?: any, config?: any, instruction?: any): any {
		return this.is_super;
    }// activate
}// class Administrators
