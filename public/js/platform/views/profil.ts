//
import {autoinject} from 'aurelia-framework';
import {ProfilModel} from '../../data/model/profilmodel';
import * as userinf from '../aureliainfouser';
//
@autoinject
export class Profil extends ProfilModel {
    constructor(userinfo: userinf.AureliaInfoUser) {
        super(userinfo);
    }
    public canActivate(params?: any, config?: any, instruction?: any): any {
        return true;
    }// activate
}// AureliaHom
