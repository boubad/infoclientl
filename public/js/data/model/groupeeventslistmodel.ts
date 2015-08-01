//groupeeeventslistmodel.ts
//
import {InfoUserInfo} from './infouserinfo';
import {RootConsultViewModel} from './rootconsultmodel';
import {GroupeEvent} from '../domain/groupeevent';
//
export class GroupeEventListModel extends RootConsultViewModel<GroupeEvent> {
    //
    constructor(userinfo: InfoUserInfo) {
        super(userinfo);
        this.title = "Liste Devoirs";
    }// constructor
    protected is_refresh(): boolean {
        return (this.semestreid !== null) && (this.matiereid !== null) &&
		(this.groupeid !== null);
    }
    protected perform_activate(): Promise<any> {
        let self = this;
        return super.perform_activate().then((r) => {
          self.choose_departement = true;
          self.choose_annee = true;
          self.choose_semestre = true;
          self.choose_unite = true;
          self.choose_matiere = true;
          self.choose_groupe = true;
          return true;
        });
    }
    protected create_item(): GroupeEvent {
        let p = new GroupeEvent({
            annneid: this.anneeid,
            matiereid: this.matiereid,
            semestreid: this.semestreid,
            groupeid: this.groupeid,
        });
        return p;
    }// create_item
	 protected get_all_ids(): Promise<string[]> {
        return this.dataService.dm_get_semestre_matiere_groupe_grpevts_ids(this.semestreid,this.matiereid,this.groupeid);
    }// get_all_ids
    public post_change_semestre(): Promise<any> {
        return this.refreshAll();
    }
    public post_change_matiere(): Promise<any> {
        return this.refreshAll();
    }
    public post_change_groupe(): Promise<any> {
        return this.refreshAll();
    }
}// class GroupeeventsView
