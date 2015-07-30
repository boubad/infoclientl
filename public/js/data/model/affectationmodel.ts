//affectationmodel.ts
import {InfoUserInfo} from './infouserinfo';
import {BaseEditViewModel} from './baseeditmodel';
import {IAffectation, IDepartementPerson, IUIManager} from 'infodata';
//
export class AffectationViewModel<T extends IAffectation, P extends IDepartementPerson>
    extends BaseEditViewModel<T> {
    //
    private _persons: P[];
    private _currentPersons: P[];
    private _currentAffectations: T[];
    //
    private _person_model: P;
    protected _start: Date;
    protected _end: Date;
    //
    constructor(userinfo: InfoUserInfo) {
        super(userinfo);
        this._persons = [];
        this._currentPersons = [];
        this._currentAffectations = [];
        this._person_model = this.create_person();
        this._start = null;
        this._end = null;
        this.choose_departement = true;
        this.choose_annee = true;
        this.choose_semestre = true;
        this.choose_groupe = true;
    }

    public get persons(): P[] {
        if ((this._persons === undefined) || (this._persons === null)) {
            this._persons = [];
        }
        return this._persons;
    }
    public set persons(s: P[]) {
        this._persons = s;
    }
    public get currentPersons(): P[] {
        return ((this._currentPersons !== undefined) && (this._currentPersons !== null)) ?
            this._currentPersons : [];
    }
    public set currentPersons(s: P[]) {
        this._currentPersons = s;
    }
    protected update_from_userinfo(): void {
      let userinfo = this.userInfo;
      this.modelItem.departementid = userinfo.departementid;
      this.modelItem.anneeid = userinfo.anneeid;
      this.modelItem.semestreid = userinfo.semestreid;
      this.modelItem.groupeid = userinfo.groupeid;
    }
    protected perform_activate(): Promise<any> {
        let self = this;
        return super.perform_activate().then((r) => {
            self.choose_departement = true;
            self.choose_annee = true;
            self.choose_semestre = true;
            self.choose_groupe = true;
            self.update_from_userinfo();
            return self.fill_persons();
        });
    }
    //
    protected create_person(): P {
        return null;
    }
    protected is_refresh(): boolean {
        return (this.semestreid !== null) && (this.groupeid !== null);
    }
    protected post_change_departement(): Promise<any> {
        let self = this;
        return super.post_change_departement().then((r) => {
            return self.fill_persons();
        }).then((x) => {
            self.modelItem.departementid = self.departementid;
            self.modelItem.anneeid = self.anneeid;
            self.modelItem.semestreid = self.semestreid;
            self.modelItem.groupeid = self.groupeid;
            return self.refreshAll();
        });
    }// post_change_departement
    protected post_change_groupe(): Promise<any> {
        let self = this;
        return super.post_change_groupe().then((r) => {
            self.modelItem.departementid = self.departementid;
            self.modelItem.anneeid = self.anneeid;
            self.modelItem.semestreid = self.semestreid;
            self.modelItem.groupeid = self.groupeid;
            return self.refreshAll();
        });
    }
    protected post_change_semestre(): Promise<any> {
        let self = this;
        return super.post_change_semestre().then((r) => {
            self.modelItem.departementid = self.departementid;
            self.modelItem.anneeid = self.anneeid;
            self.modelItem.semestreid = self.semestreid;
            self.modelItem.groupeid = self.groupeid;
            self._start = null;
            self._end = null;
            let sem = self.semestre;
            if (sem !== null) {
                self._start = sem.startDate;
                self._end = sem.endDate;
            }
            return self.refreshAll();
        });
    }
    protected is_storeable(): boolean {
        if (this.semestre == null) {
            return false;
        }
        if ((this._start === undefined) || (this._start === null)) {
            this._start = this.semestre.startDate;
        }
        if ((this._end !== undefined) || (this._end === null)) {
            this._end = this.semestre.endDate;
        }
        if ((this._start === undefined) || (this._end === undefined)) {
            return false;
        }
        if ((this.currentPersons === undefined) || (this.departementid === undefined) ||
            (this.anneeid === undefined) || (this.semestreid === undefined) ||
            (this.groupeid === undefined)) {
            return false;
        }
        let bRet = (this.departementid !== null) && (this.anneeid !== null) &&
            (this.semestreid !== null) && (this.groupeid !== null) &&
            (this._start !== null) && (this._end !== null);
        if (!bRet) {
            return false;
        }
        if (this.currentPersons === null) {
            return false;
        }
        if (this.currentPersons.length < 1) {
            return false;
        }
        let t1 = Date.parse(this._start.toString());
        let t2 = Date.parse(this._end.toString());
        return (!isNaN(t1)) && (!isNaN(t2)) && (t1 <= t2);
    }
    public get canSave(): boolean {
        return this.is_storeable();
    }
    public set canSave(b: boolean) { }
    //
    public get allStartDate(): string {
        return ((this._start !== undefined) && (this._start !== null)) ?
            this.date_to_string(this._start) : null;
    }
    public set allStartDate(s: string) {
        this._start = null;
        let d1 = this.semestreStartDate;
        let d2 = this.semestreEndDate;
        if ((d1 === null) || (d2 === null)) {
            return;
        }
        let d = this.string_to_date(s);
        if (d !== null) {
            let t = Date.parse(d.toString());
            if (isNaN(t)) {
                return;
            }
            let t1 = Date.parse(d1.toString());
            let t2 = Date.parse(d2.toString());
            if ((!isNaN(t1)) && (!isNaN(t2)) && (t >= t1) && (t <= t2)) {
                this._start = d;
            }
        }
    }
    public get allEndDate(): string {
        return ((this._end !== undefined) && (this._end !== null)) ?
            this.date_to_string(this._end) : null;
    }
    public set allEndDate(s: string) {
        this._end = null;
        let d1 = this.semestreStartDate;
        let d2 = this.semestreEndDate;
        if ((d1 === null) || (d2 === null)) {
            return;
        }
        let d = this.string_to_date(s);
        if (d !== null) {
            let t = Date.parse(d.toString());
            if (isNaN(t)) {
                return;
            }
            let t1 = Date.parse(d1.toString());
            let t2 = Date.parse(d2.toString());
            if ((!isNaN(t1)) && (!isNaN(t2)) && (t >= t1) && (t <= t2)) {
                this._end = d;
            }
        }
    }
    //
    protected get personModel(): P {
        if (this._person_model === null) {
            this._person_model = this.create_person();
        }
        return this._person_model;
    }
    protected fill_persons(): Promise<any> {
        this.currentPersons = [];
        let id = this.departementid;
        this.personModel.departementid = id;
        if (id === null) {
            this.persons = [];
            return Promise.resolve(true);
        } else {
            let self = this;
            return this.dataService.dm_get_items(this.personModel.start_key(), this.personModel.end_key()).then((pp: P[]) => {
                self.persons = ((pp !== undefined) && (pp !== null)) ? pp : [];
                return true;
            })
        }
    }
    public get currentAffectations(): T[] {
        return ((this._currentAffectations !== undefined) && (this._currentAffectations !== null)) ?
            this._currentAffectations : [];
    }
    public set currentAffectations(s: T[]) {
        this._currentAffectations = s;
    }
    public get canRemove(): boolean {
        return ((this.currentAffectations !== null) && (this.currentAffectations.length > 0));
    }// canRemove
    public set canRemove(s: boolean) { }
    public remove(): any {
        if (this.currentAffectations === null) {
            return false;
        }
        if (this.currentAffectations.length < 1) {
            return false;
        }
        if (!this.confirm('Voulez-vous vraiment supprimer?')) {
            return false;
        }
        this.clear_error();
        let pp: Promise<any>[] = [];
        let service = this.dataService;
        for (let x of this.currentAffectations) {
            let p = x.remove(service);
            pp.push(p);
        }
        let self = this;
        return Promise.all(pp).then((r) => {
            self.currentAffectations = [];
            return self.refreshAll();
        }).catch((err) => {
            self.set_error(err);
        });
    }// remove
    protected compose_item(p: P): T {
        let a = this.create_item();
        a.personid = p.personid;
        a.firstname = p.firstname;
        a.lastname = p.lastname;
        a.avatarid = p.avatarid;
        return a;
    }
    protected retrieve_add_items(): T[] {
        let oRet: T[] = [];
        if ((this.currentPersons !== null) && (this.currentPersons.length > 0)) {
            for (let p of this.currentPersons) {
                let a = this.compose_item(p);
                oRet.push(a);
            }// p
        }// persons
        return oRet;
    }// retrieve_add_items
    public save(): any {
        if (!this.is_storeable()) {
            return false;
        }
        let oItems = this.retrieve_add_items();
        if (oItems.length < 1) {
            return false;
        }
        let self = this;
        this.clear_error();
        let pp: Promise<any>[] = [];
        let service = this.dataService;
        for (let x of oItems) {
            pp.push(x.save(service));
        }
        return Promise.all(pp).then((r) => {
            self.currentPersons = [];
            return self.refreshAll();
        }).catch((err) => {
            self.set_error(err);
        });
    }// save
}// class AffectationViewModel
