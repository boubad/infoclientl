import {NoteListModel} from '../../../data/model/noteslistmodel';
import * as userinf from '../../aureliainfouser';
import {autoinject} from 'aurelia-framework';
//
@autoinject
export class NoteList extends NoteListModel {
    constructor(userinfo: userinf.AureliaInfoUser) {
        super(userinfo);
    }
}
