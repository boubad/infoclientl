//noteitem.ts
//
import {IPerson, IEventItem, INoteItem, INoteItemMap, IEtudEvent} from 'infodata';
import {MyMap} from './mymap';
import {EventItemMap} from './eventitem';
import {NOTE_GENRE, ETUDDETAIL_ROUTE, GRPEVTDETAIL_ROUTE, ETUDEVTDETAIL_ROUTE} from './infoconstants';
//
const SGENRE: string = NOTE_GENRE.trim().toUpperCase();
//
export class NoteItem implements INoteItem {
    //
    private _name: string;
    private _ref: string;
    private _route: string;
    private _count: number;
    private _sumdata: number;
    private _sumcoefs: number;
    private _note: number;
	private _parentid: string;
    //
    constructor(xname?: string, xroute?: string, xref?: string, par?: string) {
		if ((par !== undefined) && (par !== null)) {
			this._parentid = par;
		}
        if ((xname !== undefined) && (xname !== null) && (xname.trim().length > 0)) {
            this._name = xname;
        }
        if ((xroute !== undefined) && (xroute !== null) && (xroute.trim().length > 0)) {
            this._route = xroute;
        }
        if ((xref !== undefined) && (xref !== null) && (xref.trim().length > 0)) {
            this._ref = xref;
        }
        this._count = 0;
        this._sumcoefs = 0;
        this._sumdata = 0;
        this._note = null;
    }// constructor
	//
	public get parentid(): string {
		return (this._parentid !== undefined) ? this._parentid : null;
	}
    //
    public get name(): string {
        return ((this._name !== undefined) && (this._name !== null) &&
            (this._name.trim().length > 0)) ? this._name.trim() : null;
    }
    public get route(): string {
        return ((this._route !== undefined) && (this._route !== null) &&
            (this._route.trim().length > 0)) ? this._route.trim() : null;
    }
    public get refer(): string {
        return ((this._ref !== undefined) && (this._ref !== null) &&
            (this._ref.trim().length > 0)) ? this._ref.trim() : null;
    }
    public get has_route(): boolean {
        return (this.route !== null) && (this.refer !== null);
    }
    public get has_not_route(): boolean {
        return (!this.has_route);
    }
    //
    public get count(): number {
        return (this._count > 0) ? this._count : null;
    }
    public get note(): number {
        return ((this._note !== undefined) && (this._note !== null) && (this.count > 0)) ?
            this._note : null;
    }
    public get coefficient(): number {
        return ((this._sumcoefs !== undefined) && (this._sumcoefs !== null) &&
            (this._sumcoefs > 0)) ? this._sumcoefs : null;
    }
    //
    public reset(): void {
        this._count = 0;
        this._sumcoefs = 0;
        this._sumdata = 0;
        this._note = null;
    }//reset
    public add(n: number, c?: number): void {
        if ((n !== undefined) && (n !== null) && (n >= 0.0)) {
            let cc = ((c !== undefined) && (c !== null) && (c > 0.0)) ? c : 1.0;
            this._sumdata = this._sumdata + (n * cc);
            this._sumcoefs = this._sumcoefs + cc;
            this._count = this._count + 1;
            this._note = this._sumdata / this._sumcoefs;
        }// n
    }// add
}// class NoteItem
export class NoteItemMap implements INoteItemMap {
    private _name: string;
    private _route: string;
    private _notesMap: MyMap<string, NoteItem>;
    //
    constructor(xname?: string, xroute?: string) {
        this._name = xname;
        this._route = xroute;
        this._notesMap = new MyMap<string, NoteItem>();
    }// constructor
	public has(key: string): boolean {
		return this._notesMap.has(key);
	}
	public get name(): string {
        return ((this._name !== undefined) && (this._name !== null) &&
            (this._name.trim().length > 0)) ? this._name.trim() : null;
    }
    public get route(): string {
        return ((this._route !== undefined) && (this._route !== null) &&
            (this._route.trim().length > 0)) ? this._route.trim() : null;
	}
    public get_values(): NoteItem[] {
        let oRet: NoteItem[] = [];
        this._notesMap.forEach((val, index) => {
            oRet.push(val);
        });
        return oRet;
    }// get_values
    public add(item: string, n: number, c?: number, xref?: string, par?: string): void {
		if ((item !== undefined) && (item !== null)) {
            let xi: NoteItem = null;
            if (!this._notesMap.has(item)) {
                xi = new NoteItem(item, this._route, xref, par);
                this._notesMap.set(item, xi);
            } else {
                xi = this._notesMap.get_val(item);
            }
			if ((n !== undefined) && (n !== null) && (n >= 0.0)) {
				xi.add(n, c);
			}
        }// item
    }// add
}// NoteItemMap
//
export class EtudiantSummary {
	//
	private _etudRoute: string;
	private _grpEventRoute: string;
	private _personid: string;
	private _fullname: string;
	private _avatarid: string;
	private _url: string;
	//
	private _anneesIds: MyMap<string, string>;
	private _anneesSigles: MyMap<string, string>;
	private _matieresCoefs: MyMap<string, MyMap<string, number>>;
	private _unitesCoefs: MyMap<string, MyMap<string, number>>;
	private _matieresSigles: MyMap<string, MyMap<string, string>>;
	private _unitesSigles: MyMap<string, MyMap<string, string>>;
	//
	private _semestreEvents: MyMap<string, EventItemMap>;
	private _detailNotes: MyMap<string, NoteItemMap>;
	private _matieresNotes: MyMap<string, NoteItemMap>;
	private _unitesNotes: MyMap<string, NoteItemMap>;
	private _totalNotes: MyMap<string, NoteItem>;
	private _semestreids: string[];
	//
	constructor(pPers?: IPerson, etud?: string, grp?: string) {
		if ((pPers !== undefined) && (pPers !== null)) {
			this._personid = pPers.id;
			this._fullname = pPers.fullname;
			this._avatarid = pPers.avatarid;
			this._url = pPers.url;
		} else {
			this._personid = null;
			this._fullname = null;
			this._avatarid = null;
			this._url = null;
		}
	}// constructor
	//
	public get semestreids(): string[] {
		if ((this._semestreids !== undefined) && (this._semestreids !== null)) {
			this._semestreids = [];
		}
		return this._semestreids;
	}// semestreids
	//
	public reset(): void {
		this._semestreids = null;
		this._anneesIds = null;
		this._anneesSigles = null;
		this._matieresCoefs = null;
		this._unitesCoefs = null;
		this._matieresSigles = null;
		this._unitesSigles = null;
		//
		this._semestreEvents = null;
		this._detailNotes = null;
		this._matieresNotes = null;
		this._unitesNotes = null;
		this._totalNotes = null;
	}// reset
	//
	public add_events(evts: IEtudEvent[]): void {
		if ((evts !== undefined) && (evts !== null)) {
			for (let x of evts) {
				this.add_event(x);
			}
		}
	}
	//
	public add_event(evt: IEtudEvent): void {
		if ((this._personid === null) || (evt === undefined) || (evt === null)) {
			return;
		}
		let anneeid = evt.anneeid;
		let anneeSigle = evt.anneeSigle;
		if ((anneeid === undefined) || (anneeid === null) || (anneeSigle === undefined) ||
			(anneeSigle === null)) {
			return;
		}
		if ((evt.semestreid === undefined) || (evt.semestreid === null)) {
			return;
		}
		let semid = evt.semestreid;
		if (evt.personid != this._personid) {
			return;
		}
		if ((evt.genre === undefined) || (evt.genre === null)) {
			return;
		}
		if ((this._semestreids === undefined) || (this._semestreids === null)) {
			this._semestreids = [];
		}
		let bFound = false;
		for (let x of this._semestreids) {
			if (x == semid) {
				bFound = true;
				break;
			}
		}
		if (!bFound) {
			this._semestreids.push(semid);
		}
		if ((this._anneesIds === undefined) || (this._anneesIds === null)) {
			this._anneesIds = new MyMap<string, string>();
		}
		if (!this._anneesIds.has(semid)) {
			this._anneesIds.set(semid, anneeid);
		}
		if ((this._anneesSigles === undefined) || (this._anneesSigles === null)) {
			this._anneesSigles = new MyMap<string, string>();
		}
		if (!this._anneesSigles.has(anneeid)) {
			this._anneesSigles.set(anneeid, anneeSigle);
		}
		let genre = evt.genre.trim().toUpperCase();
		if (genre != SGENRE) {
			if ((this._semestreEvents === undefined) || (this._semestreEvents === null)) {
				this._semestreEvents = new MyMap<string, EventItemMap>();
			}
			let m: EventItemMap = null;
			if (!this._semestreEvents.has(semid)) {
				m = new EventItemMap(semid);
				this._semestreEvents.set(semid, m);
			} else {
				m = this._semestreEvents.get_val(semid);
			}
			m.add(evt.genre);
			return;
		}
		let n = evt.note;
		if ((n === undefined) || (n === null) || (n < 0.0)) {
			return;
		}
		let matiereid = evt.matiereid;
		if ((matiereid === undefined) || (matiereid === null)) {
			return;
		}
		let matierecoef = evt.matiereCoefficient;
		if ((matierecoef === undefined) || (matierecoef === null) || (matierecoef <= 0.0)) {
			return;
		}
		let uniteid = evt.uniteid;
		if ((uniteid === undefined) || (uniteid === null)) {
			return;
		}
		let unitecoef = evt.uniteCoefficient;
		if ((unitecoef === undefined) || (unitecoef === null) || (unitecoef <= 0.0)) {
			return;
		}
		let matiereSigle = evt.matiereSigle;
		if ((matiereSigle === undefined) || (matiereSigle === null)) {
			return;
		}
		let uniteSigle = evt.uniteSigle;
		if ((uniteSigle === undefined) || (uniteSigle === null)) {
			return;
		}
		let grpid = evt.groupeeventid;
		if ((grpid === undefined) || (grpid === null)) {
			return;
		}
		let grpName = evt.groupeEventName;
		if ((grpName === undefined) || (grpName === null)) {
			return;
		}
		let c: number = (evt.coefficient !== null) ? evt.coefficient : 1.0;
		//
		if ((this._matieresCoefs === undefined) || (this._matieresCoefs == null)) {
			this._matieresCoefs = new MyMap<string, MyMap<string, number>>();
		}
		if ((this._matieresSigles === undefined) || (this._matieresSigles == null)) {
			this._matieresSigles = new MyMap<string, MyMap<string, string>>();
		}
		let mc1: MyMap<string, number> = null;
		if (this._matieresCoefs.has(semid)) {
			mc1 = this._matieresCoefs.get_val(semid);
			if (!mc1.has(matiereid)) {
				mc1.set(matiereid, matierecoef);
			}
		} else {
			mc1 = new MyMap<string, number>();
			mc1.set(matiereid, matierecoef);
			this._matieresCoefs.set(semid, mc1);
		}
		if (this._matieresSigles.has(semid)) {
			let mx = this._matieresSigles.get_val(semid);
			if (!mx.has(matiereid)) {
				mx.set(matiereid, matiereSigle);
			}
		} else {
			let mx = new MyMap<string, string>();
			mx.set(matiereid, matiereSigle);
			this._matieresSigles.set(semid, mx);
		}
		//
		if ((this._unitesCoefs === undefined) || (this._unitesCoefs == null)) {
			this._unitesCoefs = new MyMap<string, MyMap<string, number>>();
		}
		if ((this._unitesSigles === undefined) || (this._unitesSigles == null)) {
			this._unitesSigles = new MyMap<string, MyMap<string, string>>();
		}
		let mc2: MyMap<string, number> = null;
		if (this._unitesCoefs.has(semid)) {
			mc2 = this._unitesCoefs.get_val(semid);
			if (!mc2.has(uniteid)) {
				mc2.set(uniteid, unitecoef);
			}
		} else {
			mc2 = new MyMap<string, number>();
			mc2.set(uniteid, unitecoef);
			this._unitesCoefs.set(semid, mc2);
		}
		if (this._unitesSigles.has(semid)) {
			let mx = this._unitesSigles.get_val(semid);
			if (!mx.has(uniteid)) {
				mx.set(uniteid, uniteSigle);
			}
		} else {
			let mx = new MyMap<string, string>();
			mx.set(uniteid, uniteSigle);
			this._unitesSigles.set(semid, mx);
		}
		//
		if ((this._detailNotes === undefined) || (this._detailNotes === null)) {
			this._detailNotes = new MyMap<string, NoteItemMap>();
		}
		if (this._detailNotes.has(semid)) {
			let v = this._detailNotes.get_val(semid);
			v.add(grpName, n, c, grpid);
		} else {
			let v = new NoteItemMap(semid, this._grpEventRoute);
			this._detailNotes.set(semid, v);
			v.add(grpName, n, c, grpid);
		}
		//
		if ((this._matieresNotes === undefined) || (this._matieresNotes === null)) {
			this._matieresNotes = new MyMap<string, NoteItemMap>();
		}
		if (this._matieresNotes.has(semid)) {
			let v = this._matieresNotes.get_val(semid);
			v.add(matiereSigle, n, c, matiereid, uniteid);
		} else {
			let v = new NoteItemMap(semid);
			this._matieresNotes.set(semid, v);
			v.add(matiereSigle, n, c, matiereid);
		}
	}// add_event
	public compute_unites_notes(): void {
		this._unitesNotes = new MyMap<string, NoteItemMap>();
		if ((this._matieresNotes === undefined) || (this._matieresNotes === null)) {
			return;
		}
		let self = this;
		this._matieresNotes.forEach((map: NoteItemMap, semestreid: string) => {
			let ss = self._unitesSigles.get_val(semestreid);
			let sc = self._matieresCoefs.get_val(semestreid);
			let mm = new NoteItemMap(semestreid);
			self._unitesNotes.set(semestreid, mm);
			let mx = map.get_values();
			for (let nx of mx) {
				let matiereid = nx.refer;
				let matierecoef = sc.get_val(matiereid);
				let uniteid = nx.parentid;
				let uniteSigle = ss.get_val(uniteid);
				let n = nx.note;
				mm.add(uniteSigle, n, matierecoef, uniteid);
			}// nx
		});
	}// compute_unites_notes
	public compute_total_notes(): void {
		this._totalNotes = new MyMap<string, NoteItem>();
		if ((this._unitesNotes === undefined) || (this._unitesNotes === null)) {
			this.compute_unites_notes();
		}
		let self = this;
		this._unitesNotes.forEach((map: NoteItemMap, semestreid: string) => {
			let sc = self._unitesCoefs.get_val(semestreid);
			let anneeid = self._anneesIds.get_val(semestreid);
			let anneeSigle = self._anneesSigles.get_val(anneeid);
			let mm = new NoteItem(anneeSigle);
			self._totalNotes.set(anneeid, mm);
			let mx = map.get_values();
			for (let nx of mx) {
				let uniteid = nx.refer;
				let coef = sc.get_val(uniteid);
				let n = nx.note;
				mm.add(n, coef);
			}// nx
		});
	}// compute_unites_notes
	public get_devoirs_notes(semestreid: string): NoteItem[] {
		let oRet: NoteItem[];
		if ((semestreid === undefined) || (semestreid === null)) {
			return oRet;
		}
		if ((this._detailNotes === undefined) || (this._detailNotes === null)) {
			return oRet;
		}
		if (this._detailNotes.has(semestreid)) {
			let v = this._detailNotes.get_val(semestreid);
			oRet = v.get_values();
		}
		return oRet;
	}// get_devoirs_notes
	public get_matieres_notes(semestreid: string): NoteItem[] {
		let oRet: NoteItem[];
		if ((semestreid === undefined) || (semestreid === null)) {
			return oRet;
		}
		if ((this._matieresNotes === undefined) || (this._matieresNotes === null)) {
			return oRet;
		}
		if (this._matieresNotes.has(semestreid)) {
			let v = this._matieresNotes.get_val(semestreid);
			oRet = v.get_values();
		}
		return oRet;
	}// get_matieres_notes
	public get_unites_notes(semestreid: string): NoteItem[] {
		let oRet: NoteItem[];
		if ((semestreid === undefined) || (semestreid === null)) {
			return oRet;
		}
		if ((this._unitesNotes === undefined) || (this._unitesNotes === null)) {
			this.compute_unites_notes();
		}
		if (this._unitesNotes.has(semestreid)) {
			let v = this._unitesNotes.get_val(semestreid);
			oRet = v.get_values();
		}
		return oRet;
	}// get_unites_notes
	public get_total_notes(): NoteItem[] {
		let oRet: NoteItem[];
		if ((this._totalNotes === undefined) || (this._totalNotes === null)) {
			this.compute_total_notes();
		}
		this._totalNotes.forEach((val, index) => {
            oRet.push(val);
        });
		return oRet;
	}// get_unites_notes
}// class EtudiantSummary
