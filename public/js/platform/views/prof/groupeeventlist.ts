import {GroupeEventListModel} from '../../../data/model/groupeeventslistmodel';
import * as userinf from '../../aureliainfouser';
import {autoinject} from 'aurelia-framework';
//
@autoinject
export class Groupeeventlist extends GroupeEventListModel {
    constructor(userinfo: userinf.AureliaInfoUser) {
        super(userinfo);
    }
}
