import {GroupeEventModel} from '../../../data/model/groupeeventmodel';
import * as userinf from '../../aureliainfouser';
import {autoinject} from 'aurelia-framework';
//
@autoinject
export class Groupeevents extends GroupeEventModel {
    constructor(userinfo: userinf.AureliaInfoUser) {
        super(userinfo);
    }
}
