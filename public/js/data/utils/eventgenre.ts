// eventgenre.ts
//
import {MenuDesc} from './menudesc';
//
export class EventGenre extends MenuDesc {
    //
	private _weight: number;
    //
    constructor(oMap?: any) {
		super(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.weight !== undefined) {
                this._weight = oMap.weight;
            }
        }// oMap
    }// constructor
    //
    public to_map(oMap: any): void {
		super.to_map(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            oMap.weight = this.weight;
        }
    }
    public from_map(oMap: any): void {
		super.from_map(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.weight !== undefined) {
                this.weight = oMap.weight;
            }
        }// oMap
    }
    //
    public get weight(): number {
        return ((this._weight !== undefined)  && (this._weight !== null) && (this.weight >= 0))
		? this._weight : 1.0;
    }
    public set weight(s: number) {
        this.weight = ((s !== undefined) && (s !== null) && (s >= 0)) ? s : 1.0;
    }
 } // class EventGenre
//
export const ETUDEVENT_TYPES:EventGenre[] = [
	new EventGenre({_id:'ABSCENCE',_text:'Absence',weight:1000}),
	new EventGenre({_id:'RETARD1',_text:'Léger retard',weight:100}),
	new EventGenre({_id:'RETARD2',_text:'Gros retard',weight:100}),
	new EventGenre({_id:'DISCIPLINE',_text:'Discipline',weight:10000}),
	new EventGenre({_id:'AUTRE',_text:'Autre',weight:5})
];
export const GROUPEEVENT_TYPES:EventGenre[] = [
	new EventGenre({_id:'TP',_text:'Travaux Pratiques',weight:1000}),
	new EventGenre({_id:'TD',_text:'Travaux Dirigés',weight:100}),
	new EventGenre({_id:'COURS',_text:'Cours Magistral',weight:100}),
	new EventGenre({_id:'CONTROLE',_text:'Contrôle',weight:10000}),
	new EventGenre({_id:'EXAM',_text:'Examen',weight:5}),
	new EventGenre({_id:'FACULT',_text:'Exercice facultatif',weight:5}),
	new EventGenre({_id:'AUTRE',_text:'Autre',weight:5})
];
export const AFFECTATION_TYPES:EventGenre[] = [
	new EventGenre({_id:'TP',_text:'Travaux Pratiques',weight:1000}),
	new EventGenre({_id:'TD',_text:'Travaux Dirigés',weight:100}),
	new EventGenre({_id:'COURS',_text:'Cours Magistral',weight:100}),
	new EventGenre({_id:'AUTRE',_text:'Autre',weight:5})
];