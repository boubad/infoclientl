//etudiantmodel.ts
import {InfoUserInfo} from './infouserinfo';
import {PersonViewModel} from './personmodel';
import {Etudiant} from '../domain/etudiant';
import {EtudiantPerson} from '../domain/etudperson';
import {IEtudiantPerson, IEtudiant} from 'infodata';
//
export class EtudiantModel extends PersonViewModel<Etudiant, EtudiantPerson> {
    //
    private _date: string;
    //
	constructor(userinfo:InfoUserInfo) {
		super(userinfo);
		this.title = 'Etudiants';
		this._date = null;
	}// constructor

    protected create_person(): EtudiantPerson {
        let p = new EtudiantPerson();
        return p;
    }
    protected create_item(): Etudiant {
        let p = new Etudiant({ departementid: this.departementid
			});
        return p;
    }
    public canActivate(params?: any, config?: any, instruction?: any): any {
        return this.is_admin;
    }// activate
    protected post_change_item(): Promise<any> {
        let self = this;
        return super.post_change_item().then((r) => {
            let pPers = this.currentPerson;
            if (pPers !== null) {
                self._date = this.date_to_string(pPers.birthDate);
            } else {
                self._date = null;
            }
            return true;
        });
    }// post_change_item
    public get dossier(): string {
        return (this.currentPerson !== null) ? this.currentPerson.dossier : null;
    }
    public set dossier(s: string) {
        let x = this.currentPerson;
        if (x !== null) {
            x.dossier = s;
        }
    }
    public get sexe(): string {
        return (this.currentPerson !== null) ? this.currentPerson.sexe : null;
    }
    public set sexe(s: string) {
        let x = this.currentPerson;
        if (x !== null) {
            x.sexe = s;
        }
    }
    public get birthDate(): string {
        return this._date;
    }
    public set birthDate(s: string) {
        let x = this.currentPerson;
        if (x !== null) {
            x.birthDate = this.string_to_date(s);
            this._date = this.date_to_string(x.birthDate);
        }
    }
    public get ville(): string {
        return (this.currentPerson !== null) ? this.currentPerson.ville : null;
    }
    public set ville(s: string) {
        let x = this.currentPerson;
        if (x !== null) {
            x.ville = s;
        }
    }
    public get etablissement(): string {
        return (this.currentPerson !== null) ? this.currentPerson.etablissement : null;
    }
    public set etablissement(s: string) {
        let x = this.currentPerson;
        if (x !== null) {
            x.etablissement = s;
        }
    }
    public get serieBac(): string {
        return (this.currentPerson !== null) ? this.currentPerson.serieBac : null;
    }
    public set serieBac(s: string) {
        let x = this.currentPerson;
        if (x !== null) {
            x.serieBac = s;
        }
    }
    public get optionBac(): string {
         return (this.currentPerson !== null) ? this.currentPerson.optionBac : null;
    }
    public set optionBac(s: string) {
        let x = this.currentPerson;
        if (x !== null) {
            x.optionBac = s;
        }
    }
    public get mentionBac(): string {
        return (this.currentPerson !== null) ? this.currentPerson.mentionBac : null;
    }
    public set mentionBac(s: string) {
        let x = this.currentPerson;
        if (x !== null) {
            x.mentionBac = s;
        }
    }
    public get etudesSuperieures(): string {
         return (this.currentPerson !== null) ? this.currentPerson.etudesSuperieures : null;
    }
    public set etudesSuperieures(s: string) {
        let x = this.currentPerson;
        if (x !== null) {
            x.etudesSuperieures = s;
        }
    }
}// class Etudiants
