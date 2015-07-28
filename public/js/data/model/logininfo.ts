//logininfo.ts
//
import {InfoElement} from '../utils/infoelement';
import {Departement} from '../domain/departement';
import {Person} from '../domain/person';
import {ILoginInfo, IPerson, IUserPerson, IDepBasePerson, IDepartement, IAnnee, ISemestre,
IUnite, IMatiere, IGroupe, IAdministrator,
IEnseignant, IEtudiant, IDatabaseManager} from 'infodata';
//
export class LoginInfo extends InfoElement implements ILoginInfo {
    //
    private _person: IPerson = null;
    private _departements: IDepartement[] = null;
    private _annees: IAnnee[] = null;
    private _semestres: ISemestre[] = null;
    private _unites: IUnite[] = null;
    private _matieres: IMatiere[] = null;
    private _groupes: IGroupe[] = null;
    private _administrator: IAdministrator = null;
    private _enseignant: IEnseignant = null;
    private _etudiant: IEtudiant = null;
    //
    constructor() {
        super();
    }
    //
    public clear(): void {
        this._person = null;
        this._departements = null;
        this._annees = null;
        this._semestres = null;
        this._unites = null;
        this._matieres = null;
        this._groupes = null;
        this._administrator = null;
        this._enseignant = null;
        this._etudiant = null;
    }// clear
    public login(username: string, passw: string, service: IDatabaseManager): Promise<boolean> {
        let bRet: boolean = false;
        this.clear();
        if ((username === undefined) || (username === null) ||
            (service === undefined) || (service === null)) {
            return Promise.resolve(bRet);
        }
        let ss = username.trim().toLowerCase();
        if (ss.length < 1) {
            return Promise.resolve(bRet);
        }
        let model: IPerson = new Person({ username: ss });
        let id = model.create_id();
        let self = this;
        let pPers = null;
        let emptyArray: string[] = [];
        let isAdmin: boolean = false;
        return service.dm_find_item_by_id(id).then((px: IPerson) => {
            if ((px !== undefined) && (px !== null)) {
                if (self.check_password(passw, px.password)) {
					if (px.is_prof) {
						pPers = <IUserPerson>px;
					} else if (px.is_admin) {
						pPers = <IDepBasePerson>px;
					} else if (px.is_etud) {
						pPers = <IUserPerson> px;
					} else {
						pPers = px;
					}
                    self._person = pPers;
                    bRet = true;
                }
            }
            return pPers;
        }).then((xPers) => {
            if (xPers !== null) {
                isAdmin = pPers.is_admin;
                if (pPers.is_super) {
                    let model = new Departement();
                    return service.dm_get_items(model.start_key(), model.end_key());
                } else {
                    return service.dm_find_items_array(pPers.departementids);
                }
            } else {
                return [];
            }
        }).then((dd: IDepartement[]) => {
            if (pPers !== null) {
                self._departements = dd;
                let xa: string[] = (isAdmin) ? emptyArray : pPers.anneeids;
                return service.dm_find_items_array(xa);
            } else {
                return [];
            }
        }).then((aa: IAnnee[]) => {
            if (pPers !== null) {
                self._annees = aa;
                let xa: string[] = (isAdmin) ? emptyArray : pPers.semestreids;
                return service.dm_find_items_array(xa);
            } else {
                return [];
            }
        }).then((ss: ISemestre[]) => {
            if (pPers !== null) {
                self._semestres = ss;
                let xa: string[] = (isAdmin) ? emptyArray : pPers.uniteids;
                return service.dm_find_items_array(xa);
            } else {
                return [];
            }
        }).then((uu: IUnite[]) => {
            if (pPers !== null) {
                self._unites = uu;
                let xa: string[] = (isAdmin) ? emptyArray : pPers.matiereids;
                return service.dm_find_items_array(xa);
            } else {
                return [];
            }
        }).then((mm: IMatiere[]) => {
            if (pPers !== null) {
                self._matieres = mm;
                let xa: string[] = (isAdmin) ? emptyArray : pPers.groupeids;
                return service.dm_find_items_array(xa);
            } else {
                return [];
            }
        }).then((gg: IGroupe[]) => {
            if (pPers !== null) {
                self._groupes = gg;
                let xa: string = null;
                if ((pPers.administratorids !== undefined) && (pPers.administratorids !== null) &&
                    (pPers.administratorids.length > 0)) {
                    xa = pPers.administratorids[0];
                }
                return service.dm_find_item_by_id(xa);
            } else {
                return null;
            }
        }).then((ff: IAdministrator) => {
            if (pPers !== null) {
                self._administrator = ff;
                let xa: string = null;
                if ((pPers.enseignantids !== undefined) && (pPers.enseignantids !== null) &&
                    (pPers.enseignantids.length > 0)) {
                    xa = pPers.enseignantids[0];
                }
                return service.dm_find_item_by_id(xa);
            } else {
                return null;
            }
        }).then((fx: IEnseignant) => {
            if (pPers !== null) {
                self._enseignant = fx;
                let xa: string = null;
                if ((pPers.etudiantids !== undefined) && (pPers.etudiantids !== null) &&
                    (pPers.etudiantids.length > 0)) {
                    xa = pPers.etudiantids[0];
                }
                return service.dm_find_item_by_id(xa);
            } else {
                return null;
            }
        }).then((ee: IEtudiant) => {
            if (pPers !== null) {
                self._etudiant = ee;
            }
            return bRet;
        });
    }// login
    //
    public get person(): IPerson {
        return (this._person !== undefined) ? this._person : null;
    }
    public get administrator(): IAdministrator {
        return (this._administrator !== undefined) ? this._administrator : null;
    }
    public set administrator(s: IAdministrator) {
        this._administrator = (s !== undefined) ? s : null;
    }
    public get enseignant(): IEnseignant {
        return (this._enseignant !== undefined) ? this._enseignant : null;
    }
    public set enseignant(s: IEnseignant) {
        this._enseignant = (s !== undefined) ? s : null;
    }
    public get etudiant(): IEtudiant {
        return (this._etudiant !== undefined) ? this._etudiant : null;
    }
    public set etudiant(s: IEtudiant) {
        this._etudiant = (s !== undefined) ? s : null;
    }
    //
    public get departements(): IDepartement[] {
        return ((this._departements !== undefined) && (this._departements !== null)) ?
            this._departements : [];
    }
    //
    public get annees(): IAnnee[] {
        return ((this._annees !== undefined) && (this._annees !== null)) ?
            this._annees : [];
    }
    //
    public get semestres(): ISemestre[] {
        return ((this._semestres !== undefined) && (this._semestres !== null)) ?
            this._semestres : [];
    }
    //
    public get groupes(): IGroupe[] {
        return ((this._groupes !== undefined) && (this._groupes !== null)) ?
            this._groupes : [];
    }
    //
    public get unites(): IUnite[] {
        return ((this._unites !== undefined) && (this._unites !== null)) ?
            this._unites : [];
    }
    //
    public get matieres(): IMatiere[] {
        return ((this._matieres !== undefined) && (this._matieres !== null)) ?
            this._matieres : [];
    }
    //
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
}// class LoginInfo
