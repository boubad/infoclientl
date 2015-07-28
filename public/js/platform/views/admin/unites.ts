import {autoinject} from 'aurelia-framework';
import {UniteModel} from '../../../data/model/unitemodel';
import * as userinf from '../../aureliainfouser';
//
@autoinject
export class Unites extends UniteModel {
    constructor(userinfo: userinf.AureliaInfoUser) {
        super(userinfo);
        this.choose_annee = false;
    }
}
