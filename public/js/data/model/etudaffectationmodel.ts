//etudaffectationmodel.ts
import {InfoUserInfo} from './infouserinfo';
import {AffectationViewModel} from './affectationmodel';
import {EtudAffectation} from '../domain/etudaffectation';
import {Etudiant} from '../domain/etudiant';
//
export class EtudaffectationModel extends AffectationViewModel<EtudAffectation, Etudiant> {
    //
    constructor(userinfo: InfoUserInfo) {
        super(userinfo);
        this.title = 'Affectations etudiants';
    }
    //
    protected create_person(): Etudiant {
        let p = new Etudiant({ departementid: this.departementid });
        return p;
    }
    protected create_item(): EtudAffectation {
        let p = new EtudAffectation({
            departementid: this.departementid,
            anneeid: this.anneeid,
            semestreid: this.semestreid,
            groupeid: this.groupeid,
            startDate: this._start,
            endDate: this._end,
            departementSigle: (this.departement !== null) ? this.departement.sigle : null,
            groupeSigle: (this.groupe !== null) ? this.groupe.sigle : null,
            anneeSigle: (this.annee !== null) ? this.annee.sigle : null,
            semestreSigle: (this.semestre !== null) ? this.semestre.sigle : null,
        });
        return p;
    }
    protected compose_item(p: Etudiant): EtudAffectation {
        let a = super.compose_item(p);
        a.etudiantid = p.id;
        a.check_id();
        return a;
    }
}// class EtudAffViewModel
