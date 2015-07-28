//synchro.ts
import {SynchroModel} from '../../data/model/synchromodel';
import {autoinject} from 'aurelia-framework';
import * as mx from '../infomessagemanager';
//
@autoinject
export class Synchro extends SynchroModel {
    constructor(evt:mx.InfoMessageManager) {
        super(evt);
    }
}
