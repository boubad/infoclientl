// etudperson.ts
//
import {UserPerson} from './userperson';
import {IEtudiantPerson, IEtudiant, IDatabaseManager} from 'infodata';
import {ETUDIANTPERSON_TYPE, ROLE_ETUD, ETUDIANT_BY_PERSON} from '../utils/infoconstants';
//
export class EtudiantPerson extends UserPerson implements IEtudiantPerson {
    private _etudiantids: string[] = [];
    private _dossier: string = null;
    private _sexe: string = null;
    private _date: Date;
    private _ville: string = null;
    private _etablissement: string = null;
    private _serieBac: string = null;
    private _optionBac: string = null;
    private _mentionBac: string = null;
    private _etudesSuperieures: string = null;
    //
    constructor(oMap?: any) {
        super(oMap);
        this.roles = [ROLE_ETUD];
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.etudiantids !== undefined) {
                this._etudiantids = oMap.etudiantids;
            }
            if (oMap.dossier !== undefined) {
                this._dossier = oMap.dossier;
            }
            if (oMap.sexe !== undefined) {
                this._sexe = oMap.sexe;
            }
            if (oMap.birthDate !== undefined) {
                this._date = oMap.birthDate;
            }
            if (oMap.etablissement !== undefined) {
                this._etablissement = oMap.etablissement;
            }
            if (oMap.ville !== undefined) {
                this._ville = oMap.ville;
            }
            if (oMap.serieBac !== undefined) {
                this._serieBac = oMap.serieBac;
            }
            if (oMap.optionBac !== undefined) {
                this._optionBac = oMap.optionBac;
            }
            if (oMap.mentionBac != undefined) {
                this._mentionBac = oMap.mentionBac;
            }
            if (oMap.etudesSuperieures !== undefined) {
                this._etudesSuperieures = oMap.etudesSuperieures;
            }
        } // oMap
    } // constructor

    public to_map(oMap: any): void {
        super.to_map(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            if ((this._etudiantids !== undefined) && (this._etudiantids !== null) &&
                (this._etudiantids.length > 0)) {
                oMap.etudiantids = this._etudiantids;
            }
            if (this.dossier !== null) {
                oMap.dossier = this.dossier;
            }
            if (this.sexe !== null) {
                oMap.sexe = this.sexe;
            }
            if (this.birthDate !== null) {
                oMap.birthDate = this.birthDate;
            }
            if (this.ville !== null) {
                oMap.ville = this.ville;
            }
            if (this.etablissement !== null) {
                oMap.etablissement = this.etablissement;
            }
            if (this.serieBac !== null) {
                oMap.serieBac = this.serieBac;
            }
            if (this.optionBac !== null) {
                oMap.optionBac = this.optionBac;
            }
            if (this.mentionBac !== null) {
                oMap.mentionBac = this.mentionBac;
            }
            if (this.etudesSuperieures !== null) {
                oMap.etudesSuperieures = this.etudesSuperieures;
            }
        }
    } // to_insert_map
    public from_map(oMap: any): void {
        super.from_map(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.etudiantids !== undefined) {
                this._etudiantids = oMap.etudiantids;
            }
            if (oMap.dossier !== undefined) {
                this._dossier = oMap.dossier;
            }
            if (oMap.sexe !== undefined) {
                this._sexe = oMap.sexe;
            }
            if (oMap.birthDate !== undefined) {
                this._date = oMap.birthDate;
            }
            if (oMap.etablissement !== undefined) {
                this._etablissement = oMap.etablissement;
            }
            if (oMap.ville !== undefined) {
                this._ville = oMap.ville;
            }
            if (oMap.serieBac !== undefined) {
                this._serieBac = oMap.serieBac;
            }
            if (oMap.optionBac !== undefined) {
                this._optionBac = oMap.optionBac;
            }
            if (oMap.mentionBac != undefined) {
                this._mentionBac = oMap.mentionBac;
            }
            if (oMap.etudesSuperieures !== undefined) {
                this._etudesSuperieures = oMap.etudesSuperieures;
            }
        }
    }// from_map
	public get etudiantids():string[] {
		if ((this._etudiantids === undefined) || (this._etudiantids === null)){
			this._etudiantids = [];
		}
		return this._etudiantids;
	}
	public get dossier(): string {
		return (this._dossier !== undefined) ? this._dossier : null;
	}
	public set dossier(s: string) {
		this._dossier = (s !== undefined) ? s : null;
	}
	public get sexe(): string {
		return (this._sexe !== undefined) ? this._sexe : null;
	}
	public set sexe(s: string) {
		this._sexe = (s !== undefined) ? s : null;
	}
	public get ville(): string {
		return (this._ville !== undefined) ? this._ville : null;
	}
	public set ville(s: string) {
		this._ville = (s !== undefined) ? s : null;
	}
	public get etablissement(): string {
		return (this._etablissement !== undefined) ? this._etablissement : null;
	}
	public set etablissement(s: string) {
		this._etablissement = (s !== undefined) ? s : null;
	}
	public get serieBac(): string {
		return (this._serieBac !== undefined) ? this._serieBac : null;
	}
	public set serieBac(s: string) {
		this._serieBac = (s !== undefined) ? s : null;
	}
	public get optionBac(): string {
		return (this._optionBac !== undefined) ? this._optionBac : null;
	}
	public set optionBac(s: string) {
		this._optionBac = (s !== undefined) ? s : null;
	}
	public get mentionBac(): string {
		return (this._mentionBac !== undefined) ? this._mentionBac : null;
	}
	public set mentionBac(s: string) {
		this._mentionBac = (s !== undefined) ? s : null;
	}
	public get etudesSuperieures(): string {
		return (this._etudesSuperieures !== undefined) ? this._etudesSuperieures : null;
	}
	public set etudesSuperieures(s: string) {
		this._etudesSuperieures = (s !== undefined) ? s : null;
	}
    public type(): string {
        return ETUDIANTPERSON_TYPE;
    }
    //
    public get birthDate(): Date {
        return (this._date !== undefined) ? this._date : null;
    }
    public set birthDate(s: Date) {
        this._date = this.check_date(s);
    }
    //
    public get isMale(): boolean {
        return (this.sexe !== null) && (this.sexe.indexOf('M') == 0);
    }
    public set isMale(b: boolean) {
        if ((b !== undefined) && (b !== null)) {
            this.sexe = (b) ? 'M' : 'F';
        }
    }
    public get isFeminin(): boolean {
        return (this.sexe !== null) && (this.sexe.indexOf('F') == 0);
    }
    public set isFeminin(b: boolean) {
        if ((b !== undefined) && (b !== null)) {
            this.sexe = (b) ? 'F' : 'M';
        }
    }
    //
    public remove(service: IDatabaseManager): Promise<any> {
        if ((this.id === null) || (this.rev === null)) {
            throw new Error('Item not removeable error');
        }
        let self = this;
        let id: string = this.id;
        return service.dm_get_children_ids(ETUDIANT_BY_PERSON, id).then((aa_ids) => {
			return self.remove_with_children(service, aa_ids, id);
        });
    }// remove
} // class EtudiantPerson
