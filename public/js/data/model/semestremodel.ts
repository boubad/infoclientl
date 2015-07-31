//semestremodel.ts
import {InfoUserInfo} from './infouserinfo';
import {IntervalViewModel} from './intervalmodel';
import {Semestre} from '../domain/semestre';
//
export class SemestreModel extends IntervalViewModel<Semestre> {
    constructor(userinfo: InfoUserInfo) {
        super(userinfo);
        this.title = 'Semestres';
    }// constructor
    protected perform_activate(): Promise<any> {
        let self = this;
        return super.perform_activate().then((r) => {
            self.choose_departement = true;
            self.choose_annee = true;
            return true;
        });
    }
    protected create_item(): Semestre {
        return new Semestre({
            departementid: this.departementid,
            anneeid: this.anneeid
        });
    }
    public post_change_annee(): Promise<any> {
        this.modelItem.departementid = this.departementid;
        this.modelItem.anneeid = this.anneeid;
        this.currentItem = this.create_item();
        this.minDate = null;
        this.maxDate = null;
        let x = this.annee;
        if (x !== null) {
            this.minDate = this.date_to_string(x.startDate);
            this.maxDate = this.date_to_string(x.endDate);
        }
        return this.refreshAll();
    }
    protected is_refresh(): boolean {
        return (this.anneeid !== null);
    }
    protected is_storeable(): boolean {
        if (this.annee === undefined) {
            return false;
        }
        let item = this.currentItem;
        if (item === null) {
            return false;
        }
        if ((item.startDate === null) || (item.endDate === null) || (item.sigle === null)) {
            return false;
        }
        let pAn = this.annee;
        if (pAn === null) {
            return false;
        }
        if ((pAn.id === undefined) || (pAn.id === null)) {
            return false;
        }
        this.currentItem.anneeid = pAn.id;
        this.currentItem.departementid = this.departementid;
        if (!item.is_storeable()) {
            return false;
        }
        if ((pAn.startDate === undefined) || (pAn.startDate === null)) {
            return false;
        }
        if ((pAn.endDate === undefined) || (pAn.endDate === null)) {
            return false;
        }
        let t01 = Date.parse(pAn.startDate.toString());
        let t02 = Date.parse(pAn.endDate.toString());
        let t1 = Date.parse(this.currentItem.startDate.toString());
        let t2 = Date.parse(this.currentItem.endDate.toString());
        return (t1 >= t01) && (t1 <= t02) && (t2 >= t01) && (t2 <= t02) &&
            (t1 <= t2);
    }
}// class AnneeModel
