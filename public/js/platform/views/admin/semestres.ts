import {autoinject} from 'aurelia-framework';
import {SemestreModel} from '../../../data/model/semestremodel';
import * as userinf from '../../aureliainfouser';
//
@autoinject
export class Semestres extends SemestreModel {
    constructor(userinfo: userinf.AureliaInfoUser) {
        super(userinfo);
        this.choose_annee = true;
    }
}
