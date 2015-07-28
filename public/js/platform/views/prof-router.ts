import {autoinject} from 'aurelia-framework';
import * as aurouter from 'aurelia-router';
import * as userinf from '../aureliainfouser';
//
const NOT_IMPLEMENTED: string = './not-implemented'
//
const GROUPEEVENTS_EDIT:string =  './prof/groupeevents';
const GROUPEEVENTS_LIST:string =  './prof/groupeeventlist';
const NOTES_LIST:string =  './prof/noteslist';
//
@autoinject
export class ProfRouter {
    public router: aurouter.Router = null;
    public heading: string = 'Consultation';
    private userInfo: userinf.AureliaInfoUser = null;
    //
    constructor(userinfo: userinf.AureliaInfoUser) {
        this.userInfo = userinfo;
    }
    configureRouter(config, router: aurouter.Router) {
        config.map([
            { route: ['', 'welcome'], name: 'welcome', moduleId: './home', nav: true, title: 'Accueil' },
            { route: 'evts-sum', name: 'evts-sum', moduleId: NOT_IMPLEMENTED, nav: true, title: 'Evts semestre' },
            { route: 'notes-sum', name: 'notes-sum', moduleId:NOTES_LIST, nav: true, title: 'Notes semestre' },
            { route: 'groupeevents-views', name: 'groupeevents-views', moduleId: GROUPEEVENTS_LIST, nav: true, title: 'Liste devoirs' },
            { route: 'groupeevents', name: 'groupeevents', moduleId: GROUPEEVENTS_EDIT, nav: true, title: 'Edition devoirs' }
        ]);
        this.router = router;
    }
    public canActivate(params?: any, config?: any, instruction?: any): any {
        return (this.userInfo !== undefined) && (this.userInfo !== null) &&
            this.userInfo.is_connected;
    }// activate
}
