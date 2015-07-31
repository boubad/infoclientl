//anneemodel.ts
import {InfoUserInfo} from './infouserinfo';
import {IntervalViewModel} from './intervalmodel';
import {Annee} from '../domain/annee';
//
export class AnneeModel extends IntervalViewModel<Annee> {
    constructor(userinfo: InfoUserInfo) {
        super(userinfo);
        this.title = 'Années';
    }// constructor
    protected create_item(): Annee {
        return new Annee({
                     departementid: this.departementid
              });
    }
}// class AnneeModel
