//inforootelement.ts
//
import {UserInfoElement} from './userinfoelement';
import {InfoUserInfo} from './infouserinfo';
import {IMessageManager, ILogManager} from 'infodata';
//
export class InfoRootElement extends UserInfoElement {
    private _message_man: IMessageManager;
    private _log_man: ILogManager;
    //
    constructor(userinfo: InfoUserInfo) {
        super(userinfo);
              if ((userinfo !== undefined) && (userinfo !== null)) {
                     this._message_man = userinfo.messageManager;
                     this._log_man = userinfo.logger;
              }
    }
    protected get_messagemanager(): IMessageManager {
        return (this._message_man !== undefined) ? this._message_man : null;
    }
    protected get_logger(): ILogManager {
        return (this._log_man !== undefined) ? this._log_man : null;
    }
}// class InfoUserInfo
