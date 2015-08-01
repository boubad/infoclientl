//synchro.ts
import {SynchroModel} from '../../data/model/synchromodel';
import {autoinject} from 'aurelia-framework';
import * as mx from '../infomessagemanager';
import * as userinf from '../aureliainfouser';
//
@autoinject
export class Synchro extends SynchroModel {
	private userInfo: userinf.AureliaInfoUser;
    constructor(evt: mx.InfoMessageManager, userinfo: userinf.AureliaInfoUser) {
        super(evt);
		this.userInfo = userinfo;
    }
	public canActivate(params?: any, config?: any, instruction?: any): any {
        return (this.userInfo !== undefined) && (this.userInfo !== null) &&
            this.userInfo.is_connected &&  this.userInfo.is_super;
    }// activate
}
