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
        this._semestre = (s !== undefined) ? s : null;
        this.notify_change(SEMESTRE_TYPE);
    }
    public get groupe(): IGroupe {
        return (this._groupe !== undefined) ? this._groupe : null;
    }
    public set groupe(s: IGroupe) {
        this._groupe = (s !== undefined) ? s : null;
        this.notify_change(GROUPE_TYPE);
    }
    //
    public get matiere(): IMatiere {
        return (this._matiere !== undefined) ? this._matiere : null;
    }
    public set matiere(s: IMatiere) {
        this._matiere = (s !== undefined) ? s : null;
        this.notify_change(MATIERE_TYPE);
    }
    //
    public get departement(): IDepartement {
        return (this._departement !== undefined) ? this._departement : null;
    }
    public set departement(s: IDepartement) {
        this._departement = (s !== undefined) ? s : null;
        let self = this;
        this._annee = null;
        this._groupe = null;
        this._unite = null;
        this._matiere = null;
        this._semestre = null;
        this.post_update_departement().then((r) => {
            self.notify_change(DEPARTEMENT_TYPE);
        });
    }
    public get annee(): IAnnee {
        return (this._annee !== undefined) ? this._annee : null;
    }
    public set annee(s: IAnnee) {
        this._annee = (s !== undefined) ? s : null;
        let self = this;
        this._semestre = null;
        this.post_update_annee().then((r) => {
            self.notify_change(ANNEE_TYPE);
        });
    }
    public get unite(): IUnite {
        return this._unite;
    }
    public set unite(s: IUnite) {
        this._unite = (s !== undefined) ? s : null;
        let self = this;
        this._matiere = null;
        this.post_update_unite().then((r) => {
            self.notify_change(UNITE_TYPE);
        });
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
        let xmatieres: IMatiere[] = [];
        let xsemestres: ISemestre[] = [];
        //
        let pdep: IDepartement = null;
        let pan: IAnnee = null;
        let pun: IUnite = null;
        let pgroupe: IGroupe = null;
        let pmat: IMatiere = null;
        let psem: ISemestre = null;
        //
        let depid = this.departementid;
        if (depid === null) {
            this._departement = null;
            this._annee = null;
            this._unite = null;
            this._groupe = null;
            this._semestre = null;
            this._matiere = null;
            this.annees = xannees;
            this.unites = xunites;
            this.groupes = xgroupes;
            this.matieres = xmatieres;
            this.semestres = xsemestres;
            return Promise.resolve(true);
        }
        let pPers: IPerson = this.person;
        if (pPers === null) {
            this._departement = null;
            this._annee = null;
            this._unite = null;
            this._groupe = null;
            this._semestre = null;
            this._matiere = null;
            this.annees = xannees;
            this.unites = xunites;
            this.groupes = xgroupes;
            this.matieres = xmatieres;
            this.semestres = xsemestres;
            return Promise.resolve(true);
        }
        let self = this;
        if (pPers.is_admin) {
            let service = this.dataService;
            return service.dm_get_departement_annees(depid).then((dd) => {
                xannees = self.check_array(dd);
                if (xannees.length > 0) {
                    pan = xannees[0];
                }
                return service.dm_get_departement_groupes(depid);
            }).then((gg) => {
                xgroupes = self.check_array(gg);
                if (xgroupes.length > 0) {
                    pgroupe = xgroupes[0];
                }
                return service.dm_get_departement_unites(depid);
            }).then((uu) => {
                xunites = self.check_array(uu);
                if (xunites.length > 0) {
                    pun = xunites[0];
                }
                return service.dm_get_annee_semestres((pan !== null) ? pan.id : null);
            }).then((ss: ISemestre[]) => {
                xsemestres = self.check_array(ss);
                if (xsemestres.length > 0) {
                    psem = xsemestres[0];
                }
                return service.dm_get_unite_matieres((pun !== null) ? pun.id : null);
            }).then((mm: IMatiere[]) => {
                xmatieres = self.check_array(mm);
                if (mm.length > 0) {
                    pmat = xmatieres[0];
                }
            }).then((z) => {
                self.unites = xunites;
                self.annees = xannees;
                self.groupes = xgroupes;
                self._annee = pan;
                self._unite = pun;
                self._groupe = pgroupe;
                self.matieres = xmatieres;
                self.semestres = xsemestres;
                self._matiere = pmat;
                self._semestre = psem;
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
            if (xannees.length > 0) {
                pan = xannees[0];
            }
            if (this.loginInfo.unites !== null) {
                for (let x of this.loginInfo.unites) {
                    if (x.departementid == depid) {
                        xunites.push(x);
                    }
                }//x
            }
            if (xunites.length > 0) {
                pun = xunites[0];
            }
            if (this.loginInfo.groupes !== null) {
                for (let x of this.loginInfo.groupes) {
                    if (x.departementid == depid) {
                        xgroupes.push(x);
                    }
                }//x
            }
            if (xgroupes.length > 0) {
                pgroupe = xgroupes[0];
            }
            if ((pan !== null) && (this.loginInfo.semestres !== null)) {
                for (let x of this.loginInfo.semestres) {
                    if (x.anneeid == pan.id) {
                        xsemestres.push(x);
                    }
                }//x
            }
            if (xsemestres.length > 0) {
                psem = xsemestres[0];
            }
            if ((pun !== null) && (this.loginInfo.matieres !== null)) {
                for (let x of this.loginInfo.matieres) {
                    if (x.uniteid == pun.id) {
                        xmatieres.push(x);
                    }
                }//x
            }
            if (xmatieres.length > 0) {
                pmat = xmatieres[0];
            }
            this.unites = xunites;
            this.annees = xannees;
            this.groupes = xgroupes;
            this._annee = pan;
            this._unite = pun;
            this._groupe = pgroupe;
            this.matieres = xmatieres;
            this.semestres = xsemestres;
            this._matiere = pmat;
            this._semestre = psem;
            return this.check_prof_id();
        }
    }// post_update_departement
    private post_update_annee(): Promise<any> {
        let xsemestres: ISemestre[] = [];
        let anneeid = this.anneeid;
        if (anneeid === null) {
            this.semestres = xsemestres;
            this._semestre = null;
            return Promise.resolve(true);
        }
        let pPers: IPerson = this.person;
        if (pPers === null) {
            this.semestres = xsemestres;
            this._semestre = null;
            return Promise.resolve(true);
        }
        let self = this;
        if (pPers.is_admin) {
            return this.dataService.dm_get_annee_semestres(anneeid).then((dd) => {
                self.semestres = self.check_array(dd);
                if (self.semestres.length > 0) {
                    self._semestre = self.semestres[0];
                } else {
                    self._semestre = null;
                }
                return true;
            });
        } else if (this.loginInfo.semestres !== null) {
            for (let x of this.loginInfo.semestres) {
                if (x.anneeid == anneeid) {
                    xsemestres.push(x);
                }
            }//x
            this.semestres = xsemestres;
            if (xsemestres.length > 0) {
                this._semestre = this.semestres[0];
            } else {
                this._semestre = null;
            }
            return Promise.resolve(true);
        }
    }// post_change_annee
    private post_update_unite(): Promise<any> {
        let xmatieres: IMatiere[] = [];
        let uniteid = this.uniteid;
        if (uniteid === null) {
            this.matieres = xmatieres;
            this._matiere = null;
            return Promise.resolve(true);
        }
        let pPers: IPerson = this.person;
        if (pPers === null) {
            this.matieres = xmatieres;
            this._matiere = null;
            return Promise.resolve(true);
        }
        let self = this;
        if (pPers.is_admin) {
            return this.dataService.dm_get_unite_matieres(uniteid).then((dd) => {
                self.matieres = self.check_array(dd);
                if (self.matieres.length > 0) {
                    self._matiere = self.matieres[0];
                } else {
                    self._matiere = null;
                }
                return true;
            });
        } else if (this.loginInfo.matieres !== null) {
            for (let x of this.loginInfo.matieres) {
                if (x.uniteid == uniteid) {
                    xmatieres.push(x);
                }
            }//x
            if (xmatieres.length > 0) {
                this._matiere = this.matieres[0];
            } else {
                this._matiere = null;
            }
            return Promise.resolve(true);
        }
    }// post_change_unite
}// class UserInfo
