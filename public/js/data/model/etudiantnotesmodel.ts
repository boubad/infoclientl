//etudiantnotesmodel.ts
//
//
import {InfoUserInfo} from './infouserinfo';
import {BaseDetailModel} from './basedetailmodel';
import {IEtudiantPerson, IEtudEvent, IUIManager, IBaseItem, IDisplayEtudiant,
IDepartement, IAnnee, ISemestre} from 'infodata';
import {EtudiantPerson} from '../domain/etudperson';
import { MatiereDisplayEtudiantsArray, UniteDisplayEtudiantsArray} from '../utils/displayetudiant';
import {NOTE_GENRE} from '../utils/infoconstants';
//
export class EtudiantNotesModel extends BaseDetailModel {
    //
    public currentPerson: IEtudiantPerson = null;
    public evts: IEtudEvent[] = [];
    public matieresNotes: IDisplayEtudiant[];
    public unitesNotes: IDisplayEtudiant[];
    public etudiantUrl: string = null;
    public xdepartements: IDepartement[] = [];
    private _xdepartement: IDepartement = null;
    private _xannee: IAnnee = null;
    private _xsemestre: ISemestre = null;
    private _xannees: IAnnee[] = [];
    private _xsemestres: ISemestre[] = [];
    private _zannees: IAnnee[] = [];
    private _zsemestres: ISemestre[] = [];
    //
    constructor(userinfo: InfoUserInfo) {
        super(userinfo);
        this.title = "Notes Etudiant";
    }
    public get current_etudiantid():string {
      return (this.currentPerson !== null) ? this.currentPerson.id : '';
    }
    public activate(params?: any, config?: any, instruction?: any): any {
        let self = this;
        this.currentPerson = new EtudiantPerson();
        this.etudiantUrl = null;
        let service = this.dataService;
        let pPers: IEtudiantPerson = null;
        let xBlob: Blob = null;
        return super.activate(params, config, instruction).then((r) => {
            let id = (params.id !== undefined) ? params.id : null;
            if (id !== null) {
                return service.dm_find_item_by_id(id, true);
            } else {
                return Promise.resolve(pPers);
            }
        }).then((p: IEtudiantPerson) => {
            if (p !== null) {
                self.currentPerson = p;
                self.title = p.fullname;
                if ((p.id !== null) && (p.avatarid !== null)) {
                    return service.dm_find_attachment(p.id, p.avatarid);
                } else {
                    return Promise.resolve(xBlob);
                }
            } else {
                return Promise.resolve(xBlob);
            }
        }).then((blob) => {
            if ((blob !== undefined) && (blob !== null)) {
                self.etudiantUrl = self.createUrl(blob);
            }
            return self.init_etud_data();
        });
    }// activate
    protected init_etud_data(): Promise<any> {
        this.xdepartements = [];
        this._xdepartement = null;
        this._xannees = [];
        this._xannee = null;
        this._xsemestres = [];
        this._xsemestre = null;
        this._zannees = [];
        this._zsemestres = [];
        if (this.currentPerson === null){
          return Promise.resolve(true);
        }
        let self = this;
        let service = this.dataService;
        return service.dm_find_items_array(this.currentPerson.departementids).then((dd:IDepartement[])=>{
          self.xdepartements = self.check_array(dd);
          return service.dm_find_items_array(self.currentPerson.anneeids);
        }).then((aa:IAnnee[])=>{
          self._xannees = self.check_array(aa);
          return service.dm_find_items_array(self.currentPerson.semestreids);
        }).then((ss:ISemestre[])=>{
          self._xsemestres = self.check_array(ss);
          if (self.xdepartements.length > 0){
            self.xdepartement = self.xdepartements[0];
          } else {
            self.xdepartement = null;
          }
          return true;
        });

    }// initi_etud_data
    public get xsemestres():ISemestre[] {
      return ((this._zsemestres !== undefined) && (this._zsemestres !== null)) ? this._zsemestres : [];
    }
    public get xannees():IAnnee[]{
      return ((this._zannees !== undefined) && (this._zannees !== null)) ? this._zannees : [];
    }
    public get xsemestre():ISemestre {
      return (this._xsemestre !== undefined) ? this._xsemestre : null;
    }
    public set xsemestre(s:ISemestre){
      let old = (this._xsemestre !== undefined) ? this._xsemestre : null;
      let cur = (s !== undefined) ? s : null;
      if (old !== cur){
        this._xsemestre = cur;
        this.refresh_data();
      }
    }
    public get xannee():IAnnee {
      return (this._xannee !== undefined) ? this._xannee : null;
    }
    public set xannee(s:IAnnee){
      let old = (this._xannee !== undefined) ? this._xannee : null;
      let cur = (s !== undefined) ? s : null;
      if (old !== cur){
        this._xannee = cur;
        let xx:ISemestre[] = [];
        let id = (cur !== null) ? cur.id : null;
        for (let x of this._xsemestres){
          if (x.anneeid == id){
            xx.push(x);
          }
        }
        this._zsemestres = xx;
        if (this._zsemestres.length > 0){
          this.xsemestre = this._zsemestres[0];
        } else {
          this.xsemestre = null;
        }
      }
    }
    public get xdepartement():IDepartement {
      return (this._xdepartement !== undefined) ? this._xdepartement : null;
    }
    public set xdepartement(s:IDepartement){
      let old = (this._xdepartement !== undefined) ? this._xdepartement : null;
      let cur = (s !== undefined) ? s : null;
      if (old !== cur){
        this._xdepartement = cur;
        let xx:IAnnee[] = [];
        let id = (cur !== null) ? cur.id : null;
        for (let x of this._xannees){
          if (x.departementid == id){
            xx.push(x);
          }
        }
        this._zannees = xx;
        if (this._zannees.length > 0){
          this.xannee = this._zannees[0];
        } else {
          this.xannee = null;
        }
      }
    }
    protected refresh_data(): Promise<any> {
        this.evts = [];
        this.matieresNotes = [];
        this.unitesNotes = [];
        let semestreid = (this.xsemestre !== null)? this.xsemestre.id: null;
        if ((semestreid === null) || (this.currentPerson === null)) {
            return Promise.resolve(true);
        }
        let self = this;
        let service = this.dataService;
        let id = this.currentPerson.id;
        return service.dm_get_etudiant_events(id).then((xx: IEtudEvent[]) => {
            let yy: IEtudEvent[] = [];
            let oMat: MatiereDisplayEtudiantsArray = new MatiereDisplayEtudiantsArray();
            if ((xx !== undefined) && (xx !== null)) {
                for (let x of xx) {
                    if ((x.genre == NOTE_GENRE) && (x.semestreid == semestreid)) {
                        yy.push(x);
                        if (x.genre == NOTE_GENRE) {
                            oMat.add_event(x);
                        }
                    }
                }
            }
            self.evts = yy;
            self.matieresNotes = oMat.get_etudiantdisplays();
            let oUnite: UniteDisplayEtudiantsArray = new UniteDisplayEtudiantsArray();
            for (let z of self.matieresNotes) {
                oUnite.add_event(z);
            }
            self.unitesNotes = oUnite.get_etudiantdisplays();
            return true;
        });
    }// refresh_data
    protected post_change_semestre(): Promise<any> {
        return this.refresh_data();
    }
    public deactivate(): any {
        if (this.etudiantUrl !== null) {
            this.revokeUrl(this.etudiantUrl);
            this.etudiantUrl = null;
        }
        return super.deactivate();
    }
    public get hasEtudiantUrl(): boolean {
        return (this.etudiantUrl !== null);
    }
    public set hasEtudiantUrl(s: boolean) { }
    public get fullname(): string {
        return this.currentPerson.fullname;
    }
    public set fullname(s: string) { }

}// class EtudDetail
