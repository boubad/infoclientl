import {EtudEventReportModel} from '../../../data/model/etudeventreportmodel';
import {AureliaInfoUser} from '../../aureliainfouser';
import {autoinject} from 'aurelia-framework';
//
@autoinject
export class SemestreEvents extends EtudEventReportModel {
    constructor(userinfo: AureliaInfoUser) {
        super(userinfo);
    }
}
