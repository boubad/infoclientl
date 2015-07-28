//infouserinfo.ts
//
import {UserInfo} from './userinfo';
import {IMessageManager, ILogManager} from 'infodata';
//
export class InfoUserInfo extends UserInfo {
    private _message_man: IMessageManager;
    private _log_man: ILogManager;
    //
    constructor(mess: IMessageManager, log: ILogManager) {
        super();
        this._message_man = mess;
        this._log_man = log;
        this.perform_subscribe();
    }
    protected get_messagemanager(): IMessageManager {
        return (this._message_man !== undefined) ? this._message_man : null;
    }
    protected get_logger(): ILogManager {
        return (this._log_man !== undefined) ? this._log_man : null;
    }
}// class InfoUserInfo
