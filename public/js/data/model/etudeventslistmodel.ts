//etudeventslistmodel.ts
//
import {InfoUserInfo} from './infouserinfo';
import {RootConsultViewModel} from './rootconsultmodel';
import {EtudEvent} from '../domain/etudevent';
//
export class EtudEventListModel extends RootConsultViewModel<EtudEvent> {
    //
    constructor(userinfo: InfoUserInfo) {
        super(userinfo);
        this.title = "Evènements";
    }// constructor
    protected perform_activate(): Promise<any> {
        let self = this;
        return super.perform_activate().then((r) => {
          self.choose_departement = true;
            self.choose_unite = true;
            self.choose_matiere = true;
            self.choose_annee = true;
            self.choose_semestre = true;
            self.choose_groupe = true;
            return true;
        });
    }
    protected is_refresh(): boolean {
        return (this.semestreid !== null);
    }
    protected create_item(): EtudEvent {
        let p = new EtudEvent({
            annneid: this.anneeid,
            matiereid: this.matiereid,
            semestreid: this.semestreid,
            groupeid: this.groupeid
        });
        return p;
    }// create_item
    public post_change_semestre(): Promise<any> {
        return this.refreshAll();
    }
    public refreshAll(): Promise<any> {
        this.prepare_refresh();
        if (!this.is_refresh()) {
            return Promise.resolve(true);
        }
        let nc = this.itemsPerPage;
        let self = this;
        return this.dataService.dm_get_semestre_evts_ids(this.semestreid).then((ids) => {
            self.allIds = ((ids !== undefined) && (ids !== null)) ? ids : [];
            let nt = self.allIds.length;
            let np = Math.floor(nt / nc);
            if ((np * nc) < nt) {
                ++np;
                self.pagesCount = np;
            }
            return self.refresh();
        });
    }// refreshAll
}// class GroupeeventsView
