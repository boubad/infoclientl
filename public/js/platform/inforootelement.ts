//inforootelement.ts
//
import * as evtagg from 'aurelia-event-aggregator';
import * as userinf from './infouserinfo';
//
import {UserInfoElement} from '../data/model/userinfoelement';
import {InfoMessageManager} from './infomessagemanager';
import {InfoLogger} from './infologger';
import {IMessageManager, ILogManager} from 'infodata';
//
export class InfoRootElement extends UserInfoElement {
    private _message_man: IMessageManager;
    private _log_man: ILogManager;
    //
    constructor(eventAggregator: evtagg.EventAggregator, userinfo: userinf.InfoUserInfo) {
        super(userinfo);
        this._message_man = new InfoMessageManager(eventAggregator);
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
