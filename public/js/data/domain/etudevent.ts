//etudevent.ts
//
import {MatiereWorkItem} from './matiereworkitem';
import { IEtudEvent, IPerson, IEtudiantPerson, IGroupeEvent } from 'infodata';
import { ETUDEVENT_TYPE, ETUDEVENT_PREFIX } from '../utils/infoconstants';
//
export class EtudEvent extends MatiereWorkItem
    implements IEtudEvent {
    private _groupeeventid: string;
    private _groupeEventName: string;
    private _etudaffectationid: string;
    private _coefficient: number;
    private _note: number;
    private _etudiantid: string;
    private _matiereCoefficient: number;
    private _uniteCoefficient: number;
    private _order: number;
    //
    constructor(oMap?: any) {
        super(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.order !== undefined) {
                this.order = oMap.order;
            }
            if (oMap.groupeeventid !== undefined) {
                this.groupeeventid = oMap.groupeeventid;
            }
            if (oMap.note !== undefined) {
                this.note = oMap.note;
            }
            if (oMap.groupeEventName !== undefined) {
                this.groupeEventName = oMap.groupeEventName;
            }
            if (oMap.etudaffectationid !== undefined) {
                this.etudaffectationid = oMap.etudaffectationid;
            }
            if (oMap.coefficient !== undefined) {
                this.coefficient = oMap.coefficient;
            }
            if (oMap.etudiantid !== undefined) {
                this.etudiantid = oMap.etudiantid;
            }
            if (oMap.matiereCoefficient !== undefined) {
                this.matiereCoefficient = oMap.matiereCoefficient;
            }
            if (oMap.uniteCoefficient !== undefined) {
                this.uniteCoefficient = oMap.uniteCoefficient;
            }
        } // oMap
    } // constructor
    public get order(): number {
        return ((this._order !== undefined) && (this._order !== null) &&
            (this._order > 0)) ? this._order : 0;
    }
    public set oder(s: number) {
        this._order = ((s !== undefined) && (s !== null) &&
            (s > 0)) ? s : 0;
    }
    public get matiereCoefficient(): number {
        return ((this._matiereCoefficient !== undefined) && (this._matiereCoefficient !== null) &&
            (this._matiereCoefficient > 0)) ? this._matiereCoefficient : 1.0;
    }
    public set matiereCoefficient(s: number) {
        this._matiereCoefficient = ((s !== undefined) && (s !== null) &&
            (s > 0)) ? s : 1.0;
    }
    public get uniteCoefficient(): number {
        return ((this._uniteCoefficient !== undefined) && (this._uniteCoefficient !== null) &&
            (this._uniteCoefficient > 0)) ? this._uniteCoefficient : 1.0;
    }
    public set uniteCoefficient(s: number) {
        this._uniteCoefficient = ((s !== undefined) && (s !== null) &&
            (s > 0)) ? s : 1.0;
    }
    public get etudiantid(): string {
        return (this._etudiantid !== undefined) ? this._etudiantid : null;
    }
    public set etudiantid(s: string) {
        this._etudiantid = (s !== undefined) ? s : null;
    }
    public get coefficient(): number {
        return (this._coefficient !== undefined) ? this._coefficient : null;
    }
    public set coefficient(s: number) {
        this._coefficient = (s !== undefined) ? s : null;
    }
    public get etudaffectationid(): string {
        return (this._etudaffectationid !== undefined) ? this._etudaffectationid : null;
    }
    public set etudaffectationid(s: string) {
        this._etudaffectationid = (s !== undefined) ? s : null;
    }
    public get groupeEventName(): string {
        return (this._groupeEventName !== undefined) ? this._groupeEventName : null;
    }
    public set groupeEventName(s: string) {
        this._groupeEventName = (s !== undefined) ? s : null;
    }
    public get groupeeventid(): string {
        return (this._groupeeventid !== undefined) ? this._groupeeventid : null;
    }
    public set groupeeventid(s: string) {
        this._groupeeventid = (s !== undefined) ? s : null;
    }
    public from_map(oMap: any): void {
        super.from_map(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.order !== undefined) {
                this.order = oMap.order;
            }
            if (oMap.groupeeventid !== undefined) {
                this.groupeeventid = oMap.groupeeventid;
            }
            if (oMap.note !== undefined) {
                this.note = oMap.note;
            }
            if (oMap.groupeEventName !== undefined) {
                this.groupeEventName = oMap.groupeEventName;
            }
            if (oMap.etudaffectationid !== undefined) {
                this.etudaffectationid = oMap.etudaffectationid;
            }
            if (oMap.coefficient !== undefined) {
                this.coefficient = oMap.coefficient;
            }
            if (oMap.etudiantid !== undefined) {
                this.etudiantid = oMap.etudiantid;
            }
            if (oMap.matiereCoefficient !== undefined) {
                this.matiereCoefficient = oMap.matiereCoefficient;
            }
            if (oMap.uniteCoefficient !== undefined) {
                this.uniteCoefficient = oMap.uniteCoefficient;
            }
        } // oMap
    }
    public to_map(oMap: any): void {
        super.to_map(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            oMap.groupeeventid = this.groupeeventid;
            oMap.note = this.note;
            oMap.groupeEventName = this.groupeEventName;
            oMap.etudaffectationid = this.etudaffectationid;
            oMap.coefficient = this.coefficient;
            oMap.etudiantid = this.etudiantid;
            oMap.matiereCoefficient = this.matiereCoefficient;
            oMap.uniteCoefficient = this.uniteCoefficient;
            oMap.order = this.order;
        }
    } // toInsertMap
    public is_storeable(): boolean {
        return super.is_storeable() && (this.groupeeventid !== null) &&
            (this.etudaffectationid !== null) && (this.genre !== null) &&
            (this.etudiantid !== null);
    }
    //
    public get note(): number {
        return (this._note !== undefined) ? this._note : null;
    }
    public set note(s: number) {
        let d = this.check_number(s);
        if ((d !== null) && (d >= 0)) {
            this._note = d;
        } else {
            this._note = null;
        }
    }
    public get is_note(): boolean {
        return ((this._note !== undefined) && (this._note !== null) && (this._note > 0));
    }
    public update_person(pPers: IEtudiantPerson): void {
        super.update_person(pPers);
        if ((pPers !== undefined) && (pPers !== null)) {
            this.add_id_to_array(pPers.eventids, this.id);
        }// pPers
    }// update_person
    public start_key(): string {
        let s = this.base_prefix();
        if ((s !== null) && (this.groupeeventid !== null)) {
            s = s + this.groupeeventid;
        }
        return s;
    }
    public create_id(): string {
        let s = this.start_key();
        if ((s !== null) && (this.lastname !== null)) {
            s = s + this.lastname.trim().toUpperCase();
        }
        if ((s !== null) && (this.firstname !== null)) {
            s = s + this.firstname.trim().toUpperCase();
        }
        if ((s !== null) && (this.genre !== null)) {
            s = s + this.genre.trim().toUpperCase();
        }
        return s;
    } // create_id
    public type(): string {
        return ETUDEVENT_TYPE;
    }
    public base_prefix(): string {
        return ETUDEVENT_PREFIX;
    }
}// class EtudEvent
