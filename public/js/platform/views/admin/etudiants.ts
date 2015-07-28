import {autoinject} from 'aurelia-framework';
import {EtudiantModel} from '../../../data/model/etudiantmodel';
import * as userinf from '../../aureliainfouser';
//
@autoinject
export class Etudiants extends EtudiantModel {
    constructor(userinfo: userinf.AureliaInfoUser) {
        super(userinfo);
    }
}
