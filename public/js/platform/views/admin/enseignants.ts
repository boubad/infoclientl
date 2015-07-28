import {autoinject} from 'aurelia-framework';
import {EnseignantModel} from '../../../data/model/enseignantmodel';
import * as userinf from '../../aureliainfouser';
//
@autoinject
export class Enseignants extends EnseignantModel {
    constructor(userinfo: userinf.AureliaInfoUser) {
        super(userinfo);
    }
}
