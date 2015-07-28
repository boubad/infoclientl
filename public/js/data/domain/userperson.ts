// userperson.ts
//
import {DepartementBasePerson} from './depbaseperson';
import {IUserPerson} from 'infodata';
//
export class UserPerson extends DepartementBasePerson implements IUserPerson {
    //
    private _anneeids: string[];
    private _semestreids: string[];
    private _matiereids: string[];
    private _uniteids: string[];
    private _groupeids: string[];
    private _affectationids: string[];
    private _eventids: string[];
    //
    constructor(oMap?: any) {
        super(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.affectationids !== undefined) {
                this._affectationids = oMap.affectationids;
            }
            if (oMap.eventids !== undefined) {
                this._eventids = oMap.eventids;
            }
            if (oMap.anneeids !== undefined) {
                this._anneeids = oMap.anneeids;
            } //
            if (oMap.semestreids !== undefined) {
                this._semestreids = oMap.semestreids;
            } //
            if (oMap.uniteids !== undefined) {
                this._uniteids = oMap.uniteids;
            } //
            if (oMap.matiereids !== undefined) {
                this._matiereids = oMap.matiereids;
            } //
            if (oMap.groupeids !== undefined) {
                this._groupeids = oMap.groupeids;
            } //
        } // oMap
    } // constructor
    public from_map(oMap: any): void {
        super.from_map(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.affectationids !== undefined) {
                this._affectationids = oMap.affectationids;
            }
            if (oMap.eventids !== undefined) {
                this._eventids = oMap.eventids;
            }
            if (oMap.anneeids !== undefined) {
                this._anneeids = oMap.anneeids;
            } //
            if (oMap.semestreids !== undefined) {
                this._semestreids = oMap.semestreids;
            } //
            if (oMap.uniteids !== undefined) {
                this._uniteids = oMap.uniteids;
            } //
            if (oMap.matiereids !== undefined) {
                this._matiereids = oMap.matiereids;
            } //
            if (oMap.groupeids !== undefined) {
                this._groupeids = oMap.groupeids;
            } //
        } // oMap
    }// from_map
    public to_map(oMap: any): void {
        super.to_map(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            if ((this._affectationids !== undefined) && (this._affectationids !== null) &&
                (this._affectationids.length > 0)) {
                oMap.affectationids = this._affectationids;
            }
            if ((this._eventids !== undefined) && (this._eventids !== null) &&
                (this._eventids.length > 0)) {
                oMap.eventids = this._eventids;
            }
            if ((this._semestreids !== undefined) && (this._semestreids !== null) &&
                (this._semestreids.length > 0)) {
                oMap.semestreids = this._semestreids;
            }
            if ((this._matiereids !== undefined) && (this._matiereids !== null) &&
                (this._matiereids.length > 0)) {
                oMap.matiereids = this._matiereids;
            }
            if ((this._uniteids !== undefined) && (this._uniteids !== null) &&
                (this._uniteids.length > 0)) {
                oMap.uniteids = this._uniteids;
            }
            if ((this._anneeids !== undefined) && (this._anneeids !== null) &&
                (this._anneeids.length > 0)) {
                oMap.anneeids = this._anneeids;
            }
            if ((this._groupeids !== undefined) && (this._groupeids !== null) &&
                (this._groupeids.length > 0)) {
                oMap.groupeids = this._groupeids;
            }
        }
    } // to_map
    public get affectationids(): string[] {
        if ((this._affectationids === undefined) || (this._affectationids === null)) {
            this._affectationids = [];
        }
        return this._affectationids;
    }
    public get eventids(): string[] {
        if ((this._eventids === undefined) || (this._eventids === null)) {
            this._eventids = [];
        }
        return this._eventids;
    }
    public get groupeids(): string[] {
        if ((this._groupeids === undefined) || (this._groupeids === null)) {
            this._groupeids = [];
        }
        return this._groupeids;
    }
    public get semestreids(): string[] {
        if ((this._semestreids === undefined) || (this._semestreids === null)) {
            this._semestreids = [];
        }
        return this._semestreids;
    }
    public get matiereids(): string[] {
        if ((this._matiereids === undefined) || (this._matiereids === null)) {
            this._matiereids = [];
        }
        return this._matiereids;
    }
    public get uniteids(): string[] {
        if ((this._uniteids === undefined) || (this._uniteids === null)) {
            this._uniteids = [];
        }
        return this._uniteids;
    }
    public get anneeids(): string[] {
        if ((this._anneeids === undefined) || (this._anneeids === null)) {
            this._anneeids = [];
        }
        return this._anneeids;
    }
} // class EtudiantPerson
