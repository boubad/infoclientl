//import 'bootstrap';
//import 'bootstrap/css/bootstrap.css!';
import {autoinject} from 'aurelia-framework';
import * as aurouter from 'aurelia-router';
import * as evtagg from 'aurelia-event-aggregator';
import {IInfoMessage} from 'infodata';
import {InfoMessage} from '../../data/utils/infomessage';
import * as userinf from '../aureliainfouser';
import {HOME_ROUTE, ADMIN_ROUTE, PROF_ROUTE, INFO_MESSAGE_CHANNEL, SYNC_COMPLETED,
SYNC_PAUSED, MESSAGE_LOGOUT, MESSAGE_NAVIGATE, MESSAGE_LOGIN,
ETUDDETAIL_ROUTE,GRPEVTDETAIL_ROUTE,ETUDEVTDETAIL_ROUTE,ETUDNOTES_ROUTE} from '../../data/utils/infoconstants';
//
@autoinject
export class App {
    public router: aurouter.Router = null;
    public eventAggregator: evtagg.EventAggregator = null;
    private _info: userinf.AureliaInfoUser = null;
    private _inMessage: boolean;
    //
    constructor(evt: evtagg.EventAggregator, userinfo: userinf.AureliaInfoUser) {
        this.eventAggregator = evt;
        this._info = userinfo;
        this._inMessage = false;
    }
    //
    configureRouter(config, router: aurouter.Router) {
        config.title = 'InfoApp';
        config.map([
            { route: ['', 'welcome'], name: 'welcome', moduleId: './home', nav: true, title: 'Accueil' },
            { route: 'profil', name: 'profil', moduleId: './profil', nav: true, title: 'Profil' },
            { route: 'prof-router', name: 'prof-router', moduleId: './prof-router', nav: true, title: 'Consultation' },
            { route: 'admin-router', name: 'admin-router', moduleId: './admin-router', nav: true, title: 'Etablissement' },
            { route: 'synchro', name: 'synchro', moduleId: './synchro', nav: true, title: 'Admin' },
            { route: 'etud/:id', name: ETUDDETAIL_ROUTE, moduleId: './prof/etudiantdetail', nav: false },
            { route: 'grpevt/:id', name:GRPEVTDETAIL_ROUTE, moduleId: './prof/groupeeventdetail', nav: false },
            { route: 'etudevt/:id', name: ETUDEVTDETAIL_ROUTE, moduleId: './prof/etudeventdetail', nav: false },
            { route: 'etudnotes/:id', name: ETUDNOTES_ROUTE, moduleId: './prof/etudiant-notes', nav: false }
        ]);
        this.router = router;
        this.perform_subscribe();
    }
    protected perform_subscribe(): any {
        let self = this;
        if ((this.eventAggregator !== undefined) && (this.eventAggregator !== null)) {
            this.eventAggregator.subscribe(INFO_MESSAGE_CHANNEL, (msg: IInfoMessage) => {
                if ((msg.source !== undefined) && (msg.source !== self)) {
                    if (!self._inMessage) {
                        self._inMessage = true;
                        try {
                            self.message_received(msg).then((x) => {
                                self._inMessage = false;
                            });
                        } catch (e) {
                            self._inMessage = false;
                        }
                    }
                }
            });
        }
    }// perform_subscribe
    protected message_received(message: IInfoMessage): Promise<any> {
        if (message.type == MESSAGE_LOGIN) {
            return this.perform_login();
        } else if (message.type == MESSAGE_LOGOUT) {
            return this.perform_logout();
        } else if (message.type == MESSAGE_NAVIGATE) {
            let s = message.categ;
            if ((s !== undefined) && (s !== null)) {
                return this.perform_navigate(s);
            }
        } else if ((message.type == SYNC_PAUSED) || (message.type == SYNC_COMPLETED)) {
            return this.perform_sync();
        }
        return Promise.resolve(true);
    }// message_received
    protected perform_sync(): Promise<any> {
        if (this.userInfo !== null) {
            return this.userInfo.re_login();
        } else {
            return Promise.resolve(true);
        }
    }
    protected perform_login(): Promise<any> {
        let id = (this.userInfo !== null) ? this.userInfo.personid : null;
        if (id === null) {
            return Promise.resolve(false);
        }
        if ((this.router !== undefined) && (this.router !== null)) {
            this.router.navigateToRoute(ETUDDETAIL_ROUTE, { id });
        }
        return Promise.resolve(true);
    }
    protected perform_logout(): Promise<any> {
        if ((this.router !== undefined) && (this.router !== null)) {
            this.router.navigate(HOME_ROUTE, {});
        }
        return Promise.resolve(true);
    }
    protected perform_navigate(xroute: string): Promise<any> {
        if ((this.router !== undefined) && (this.router !== null) &&
            (xroute !== undefined) && (xroute !== null)) {
            //this.router.navigate(xroute, {});
            this.router.navigateToRoute(xroute, {});
        }
        return Promise.resolve(true);
    }
    public get userInfo(): userinf.AureliaInfoUser {
        return (this._info !== undefined) ? this._info : null;
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
            let msg = new InfoMessage({ type: MESSAGE_LOGOUT, categ: MESSAGE_LOGOUT, value: MESSAGE_LOGOUT });
            this.userInfo.publish_message(msg);
        }
    }
}
