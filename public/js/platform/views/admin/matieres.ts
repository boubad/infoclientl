import {autoinject} from 'aurelia-framework';
import {MatiereModel} from '../../../data/model/matieremodel';
import * as userinf from '../../aureliainfouser';
//
@autoinject
export class Matieres extends MatiereModel {
    constructor(userinfo: userinf.AureliaInfoUser) {
        super(userinfo);
    }
}
