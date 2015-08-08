//groupemodel.ts
import {InfoUserInfo} from './infouserinfo';
import {DepSigleNameViewModel} from './depsiglenamemodel';
import {Groupe} from '../domain/groupe';
import {EventGenre} from '../utils/eventgenre';
import {IGroupe} from 'infodata';
import {GROUPE_GENRE_COURS, GROUPE_GENRE_TD, GROUPE_GENRE_TP} from '../utils/infoconstants';

//
export class GroupeModel extends DepSigleNameViewModel<Groupe> {
	//
	private _allGenre: EventGenre;
	public leftGroupes: IGroupe[];
	public rightGroupes: IGroupe[];
	public selectedRight: IGroupe[];
	public selectedLeft: IGroupe[];
	private _allgroupes: IGroupe[];
	//
    constructor(userinfo: InfoUserInfo) {
        super(userinfo);
        this.title = 'Groupes';
		this._allGenre = this.affectationTypes[0];
		this.leftGroupes = [];
		this.selectedLeft = [];
		this.rightGroupes = [];
		this.selectedRight = [];
		this._allgroupes = [];
    }// constructor
	public get canAddChildren(): boolean {
		return (this.selectedLeft.length > 0);
	}
	public get canRemoveChildren(): boolean {
		return (this.selectedRight.length > 0);
	}
	public get canHaveChildren(): boolean {
		return (this.allGenre.id != GROUPE_GENRE_TP);
	}
	public get allGenre(): EventGenre {
		return this._allGenre;
	}
	public get hasCandidates(): boolean {
		return (this.leftGroupes.length > 0);
	}
	public get hasChildren(): boolean {
		return (this.rightGroupes.length > 0);
	}
	public set allGenre(s: EventGenre) {
		this._allGenre = ((s !== undefined) && (s !== null)) ? s : this.affectationTypes[0];
		if (this.currentItem !== null) {
			if (this.currentItem.rev == null) {
				this.currentItem.genre = this._allGenre.id;
				this.refresh_children();
			}
		}
	}
	public add_children(): void {
		if (this.currentItem == null) {
			return;
		}
		for (let x of this.selectedLeft) {
			this.currentItem.add_child_groupe(x);
		}
		this.refresh_children();
	}// addChildren
	public remove_children(): void {
		if (this.currentItem == null) {
			return;
		}
		let oRet: string[] = [];
		let xx: IGroupe[] = this.selectedRight;
		for (let x of this.currentItem.childrenids) {
			let bFound: boolean = false;
			for (let z of xx) {
				if (z.id == x) {
					bFound = true;
					break;
				}
			}
			if (!bFound) {
				oRet.push(x);
			}
		}
		this.currentItem.childrenids = oRet;
		this.refresh_children();
	}
	protected filter_groupes(genre: string): IGroupe[] {
		let oRet: IGroupe[] = [];
		for (let x of this._allgroupes) {
			let sg = x.genre;
			if (sg !== genre) {
				if ((genre == GROUPE_GENRE_COURS) && (sg == GROUPE_GENRE_TD)) {
					oRet.push(x);
				} else if ((genre == GROUPE_GENRE_TD) && (sg == GROUPE_GENRE_TP)) {
					oRet.push(x);
				}
			}// sg
		}// x
		return oRet;
	}// filter_groupes
	protected refresh_children(): void {
		this.leftGroupes = [];
		this.selectedLeft = [];
		this.rightGroupes = [];
		this.selectedRight = [];
		let genre: string = null;
		if (this.currentItem !== null) {
			if (this.currentItem.rev !== null) {
				genre = this.currentItem.genre;
			}
		}
		if (genre == null) {
			if ((this.allGenre === undefined) || (this.allGenre === null)) {
				this._allGenre = this.affectationTypes[0];
			}
			genre = this._allGenre.id;
		}
		let candidates: IGroupe[] = this.filter_groupes(genre);
		let id: string = (this.currentItem !== null) ? this.currentItem.id : null;
		let old: string[] = (this.currentItem !== null) ? this.currentItem.childrenids : [];
		for (let x of candidates) {
			if (x.id != id) {
				let bFound: boolean = false;
				for (let y of old) {
					if (x.id == y) {
						bFound = true;
						break;
					}
				}
				if (!bFound) {
					this.leftGroupes.push(x);
				} else {
					this.rightGroupes.push(x);
				}
			}// xg
		}// x
	}// refresh_children
	protected post_change_item(): Promise<any> {
        let self = this;
		return super.post_change_item().then((r) => {
			let p: EventGenre = null;
			let xg = (this.currentItem !== null) ? this.currentItem.genre : GROUPE_GENRE_TP;
			for (let x of self.affectationTypes) {
				if (x.id == xg) {
					p = x;
					break;
				}
			}
			self.allGenre = p;
			self.refresh_children();
			return true;
		});
    }// post_change_item
	public refreshAll(): Promise<any> {
		let self = this;
		return super.refreshAll().then((r) => {
			return self.dataService.dm_find_items_array(self.allIds);
		}).then((gg: IGroupe[]) => {
			self._allgroupes = self.check_array(gg);
			return true;
		})
	}
    protected create_item(): Groupe {
        return new Groupe({
			departementid: this.departementid,
			genre: ((this.allGenre !== undefined) && (this.allGenre !== null)) ? this.allGenre.id :
				GROUPE_GENRE_TP
		});
    }
}// class GroupeModel
