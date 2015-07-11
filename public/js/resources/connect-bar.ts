//connect-bar.ts
//
import {bindable} from 'aurelia-framework';
import * as userinf from '../platform/infouserinfo';
import {MESSAGE_LOGIN, MESSAGE_LOGOUT, ADMIN_ROUTE, PROF_ROUTE} from '../data/infoconstants';
import {IPerson} from 'infodata';
import {InfoMessage} from '../data/infomessage';
//
export class ConnectBar {
    //
    @bindable info: userinf.InfoUserInfo;
    public username: string = null;
    public password: string = null;
    private _baseUrl: string = null;
    //
    constructor() {
    }
    public get userInfo(): userinf.InfoUserInfo {
        return (this.info !== undefined) ? this.info : null;
    }
    public bind(s: any) {
        let origin = window.location.origin;
        let pathname = window.location.pathname;
        this._baseUrl = origin + pathname.toLowerCase().replace("index.html", "");
    }
    public get imageUrl(): string {
        return (this._baseUrl !== null) ? this._baseUrl + 'images/login.jpg' : '../images/login.jpg';
    }
    public get is_connected(): boolean {
        return (this.userInfo !== null) ? this.userInfo.is_connected : false;
    }
    public get is_notconnected(): boolean {
        return (!this.is_connected);
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
    public get canConnect(): boolean {
        return (this.userInfo !== null) && (this.username !== null) && (this.password !== null) &&
            (this.username.trim().length > 0) && (this.password.trim().length > 0);
    }
    public get cannotConnect(): boolean {
        return (!this.canConnect);
    }
    public login(): any {
        if (!this.canConnect) {
            return false;
        }
        let self = this;
        return this.userInfo.login(this.username, this.password).then((bRet) => {
            let pPers = self.userInfo.person;
            if ((pPers !== null) && (pPers.id !== null)) {
                if (pPers.is_admin) {
                    self.userInfo.publish_navigation_message(ADMIN_ROUTE);
                } else {
                    self.userInfo.publish_navigation_message(PROF_ROUTE);
                }
            }
            return true;
        });
    }// login
    public logout(): void {
        if (this.userInfo !== null) {
            this.username = null;
            this.password = null;
            this.userInfo.logout();
            let msg = new InfoMessage();
            msg.type = MESSAGE_LOGOUT;
            msg.value = this.info.person;
            this.userInfo.publish_message(msg);
        }
    }
}// class ConnectBar
