//infobaseview.ts
//
import {InfoRootElement} from './inforootelement';
import {InfoUserInfo} from './infouserinfo';
import {EtudAffectation} from '../domain/etudaffectation';
import {IEtudEvent,IEtudAffectation,IGroupe} from 'infodata';
//
export class InfoBaseView extends InfoRootElement {
    //
    public choose_departement: boolean;
    public choose_annee: boolean;
    public choose_semestre: boolean;
    public choose_unite: boolean;
    public choose_matiere: boolean;
    public choose_groupe: boolean;
    //
    constructor(userinfo: InfoUserInfo) {
        super(userinfo);
        this.my_reset();
    }
    private my_reset(): void {
        this.choose_departement = false;
        this.choose_annee = false;
        this.choose_semestre = false;
        this.choose_unite = false;
        this.choose_matiere = false;
        this.choose_groupe = false;
    }
	protected get_tp_affectation(semid:string, grpid: string): Promise<IEtudAffectation[]> {
		let model = new EtudAffectation({
			semestreid:semid,
			groupeid: grpid
		});
        let self = this;
        return this.dataService.dm_get_items(model.start_key(), model.end_key()).then((aa: IEtudAffectation[]) => {
            let rr = ((aa !== undefined) && (aa !== null)) ? aa : [];
            return self.retrieve_avatars(rr);
        }).then((ff: IEtudAffectation[]) => {
            return ff;
        });
	}// get_tp_affectation
	protected get_groupe_etudaffectations(g:IGroupe, semid:string): Promise<IEtudAffectation[]>{
		let oRet: IEtudAffectation[] = [];
		if ((g === undefined) || (g === null) || (semid === undefined) || (semid === null)){
			return Promise.resolve(oRet);
		}
		let self = this;
		return g.get_tp_ids(this.dataService).then((ids)=>{
			let pp: Promise<IEtudAffectation[]>[] = [];
			if ((ids !== undefined) && (ids !== null)) {
				for (let id of ids) {
					let p = self.get_tp_affectation(semid,id);
					pp.push(p);
				}
			}
			return Promise.all(pp);
		}).then((dd)=>{
			for (let xx of dd) {
				for (let x of xx) {
					oRet.push(x);
				}
			}// xx
			if (oRet.length > 1) {
				let a = oRet[0];
				let pf = a.sort_func;
				if ((pf !== undefined) && (pf !== null)) {
					oRet.sort(pf);
				}
			}
			return oRet;
		});
	}//groupe_etudaffectations
    protected perform_activate(): Promise<any> {
        this.my_reset();
        return Promise.resolve(true);
    }
    public activate(params?: any, config?: any, instruction?: any): any {
        this.perform_attach();
        return Promise.resolve(true);
    }// activate
    public deactivate(): any {
        this.perform_detach();
    }
    protected filter_etudevents(init: IEtudEvent[]): IEtudEvent[] {
        let oRet: IEtudEvent[] = [];
        if ((init === undefined) || (init === null)) {
            return oRet;
        }
        if (this.is_etud) {
            let id = this.personid;
            for (let x of init) {
                if (x.personid == id) {
                    oRet.push(x);
                }
            }// x
        } else {
            oRet = init;
        }
        return oRet;
    }//filter_etudevents
}// class InfoUserInfo
