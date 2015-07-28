//not-implemented.ts
import {autoinject} from 'aurelia-framework';
import {NotImplementedModel} from '../../data/model/notimplementedmodel';
import * as userinf from '../aureliainfouser';
//
@autoinject
export class NotImplemented extends NotImplementedModel {
    constructor(userinfo: userinf.AureliaInfoUser) {
        super(userinfo);
    }
}// NotImplemented
