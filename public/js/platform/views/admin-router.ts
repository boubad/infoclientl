import {autoinject} from 'aurelia-framework';
import * as aurouter from 'aurelia-router';
import * as userinf from '../aureliainfouser';
//
const DEPARTEMENTS: string = './admin/departements';
const GROUPES: string = './admin/groupes';
const UNITES: string = './admin/unites';
const ANNEES: string = './admin/annees';
const SEMESTRES: string = './admin/semestres';
const MATIERES: string = './admin/matieres';
const OPERATORS: string = './admin/administrators';
const ENSEIGNANTS: string = './admin/enseignants';
const ETUDIANTS: string = './admin/etudiants';
const AFFPROFS: string = './admin/profaffectations';
const AFFETUDS: string = './admin/etudaffectations';
//
@autoinject
export class AdminRouter {
    public router: aurouter.Router = null;
    public heading: string = 'Admin';
    private userInfo: userinf.AureliaInfoUser = null;
    //
    constructor(userinfo: userinf.AureliaInfoUser) {
        this.userInfo = userinfo;
    }
    configureRouter(config, router: aurouter.Router) {
        config.map([
            { route: ['', 'welcome'], name: 'welcome', moduleId: './home', nav: true, title: 'Accueil' },
            { route: 'affetuds', name: 'affetuds', moduleId: AFFETUDS, nav: true, title: 'Affectations étudiants' },
            { route: 'affprofs', name: 'affprofs', moduleId: AFFPROFS, nav: true, title: 'Affectations enseignants' },
            { route: 'etudiants', name: 'etudiants', moduleId: ETUDIANTS, nav: true, title: 'Etudiants' },
            { route: 'profs', name: 'profs', moduleId: ENSEIGNANTS, nav: true, title: 'Enseignants' },
            { route: 'semestres', name: 'semestres', moduleId: SEMESTRES, nav: true, title: 'Semestres' },
            { route: 'annees', name: 'annees', moduleId: ANNEES, nav: true, title: 'Années' },
            { route: 'groupes', name: 'groupes', moduleId: GROUPES, nav: true, title: 'Groupes' },
            { route: 'matieres', name: 'matieres', moduleId: MATIERES, nav: true, title: 'Matières' },
            { route: 'unites', name: 'unites', moduleId: UNITES, nav: true, title: 'Unités' },
            { route: 'opers', name: 'opers', moduleId: OPERATORS, nav: true, title: 'Opérators' },
            { route: 'departements', name: 'departements', moduleId: DEPARTEMENTS, nav: true, title: 'Départements' }
        ]);
        this.router = router;
    }
    public canActivate(params?: any, config?: any, instruction?: any): any {
        return (this.userInfo !== undefined) && (this.userInfo !== null) &&
            this.userInfo.is_connected && (!this.userInfo.is_etud);
    }// activate
}
