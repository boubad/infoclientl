//user-bar.ts
//
import {InfoBaseView} from '../../data/model/infobaseview';
import {UserInfo} from '../../data/model/userinfo';
import {MESSAGE_LOGIN, MESSAGE_LOGOUT, ADMIN_ROUTE, PROF_ROUTE} from '../../data/utils/infoconstants';
import {IPerson} from 'infodata';
import {InfoMessage} from '../../data/utils/infomessage';
//
export class UserBar {
    //
    private _parent: InfoBaseView;
    //
    constructor() {
    }
	public bind(s: InfoBaseView) {
        this._parent = s;
    }
    protected get parent(): InfoBaseView {
        return (this._parent !== undefined) ? this._parent : null;
    }
    public get userInfo(): UserInfo {
        return (this.parent !== null) ? this.parent.userInfo : null;
    }
    public get is_connected(): boolean {
        return (this.userInfo !== null) ? this.userInfo.is_connected : false;
    }
    public get fullname(): string {
        return (this.userInfo !== null) ? this.userInfo.fullname : null;
    }
    public get url(): string {
        return (this.userInfo !== null) ? this.userInfo.photoUrl : null;
    }
    public get has_url(): boolean {
        return (this.url !== null);
    }
    public logout(): void {
        if (this.userInfo !== null) {
            this.userInfo.logout();
            let msg = new InfoMessage({type:MESSAGE_LOGOUT,categ:MESSAGE_LOGOUT,value:MESSAGE_LOGOUT});
            this.userInfo.publish_message(msg);
        }
    }
}// class UserBar
