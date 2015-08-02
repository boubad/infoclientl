//semestresreportmodel.ts
import {InfoUserInfo} from './infouserinfo';
import {RootConsultViewModel} from './rootconsultmodel';
import {EtudEvent} from '../domain/etudevent';
import {DisplayEtudiant, DisplayEtudiantsArray} from '../utils/displayetudiant';
import {IDisplayEtudiant, IEtudEvent} from 'infodata';
//
export class SemestreReportBase extends RootConsultViewModel<IDisplayEtudiant> {
    //
    private _all_data: IDisplayEtudiant[] = [];
    //
    constructor(userinfo: InfoUserInfo) {
        super(userinfo);

    }// constructor
    protected post_change_semestre(): Promise<any> {
        return this.refreshAll();
    }
    protected is_refresh(): boolean {
        return (this.semestreid !== null);
    }
    protected perform_activate(): Promise<any> {
        let self = this;
        return super.perform_activate().then((r) => {
          self.choose_departement = true;
          self.choose_annee = true;
          self.choose_semestre = true;
          return true;
        });
    }
    public activate(params?: any, config?: any, instruction?: any): any {
        let self = this;
        return super.activate(params, config, instruction).then((r) => {
            return self.refreshAll();
        });
    }// activate
    protected prepare_refresh(): void {
        super.prepare_refresh();
        this._all_data = [];
    }
    protected transform_data(pp: IEtudEvent[]): Promise<IDisplayEtudiant[]> {
        let oRet: IDisplayEtudiant[] = [];
        if ((pp !== undefined) && (pp !== null)) {
            let grp: DisplayEtudiantsArray = new DisplayEtudiantsArray();
            for (let p of pp) {
                grp.add_event(p);
            }
            oRet = grp.get_etudiantdisplays();
        }// pp
        return Promise.resolve(oRet);
    }// transformData
    protected get_initial_events(): Promise<IEtudEvent[]> {
        return Promise.resolve([]);
    }
    public refreshAll(): Promise<any> {
        this.prepare_refresh();
        if (!this.is_refresh()) {
            return Promise.resolve(true);
        }
        let nc = this.itemsPerPage;
        let self = this;
        return this.get_initial_events().then((pp: IEtudEvent[]) => {
            let xx = self.filter_etudevents(pp);
            return self.transform_data(xx);
        }).then((zz: IDisplayEtudiant[]) => {
            self._all_data = zz;
            let nt = self._all_data.length;
            let np = Math.floor(nt / nc);
            if ((np * nc) < nt) {
                ++np;
                self.pagesCount = np;
            }
            return self.refresh();
        });
        return Promise.resolve(true);
    }// refreshAll
    public refresh(): Promise<any> {
        this.clear_error();
        this.items = [];
        if (!this.is_refresh()) {
            return Promise.resolve(true);
        }
        let nbItems = this._all_data.length;
        let nc = this.itemsPerPage;
        let istart = (this.currentPage - 1) * nc;
        if ((istart < 0) && (istart >= nbItems)) {
            return Promise.resolve(true);
        }
        let iend = istart + nc - 1;
        if (iend >= nbItems) {
            iend = nbItems - 1;
        }
        if ((iend < 0) && (iend >= nbItems)) {
            return Promise.resolve(true);
        }
        let oRet: IDisplayEtudiant[] = [];
        let i = istart;
        while (i <= iend) {
            let p = this._all_data[i++];
            oRet.push(p);
        }// i
        let self = this;
        return this.retrieve_avatars(oRet).then((pp: IDisplayEtudiant[]) => {
            self.items = pp;
            return true;
        })
    }// refresh

}// class BaseEditViewModel
