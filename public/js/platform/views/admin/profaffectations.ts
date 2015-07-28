import {autoinject} from 'aurelia-framework';
import {ProfaffectationModel} from '../../../data/model/profaffectationmodel';
import * as userinf from '../../aureliainfouser';
//
@autoinject
export class ProfAffectations extends ProfaffectationModel {
    constructor(userinfo: userinf.AureliaInfoUser) {
        super(userinfo);
        this.choose_annee = false;
    }
}
