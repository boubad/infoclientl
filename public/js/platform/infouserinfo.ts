//intrauserinfo.ts
//
import {autoinject} from 'aurelia-framework';
import * as evtagg from 'aurelia-event-aggregator';
//
import {UserInfo} from '../data/model/userinfo';
import {InfoMessageManager} from './infomessagemanager';
import {InfoLogger} from './infologger';
import {IMessageManager, ILogManager} from 'infodata';
//
@autoinject
export class InfoUserInfo extends UserInfo {
    private _message_man: IMessageManager;
    private _log_man: ILogManager;
    //
    constructor(eventAggregator: evtagg.EventAggregator) {
        super();
        this._message_man = new InfoMessageManager(eventAggregator);
        this.perform_subscribe();
    }
    protected get_messagemanager(): IMessageManager {
        return (this._message_man !== undefined) ? this._message_man : null;
    }
    protected get_logger(): ILogManager {
        if ((this._log_man === undefined) || (this._log_man === null)) {
            this._log_man = new InfoLogger(this.get_logger_name());
        }
        return (this._log_man !== undefined) ? this._log_man : null;
    }
}// class InfoUserInfo
