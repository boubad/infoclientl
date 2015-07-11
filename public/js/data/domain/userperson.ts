// userperson.ts
//
import {Person} from './person';
import {IUserPerson} from 'infodata';
//
export class UserPerson extends Person implements IUserPerson {
    //
    public anneeids: string[] = [];
    public semestreids: string[] = [];
    public matiereids: string[] = [];
    public uniteids: string[] = [];
    public groupeids: string[] = [];
    public affectationids: string[] = [];
    public eventids: string[] = [];
    //
    constructor(oMap?: any) {
        super(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.affectationids !== undefined) {
                this.affectationids = oMap.affectationids;
            }
            if (oMap.eventids !== undefined) {
                this.eventids = oMap.eventids;
            }
            if (oMap.anneeids !== undefined) {
                this.anneeids = oMap.anneeids;
            } //
            if (oMap.semestreids !== undefined) {
                this.semestreids = oMap.semestreids;
            } //
            if (oMap.uniteids !== undefined) {
                this.uniteids = oMap.uniteids;
            } //
            if (oMap.matiereids !== undefined) {
                this.matiereids = oMap.matiereids;
            } //
            if (oMap.groupeids !== undefined) {
                this.groupeids = oMap.groupeids;
            } //
        } // oMap
    } // constructor
    public from_map(oMap: any): void {
        super.from_map(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.affectationids !== undefined) {
                this.affectationids = oMap.affectationids;
            }
            if (oMap.eventids !== undefined) {
                this.eventids = oMap.eventids;
            }
            if (oMap.anneeids !== undefined) {
                this.anneeids = oMap.anneeids;
            } //
            if (oMap.semestreids !== undefined) {
                this.semestreids = oMap.semestreids;
            } //
            if (oMap.uniteids !== undefined) {
                this.uniteids = oMap.uniteids;
            } //
            if (oMap.matiereids !== undefined) {
                this.matiereids = oMap.matiereids;
            } //
            if (oMap.groupeids !== undefined) {
                this.groupeids = oMap.groupeids;
            } //
        } // oMap
    }// from_map
    public to_map(oMap: any): void {
        super.to_map(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            oMap.affectationids = this.affectationids;
            oMap.eventids = this.eventids;
            oMap.uniteids = this.uniteids;
            oMap.matiereids = this.matiereids;
            oMap.anneeids = this.anneeids;
            oMap.semestreids = this.semestreids;
            oMap.groupeids = this.groupeids;
        }
    } // to_map
} // class EtudiantPerson
