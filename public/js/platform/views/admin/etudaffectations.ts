import {autoinject} from 'aurelia-framework';
import {EtudaffectationModel} from '../../../data/model/etudaffectationmodel';
import * as userinf from '../../aureliainfouser';
//
@autoinject
export class EtudAffectations extends EtudaffectationModel {
    constructor(userinfo: userinf.AureliaInfoUser) {
        super(userinfo);
        this.choose_annee = false;
    }
}
