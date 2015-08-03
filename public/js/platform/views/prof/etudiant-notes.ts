import {EtudiantNotesModel} from '../../../data/model/etudiantnotesmodel';
import * as userinf from '../../aureliainfouser';
import {autoinject} from 'aurelia-framework';
//
@autoinject
export class EtudiantNotes extends EtudiantNotesModel {
    constructor(userinfo: userinf.AureliaInfoUser) {
        super(userinfo);
    }
}
