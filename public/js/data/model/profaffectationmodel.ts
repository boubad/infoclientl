//profaffectationmodel.ts
import {InfoUserInfo} from './infouserinfo';
import {AffectationViewModel} from './affectationmodel';
import {ProfAffectation} from '../domain/profaffectation';
import {Enseignant} from '../domain/enseignant';
import {GROUPE_GENRE_TP} from '../utils/infoconstants';
//
export class ProfaffectationModel extends AffectationViewModel<ProfAffectation, Enseignant> {
    //
    constructor(userinfo: InfoUserInfo) {
        super(userinfo);
        this.title = 'Affectations enseignants';
    }
    //
    protected create_person(): Enseignant {
        let p = new Enseignant({ departementid: this.departementid });
        return p;
    }
    protected is_storeable(): boolean {
        return super.is_storeable() && (this.uniteid !== null)
            && (this.matiereid !== null);
    }
    public get canSave(): boolean {
        return this.is_storeable();
    }
    public set canSave(b: boolean) { }
    protected update_from_userinfo(): void {
      let userinfo = this.userInfo;
      this.modelItem.uniteid = userinfo.uniteid;
      this.modelItem.matiereid = userinfo.matiereid;
    }
    protected perform_activate(): Promise<any> {
        let self = this;
        let userinfo = this.userInfo;
        return super.perform_activate().then((r) => {
            self.choose_unite = true;
            self.choose_matiere = true;
            self.update_from_userinfo();
            return self.fill_persons();
        });
    }
    protected create_item(): ProfAffectation {
        let p = new ProfAffectation({
            departementid: this.departementid,
            anneeid: this.anneeid,
            semestreid: this.semestreid,
            groupeid: this.groupeid,
            uniteid: this.uniteid,
            matiereid: this.matiereid,
            genre: ((this.groupe !== undefined) && (this.groupe !== null)) ? this.groupe.genre : GROUPE_GENRE_TP,
            startDate: this._start,
            endDate: this._end,
            departementSigle: (this.departement !== null) ? this.departement.sigle : null,
            uniteSigle: (this.unite !== null) ? this.unite.sigle : null,
            matiereSigle: (this.matiere !== null) ? this.matiere.sigle : null,
            groupeSigle: (this.groupe !== null) ? this.groupe.sigle : null,
            anneeSigle: (this.annee !== null) ? this.annee.sigle : null,
            semestreSigle: (this.semestre !== null) ? this.semestre.sigle : null
        });
        return p;
    }
    protected compose_item(p: Enseignant): ProfAffectation {
        let a = super.compose_item(p);
        a.enseignantid = p.id;
        if (a.genre === null){
          a.genre = ((this.groupe !== undefined) && (this.groupe !== null)) ? this.groupe.genre : GROUPE_GENRE_TP;
        }
        a.check_id();
        return a;
    }
    public post_change_unite(): Promise<any> {
        this.modelItem.uniteid = this.uniteid;
        this.modelItem.matiereid = this.matiereid;
        this.currentAffectations = [];
        return this.refreshAll();
    }
    public post_change_matiere(): Promise<any> {
        this.modelItem.matiereid = this.matiereid;
        this.currentAffectations = [];
        return this.refreshAll();
    }
    protected is_refresh(): boolean {
        return super.is_refresh() && (this.modelItem.matiereid !== null) &&
            (this.modelItem.genre !== null);
    }
}// class ProfAffectationModel
