import {GroupeEventDetailModel} from '../../../data/model/groupeeventdetailmodel';
import * as userinf from '../../aureliainfouser';
import {autoinject} from 'aurelia-framework';
//
@autoinject
export class Groupeeventdetail extends GroupeEventDetailModel {
    constructor(userinfo: userinf.AureliaInfoUser) {
        super(userinfo);
    }
}
