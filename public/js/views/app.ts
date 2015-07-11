//
import * as aurouter from 'aurelia-router';
import {autoinject} from 'aurelia-framework';
import {InfoBaseView} from '../platform/infobaseview';
import * as userinf from '../platform/infouserinfo';
import * as evtagg from 'aurelia-event-aggregator';
import {HOME_ROUTE} from '../data/infoconstants';
//
const HOME: string = './home';
const PROFIL:string = './profil';
//
@autoinject
export class App extends InfoBaseView {
    public router: aurouter.Router;
    constructor(eventAggregator: evtagg.EventAggregator, userinfo: userinf.InfoUserInfo) {
        super(eventAggregator, userinfo);
    }
    configureRouter(config, router: aurouter.Router) {
        config.title = 'InfoApp';
        config.map([
            { route: ['', 'home'], moduleId: HOME, nav: true, title: 'Accueil' },
            { route: 'profil', moduleId: PROFIL, nav: true, title: 'Profil' }
        ]);
        this.router = router;
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
            this.router.navigate(xroute, {});
        }
        return Promise.resolve(true);
    }
}
