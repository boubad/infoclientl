//infobaseview.ts
//
import {InfoRootElement} from './inforootelement';
import {InfoUserInfo} from './infouserinfo';
import {IEtudEvent} from 'infodata';
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
    protected filter_etudevents(init:IEtudEvent[]) : IEtudEvent[] {
      let oRet:IEtudEvent[] = [];
      if ((init === undefined) || (init === null)){
        return oRet;
      }
      if (this.is_etud){
        let id = this.personid;
        for (let x of init){
          if (x.personid == id){
            oRet.push(x);
          }
        }// x
      }
      return oRet;
    }//filter_etudevents
}// class InfoUserInfo
