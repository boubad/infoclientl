//userinfo.ts
import {RootElement} from './rootelement';
//
import {Person} from '../domain/person';
import {LoginInfo} from './logininfo';
import {EtudiantPerson} from '../domain/etudperson';
import {IPerson, IDepartement, IAnnee, ISemestre, IUnite, IMatiere, IGroupe,
IMessageManager, ILogManager, IItemFactory,
IObjectStore, ILoginInfo, IInfoMessage, IEnseignant, IDatabaseManager} from 'infodata';
import {DATABASE_NAME, PERSON_KEY, ETUDIANTPERSON_KEY, ENSEIGNANTPERSON_KEY,
DEPARTEMENT_TYPE, ANNEE_TYPE, SEMESTRE_TYPE, UNITE_TYPE, MATIERE_TYPE, GROUPE_TYPE}
from '../utils/infoconstants';
import {DatabaseManager} from '../services/pouchdb/databasemanager';
import {InfoMessage} from '../utils/infomessage';
//
export class UserInfo extends RootElement {
    public loginInfo: LoginInfo = null;
    public annees: IAnnee[] = [];
    public semestres: ISemestre[] = [];
    public unites: IUnite[] = [];
    public matieres: IMatiere[] = [];
    public groupes: IGroupe[] = [];
    //
    private _departement: IDepartement = null;
    private _annee: IAnnee = null;
    private _unite: IUnite = null;
    private _semestre: ISemestre = null;
    private _matiere: IMatiere = null;
    private _groupe: IGroupe = null;
    //
    private _enseignantid: string = null;
    private _m_busy: boolean = false;
    //
    constructor() {
        super();
        this.loginInfo = new LoginInfo();
        this._m_busy = false;
    }// constructor
    //
    public get itemFactory(): IItemFactory {
        return this.dataService.itemFactory;
    }
    //
    private notify_change(message: string): void {
        if ((!this._m_busy) && (!this.is_in_message)) {
            this._m_busy = true;
            this.publish_string_message(message);
            this._m_busy = false;
        }
    }
    //
    public get departements(): IDepartement[] {
        return this.loginInfo.departements;
    }
    //
    public get semestre(): ISemestre {
        return (this._semestre !== undefined) ? this._semestre : null;
    }
    public set semestre(s: ISemestre) {
        let old = (this._semestre !== undefined) ? this._semestre : null;
        let cur = (s !== undefined) ? s : null;
        if (cur !== old) {
            this._semestre = cur;
            this.notify_change(SEMESTRE_TYPE);
        }
    }
    public get groupe(): IGroupe {
        return (this._groupe !== undefined) ? this._groupe : null;
    }
    public set groupe(s: IGroupe) {
        let old = (this._groupe !== undefined) ? this._groupe : null;
        let cur = (s !== undefined) ? s : null;
        if (cur !== old) {
            this._groupe = cur;
            this.notify_change(GROUPE_TYPE);
        }
    }
    //
    public get matiere(): IMatiere {
        return (this._matiere !== undefined) ? this._matiere : null;
    }
    public set matiere(s: IMatiere) {
        let old = (this._matiere !== undefined) ? this._matiere : null;
        let cur = (s !== undefined) ? s : null;
        if (cur !== old) {
            this._matiere = cur;
            this.notify_change(MATIERE_TYPE);
        }
    }
    public get annee(): IAnnee {
        return (this._annee !== undefined) ? this._annee : null;
    }
    public set annee(s: IAnnee) {
        let old = (this._annee !== undefined) ? this._annee : null;
        let cur = (s !== undefined) ? s : null;
        if (cur !== old) {
            this._annee = cur;
            let self = this;
            this.post_update_annee().then((r) => {
                self.notify_change(ANNEE_TYPE);
                if (self.semestres.length > 0) {
                    self.semestre = self.semestres[0];
                } else {
                    self.semestre = null;
                }
            });
        }
    }
    public get unite(): IUnite {
        return this._unite;
    }
    public set unite(s: IUnite) {
        let old = (this._unite !== undefined) ? this._unite : null;
        let cur = (s !== undefined) ? s : null;
        if (cur !== old) {
            this._unite = cur;
            let self = this;
            this.post_update_unite().then((r) => {
                self.notify_change(UNITE_TYPE);
                if (self.matieres.length > 0) {
                    self.matiere = self.matieres[0];
                } else {
                    self.matiere = null;
                }
            });
        }
    }
    //
    public get departement(): IDepartement {
        return (this._departement !== undefined) ? this._departement : null;
    }
    public set departement(s: IDepartement) {
        let old = (this._departement !== undefined) ? this._departement : null;
        let cur = (s !== undefined) ? s : null;
        if (cur !== old) {
            this._departement = cur;
            let self = this;
            this.post_update_departement().then((r) => {
                self.notify_change(DEPARTEMENT_TYPE);
                if (self.annees.length > 0) {
                    self.annee = self.annees[0];
                } else {
                    self.annee = null;
                }
                if (self.unites.length > 0) {
                    self.unite = self.unites[0];
                } else {
                    self.unite = null;
                }
                if (self.groupes.length > 0) {
                    self.groupe = self.groupes[0];
                } else {
                    self.groupe = null;
                }
            });
        }
    }
    //
    public get enseignantid(): string {
        return (this._enseignantid !== undefined) ? this._enseignantid : null;
    }
    public get departementid(): string {
        return (this.departement !== null) ? this.departement.id : null;
    }
    public get anneeid(): string {
        return (this.annee !== null) ? this.annee.id : null;
    }
    public get uniteid(): string {
        return (this.unite !== null) ? this.unite.id : null;
    }
    public get semestreid(): string {
        return (this.semestre !== null) ? this.semestre.id : null;
    }
    public get matiereid(): string {
        return (this.matiere !== null) ? this.matiere.id : null;
    }
    public get groupeid(): string {
        return (this.groupe !== null) ? this.groupe.id : null;
    }
    public get person(): IPerson {
        return this.loginInfo.person;
    }// get person
    public get photoUrl(): string {
        return ((this.person !== undefined) && (this.person !== null)) ? this.person.url : null;
    }
    public get hasPhotoUrl(): boolean {
        return (this.photoUrl !== null);
    }
    public login(username: string, spass: string): Promise<boolean> {
        this.clear_data();
        let bRet: boolean = false;
        let self = this;
        return this.loginInfo.login(username, spass, this.dataService).then((b) => {
            bRet = b;
            if (b) {
                return self.post_login();
            }
            return b;
        }).then((x) => {
            return bRet;
        })
    }// login
    public logout(): void {
        this.clear_data();
    }// logout
	public re_login():Promise<any> {
		return this.loginInfo.re_login(this.dataService);
	}
    private post_login(): Promise<any> {
        if (this.loginInfo.departements.length > 0) {
            this.departement = this.loginInfo.departements[0];
        }
        let self = this;
        return this.check_prof_id().then((x) => {
            let pPers = self.person;
            if ((pPers !== null) && (pPers.id !== null) && (pPers.avatarid !== null) &&
                (pPers.url === null)) {
                return self.retrieve_one_avatar(pPers);
            } else {
                return pPers;
            }
        });
    }// change_person
    public get is_super(): boolean {
        return (this.person !== null) ? this.person.is_super : false;
    }
    public get is_admin(): boolean {
        return (this.person !== null) ? this.person.is_admin : false;
    }
    public get is_prof(): boolean {
        return (this.person !== null) ? this.person.is_prof : false;
    }
    public get is_etud(): boolean {
        return (this.person !== null) ? this.person.is_etud : false;
    }
    public get url(): string {
        return (this.person !== null) ? this.person.url : null;
    }
    public get has_url(): boolean {
        return (this.url !== null);
    }
    public get personid(): string {
        return (this.person !== null) ? this.person.id : null;
    }
    public get fullname(): string {
        return (this.person !== null) ? this.person.fullname : null;
    }
    public get is_connected(): boolean {
        return (this.personid !== null);
    }
    public get is_notconnected(): boolean {
        return (!this.is_connected);
    }
    //
    private clear_data(): void {
        if ((this.person !== undefined) && (this.person !== null) && (this.person.url !== null)) {
            this.revokeUrl(this.person.url);
        }
        this.loginInfo.clear();
        this.annees = [];
        this.semestres = [];
        this.unites = [];
        this.matieres = [];
        this.groupes = [];
        this._enseignantid = null;
    }// clear_data
    private check_prof_id(): Promise<any> {
        this._enseignantid = null;
        let depid: string = this.departementid;
        let persid: string = null;
        let oAr: string[] = null;
        let pPers = this.person;
        if ((pPers !== null) && (pPers.is_prof) && (pPers.enseignantids !== undefined) &&
            (pPers.enseignantids !== null) && (pPers.enseignantids.length > 0)) {
            oAr = pPers.enseignantids;
            persid = pPers.id;
        }
        if (!pPers.is_prof) {
            return Promise.resolve(true);
        }
        if ((depid === null) || (persid === null) || (oAr === null)) {
            return Promise.resolve(true);
        }
        let self = this;
        return this.dataService.dm_find_items_array(oAr).then((pp: IEnseignant[]) => {
            if ((pp !== undefined) && (pp !== null) && (pp.length > 0)) {
                for (let p of pp) {
                    if ((p !== undefined) && (p !== null)) {
                        if ((p.personid !== undefined) && (p.departementid !== undefined) &&
                            (p.id !== undefined) && (p.id !== null)) {
                            if ((p.personid == persid) && (p.departementid !== depid)) {
                                self._enseignantid = p.id;
                                break;
                            }
                        }
                    }// p
                }//p
            }
            return true;
        });
    }
    private post_update_departement(): Promise<any> {
        //
        let xannees: IAnnee[] = [];
        let xunites: IUnite[] = [];
        let xgroupes: IGroupe[] = [];
        //
        let depid = this.departementid;
        if (depid === null) {
            this.annees = xannees;
            this.unites = xunites;
            this.groupes = xgroupes;
            return Promise.resolve(true);
        }
        let pPers: IPerson = this.person;
        if (pPers === null) {
            this.annees = xannees;
            this.unites = xunites;
            this.groupes = xgroupes;
            return Promise.resolve(true);
        }
        let self = this;
        if (pPers.is_admin) {
            let service = this.dataService;
            return service.dm_get_departement_annees(depid).then((dd) => {
                xannees = self.check_array(dd);
                return service.dm_get_departement_groupes(depid);
            }).then((gg) => {
                xgroupes = self.check_array(gg);
                return service.dm_get_departement_unites(depid);
            }).then((uu) => {
                xunites = self.check_array(uu);
                return true;
            }).then((ss) => {
                self.annees = xannees;
                self.unites = xunites;
                self.groupes = xgroupes;
                return true;
            });
        } else {
            if (this.loginInfo.annees !== null) {
                for (let x of this.loginInfo.annees) {
                    if (x.departementid == depid) {
                        xannees.push(x);
                    }
                }//x
            }
            if (this.loginInfo.unites !== null) {
                for (let x of this.loginInfo.unites) {
                    if (x.departementid == depid) {
                        xunites.push(x);
                    }
                }//x
            }
            if (this.loginInfo.groupes !== null) {
                for (let x of this.loginInfo.groupes) {
                    if (x.departementid == depid) {
                        xgroupes.push(x);
                    }
                }//x
            }
            this.unites = xunites;
            this.annees = xannees;
            this.groupes = xgroupes;
            return this.check_prof_id();
        }
    }// post_update_departement
    private post_update_annee(): Promise<any> {
        let xsemestres: ISemestre[] = [];
        let anneeid = this.anneeid;
        if (anneeid === null) {
            this.semestres = xsemestres;
            return Promise.resolve(true);
        }
        let pPers: IPerson = this.person;
        if (pPers === null) {
            this.semestres = xsemestres;
            return Promise.resolve(true);
        }
        let self = this;
        if (pPers.is_admin) {
            return this.dataService.dm_get_annee_semestres(anneeid).then((dd) => {
                self.semestres = self.check_array(dd);
                return true;
            });
        } else if (this.loginInfo.semestres !== null) {
            for (let x of this.loginInfo.semestres) {
                if (x.anneeid == anneeid) {
                    xsemestres.push(x);
                }
            }//x
            this.semestres = xsemestres;
            return Promise.resolve(true);
        }
    }// post_change_annee
    private post_update_unite(): Promise<any> {
        let xmatieres: IMatiere[] = [];
        let uniteid = this.uniteid;
        if (uniteid === null) {
            this.matieres = xmatieres;
            return Promise.resolve(true);
        }
        let pPers: IPerson = this.person;
        if (pPers === null) {
            this.matieres = xmatieres;
            return Promise.resolve(true);
        }
        let self = this;
        if (pPers.is_admin) {
            return this.dataService.dm_get_unite_matieres(uniteid).then((dd) => {
                self.matieres = self.check_array(dd);
                return true;
            });
        } else if (this.loginInfo.matieres !== null) {
            for (let x of this.loginInfo.matieres) {
                if (x.uniteid == uniteid) {
                    xmatieres.push(x);
                }
            }//x
            self.matieres = xmatieres;
            return Promise.resolve(true);
        }
    }// post_change_unite
}// class UserInfo
