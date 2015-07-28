import {EtudDetailModel} from '../../../data/model/etudiantdetailmodel';
import * as userinf from '../../aureliainfouser';
import {autoinject} from 'aurelia-framework';
//
@autoinject
export class Groupeeventdetail extends EtudDetailModel {
    constructor(userinfo: userinf.AureliaInfoUser) {
        super(userinfo);
    }
}
