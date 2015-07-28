import {EtudEventDetailModel} from '../../../data/model/etudeventdetailmodel';
import * as userinf from '../../aureliainfouser';
import {autoinject} from 'aurelia-framework';
//
@autoinject
export class Etudeventdetail extends EtudEventDetailModel {
    constructor(userinfo: userinf.AureliaInfoUser) {
        super(userinfo);
    }
}
