//enseignantmodel.ts
import {InfoUserInfo} from './infouserinfo';
import {PersonViewModel} from './personmodel';
import {Enseignant} from '../domain/enseignant';
import {EnseignantPerson} from '../domain/profperson';
//
export class EnseignantModel extends PersonViewModel<Enseignant, EnseignantPerson> {
	constructor(userinfo: InfoUserInfo) {
		super(userinfo);
		this.title = 'Enseignants';
	}// constructor
    protected create_person(): EnseignantPerson {
        let p = new EnseignantPerson();
        return p;
    }
    protected create_item(): Enseignant {
        let p = new Enseignant({ departementid: this.departementid });
        return p;
    }
}// class Enseignants
