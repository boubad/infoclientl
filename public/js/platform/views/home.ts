//
import {HomeModel} from '../../data/model/homemodel';
import {AureliaInfoUser} from '../aureliainfouser';
//
export class Home extends HomeModel {
    public static inject(): any { return [AureliaInfoUser];}
    constructor(userinfo: AureliaInfoUser) {
        super(userinfo);
    }
}// AureliaHom
