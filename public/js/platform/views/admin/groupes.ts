import {autoinject} from 'aurelia-framework';
import {GroupeModel} from '../../../data/model/groupemodel';
import * as userinf from '../../aureliainfouser';
//
@autoinject
export class Groupes extends GroupeModel {
    constructor(userinfo: userinf.AureliaInfoUser) {
        super(userinfo);
        this.choose_annee = false;
    }
}
