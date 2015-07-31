//nav-bar.ts
import {bindable} from 'aurelia-framework';
import * as au from 'aurelia-router';
import {App} from '../views/app';
import {UserInfo} from '../../data/model/userinfo';
//
export class NavBar {
    @bindable router: au.Router = null;
    private _parent: App;
    constructor() {
    }
    public bind(s: App) {
        this._parent = s;
    }
    protected get parent(): App {
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
        if (this.parent !== null) {
            this.parent.logout();
        }
    }
}
