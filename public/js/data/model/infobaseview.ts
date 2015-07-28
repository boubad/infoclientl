//infobaseview.ts
//
import {InfoRootElement} from './inforootelement';
import {InfoUserInfo} from './infouserinfo';
//
export class InfoBaseView extends InfoRootElement {
  //
    public choose_departement:boolean = false;
    public choose_annee:boolean = false;
    public choose_semestre:boolean = false;
    public choose_unite:boolean = false;
    public choose_matiere:boolean = false;
    public choose_groupe:boolean = false;
    //
    constructor(userinfo: InfoUserInfo) {
        super(userinfo);

    }
    public activate(params?: any, config?: any, instruction?: any): any {
        this.perform_attach();
        return Promise.resolve(true);
    }// activate
    public deactivate(): any {
        this.perform_detach();
    }
}// class InfoUserInfo
