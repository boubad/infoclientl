//userinfoelement.ts
import * as userinf from './userinfo';
import {RootElement} from './rootelement';
import {IPerson, IDepartement, IAnnee, ISemestre, IUnite, IMatiere, IGroupe,
IMessageManager, ILogManager, IUIManager,
IObjectStore, ILoginInfo, IInfoMessage, IEnseignant, IDatabaseManager} from 'infodata';
//
export class UserInfoElement extends RootElement {
    //
    private _userinfo: userinf.UserInfo;
    //
    constructor(userinfo?: userinf.UserInfo) {
        super();
        this._userinfo = userinfo;
    }// constructor
    public get userInfo(): userinf.UserInfo {
        return (this._userinfo !== undefined) ? this._userinfo : null;
    }
    public set userInfo(s: userinf.UserInfo) {
        this._userinfo = s;
    }
    protected get_dataservice(): IDatabaseManager {
        return (this.userInfo !== null) ? this.userInfo.dataService : null;
    }
    //
    public get departements(): IDepartement[] {
        return (this.userInfo !== null) ? this.userInfo.departements : [];
    }
    public get departement(): IDepartement {
        return (this.userInfo !== null) ? this.userInfo.departement : null;
    }
    public set departement(s: IDepartement) {
        if (this.userInfo !== null) {
            this.userInfo.departement = s;
        }
    }
    //
    public get annees(): IAnnee[] {
        return (this.userInfo !== null) ? this.userInfo.annees : [];
    }
    public get annee(): IAnnee {
        return (this.userInfo !== null) ? this.userInfo.annee : null;
    }
    public set annee(s: IAnnee) {
        if (this.userInfo !== null) {
            this.userInfo.annee = s;
        }
    }
    //
    public get semestres(): ISemestre[] {
        return (this.userInfo !== null) ? this.userInfo.semestres : [];
    }
    public get semestre(): ISemestre {
        return (this.userInfo !== null) ? this.userInfo.semestre : null;
    }
    public set semestre(s: ISemestre) {
        if (this.userInfo !== null) {
            this.userInfo.semestre = s;
        }
    }
    //
    public get unites(): IUnite[] {
        return (this.userInfo !== null) ? this.userInfo.unites : [];
    }
    public get unite(): IUnite {
        return (this.userInfo !== null) ? this.userInfo.unite : null;
    }
    public set unite(s: IUnite) {
        if (this.userInfo !== null) {
            this.userInfo.unite = s;
        }
    }
    //
    public get matieres(): IMatiere[] {
        return (this.userInfo !== null) ? this.userInfo.matieres : [];
    }
    public get matiere(): IMatiere {
        return (this.userInfo !== null) ? this.userInfo.matiere : null;
    }
    public set matiere(s: IMatiere) {
        if (this.userInfo !== null) {
            this.userInfo.matiere = s;
        }
    }
    //
    public get groupes(): IGroupe[] {
        return (this.userInfo !== null) ? this.userInfo.groupes : [];
    }
    public get groupe(): IGroupe {
        return (this.userInfo !== null) ? this.userInfo.groupe : null;
    }
    public set groupe(s: IGroupe) {
        if (this.userInfo !== null) {
            this.userInfo.groupe = s;
        }
    }
    //
    public get enseignantid(): string {
        return (this.userInfo !== null) ? this.userInfo.enseignantid : null;
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
        return (this.userInfo !== null) ? this.userInfo.person : null;
    }// get person
    public get photoUrl(): string {
        return ((this.person !== undefined) && (this.person !== null)) ? this.person.url : null;
    }
    public get hasPhotoUrl(): boolean {
        return (this.photoUrl !== null);
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
    public get departementName(): string {
        return (this.departement !== null) ? this.departement.text : null;
    }
    public get uniteName(): string {
        return (this.unite !== null) ? this.unite.text : null;
    }
    public get matiereName(): string {
        return (this.matiere !== null) ? this.matiere.text : null;
    }
    public get groupeName(): string {
        return (this.groupe !== null) ? this.groupe.text : null;
    }
    public get anneeName(): string {
        return (this.annee !== null) ? this.annee.text : null;
    }
    public get semestreName(): string {
        return (this.semestre !== null) ? this.semestre.text : null;
    }
    //
    public get anneeStartDate(): Date {
        return (this.annee !== null) ? this.annee.startDate : null;
    }
    public get anneeEndDate(): Date {
        return (this.annee !== null) ? this.annee.endDate : null;
    }
    public get anneeStartDateString(): string {
        return (this.annee !== null) ? this.date_to_string(this.annee.startDate) : null;
    }
    public get anneeEndDateString(): string {
        return (this.annee !== null) ? this.date_to_string(this.annee.endDate) : null;
    }
    //
    public get semestreStartDate(): Date {
        return (this.semestre !== null) ? this.semestre.startDate : null;
    }
    public get semestreEndDate(): Date {
        return (this.semestre !== null) ? this.semestre.endDate : null;
    }
    public get semestreStartDateString(): string {
        return (this.semestre !== null) ? this.date_to_string(this.semestre.startDate) : null;
    }
    public get semestreEndDateString(): string {
        return (this.semestre !== null) ? this.date_to_string(this.semestre.endDate) : null;
    }
    //
}// class UserInfoElement
