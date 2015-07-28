import {AdministratorModel} from '../../../data/model/administratormodel';
import * as userinf from '../../aureliainfouser';
import {autoinject} from 'aurelia-framework';
//
@autoinject
export class Administrators extends AdministratorModel {
    constructor(userinfo: userinf.AureliaInfoUser) {
        super(userinfo);
    }
}
