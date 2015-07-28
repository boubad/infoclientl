//departements.ts
//
import {autoinject} from 'aurelia-framework';
import {DepartementModel} from '../../../data/model/departementmodel';
import * as userinf from '../../aureliainfouser';
//
@autoinject
export class Departements extends DepartementModel {
    constructor(userinfo: userinf.AureliaInfoUser) {
        super(userinfo);
    }
}
