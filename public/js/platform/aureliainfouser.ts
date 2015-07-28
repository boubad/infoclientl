//aureliainfouser.ts
//
import {autoinject} from 'aurelia-framework';
import * as evtagg from 'aurelia-event-aggregator';
import * as xlog from './infologger';
import {InfoUserInfo} from '../data/model/infouserinfo';
import * as mx from './infomessagemanager';
import {IMessageManager,ILogManager} from 'infodata';
import {InfoMessageManager} from './infomessagemanager';
import {InfoLogger} from './infologger';
//
export class AureliaInfoUser extends InfoUserInfo {
  //
    private _eventAggregator:evtagg.EventAggregator;
    private _ulogger:ILogManager;
    private _mess:IMessageManager;
    //
    public static inject():any {return [evtagg.EventAggregator];}
    //
    constructor(evt:evtagg.EventAggregator) {
        let ulogger = new InfoLogger();
        let umess = new InfoMessageManager(evt);
        super(umess, ulogger);
        this._mess = umess;
        this._ulogger = ulogger;
    }
    protected get_messagemanager(): IMessageManager {
        return (this._mess !== undefined) ? this._mess : null;
    }
    protected get_logger(): ILogManager {
        return (this._ulogger !== undefined) ? this._ulogger : null;
    }
}// class AureliaInfoUser
