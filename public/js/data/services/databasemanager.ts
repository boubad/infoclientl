//databasemanager.ts
import {DesignDatabase} from './pouchdb/designdatabase';
import {ItemFactory} from '../domain/itemfactory';
import {Departement} from '../domain/departement';
import {Matiere} from '../domain/matiere';
import {Semestre} from '../domain/semestre';
import {Annee} from '../domain/annee';
import {Unite} from '../domain/unite';
import {Groupe} from '../domain/groupe';
import {Person} from '../domain/person';
import {EtudAffectation} from '../domain/etudaffectation';
import {EtudEvent} from '../domain/etudevent';
import {IPouchDoc,IBaseItem, IItemFactory,IEtudAffectation,IEtudEvent,
  IProfAffectation, IGroupeEvent,
  IDepartement,IAnnee,IUnite,IMatiere,ISemestre,IGroupe,
  IPerson, IDatabaseManager} from 'infodata';
//
export class DatabaseManager extends DesignDatabase implements IDatabaseManager {
    private _fact: IItemFactory;
    //
    constructor(name?: string) {
        super(name);
    }
    public get itemFactory(): IItemFactory {
        if ((this._fact === undefined) || (this._fact === null)) {
            this._fact = new ItemFactory();
        }
        return this._fact;
    }
    //
    public dm_get_all_departements(): Promise<IDepartement[]> {
        let model = new Departement();
        return this.dm_get_items(model.start_key(),model.end_key()).then((rr: IDepartement[]) => {
            return rr;
        });
    }
    public dm_get_unite_matieres(uniteid: string): Promise<IMatiere[]> {
        if ((uniteid === undefined) || (uniteid === null)) {
            return Promise.resolve([]);
        }
        let m = new Matiere({ uniteid: uniteid });
        return this.dm_get_items(m.start_key(),m.end_key()).then((rr: IMatiere[]) => {
            return rr;
        });
    }// get_unite_matieres
    public dm_get_annee_semestres(anneeid: string): Promise<ISemestre[]> {
        if ((anneeid === undefined) || (anneeid === null)) {
            return Promise.resolve([]);
        }
        let m = new Semestre({ anneeid: anneeid });
        return this.dm_get_items(m.start_key(),m.end_key()).then((rr: ISemestre[]) => {
            return rr;
        });
    }// get_annee_semestres
    public dm_get_departement_annees(depid: string): Promise<IAnnee[]> {
        if ((depid === undefined) || (depid === null)) {
            return Promise.resolve([]);
        }
        let m = new Annee({ departementid: depid });
        return this.dm_get_items(m.start_key(),m.end_key()).then((rr: IAnnee[]) => {
            return rr;
        });
    }// get_departement_annees
    public dm_get_departement_unites(depid: string): Promise<IUnite[]> {
        if ((depid === undefined) || (depid === null)) {
            return Promise.resolve([]);
        }
        let m = new Unite({ departementid: depid });
        return this.dm_get_items(m.start_key(),m.end_key()).then((rr: IUnite[]) => {
            return rr;
        });
    }// get_departement_unites
    public dm_get_departement_groupes(depid: string): Promise<IGroupe[]> {
        if ((depid === undefined) || (depid === null)) {
            return Promise.resolve([]);
        }
        let m = new Groupe({ departementid: depid });
        return this.dm_get_items(m.start_key(),m.end_key()).then((rr: IGroupe[]) => {
            return rr;
        });
    }// get_departement_groupes
    public dm_get_person_departements(personid: string): Promise<IDepartement[]> {
        if ((personid === undefined) || (personid === null)) {
            return Promise.resolve([]);
        }
        let self = this;
        let cont: string[] = null;
        let xPers: IPerson = null;
        return this.dm_find_item_by_id(personid).then((pPers: IPerson) => {
            if ((pPers === null) || (pPers === null)) {
                cont = [];
            } else {
                cont = pPers.departementids;
            }
            xPers = pPers;
            return self.dm_find_items_array(cont);
        }).then((dd) => {
            if ((xPers !== null) && xPers.is_super) {
                let model = new Departement();
                return self.dm_get_items(model.start_key(),model.end_key());
            } else {
                return dd;
            }
        }).then((r: IDepartement[]) => {
            return r;
        }).catch((err) => {
            return [];
        });
    }// get_person_departements

    public dm_get_etudaffectations(semestreid: string, groupeid: string): Promise<IEtudAffectation[]> {
        if ((semestreid === undefined) || (semestreid === null) ||
            (groupeid === undefined) || (groupeid === null)) {
            return Promise.resolve([]);
        }
        let model = new EtudAffectation({ semestreid: semestreid, groupeid: groupeid });
        return this.dm_get_items(model.start_key(),model.end_key()).then((rr: IEtudAffectation[]) => {
            return rr;
        });
    }//get_etudaffectations
    public dm_get_groupeevent_evts(grpeventid: string, bNote?: boolean): Promise<IEtudEvent[]> {
        if ((grpeventid === undefined) || (grpeventid === null)) {
            Promise.resolve([]);
        }
        let model = new EtudEvent({ groupeeventid: grpeventid });
        let m = ((bNote !== undefined) && (bNote !== null)) ? bNote : false;
        return this.dm_get_items(model.start_key(),model.end_key()).then((aa: IEtudEvent[]) => {
            let pp: IEtudEvent[] = ((aa !== undefined) && (aa !== null)) ? aa : [];
            let oRet: IEtudEvent[] = [];
            for (let x of pp) {
                if (m) {
                    if (x.genre == 'note') {
                        oRet.push(x);
                    }
                } else if (x.genre != 'note') {
                    oRet.push(x);
                }
            }// x
            return oRet;
        });
    }//get_groupeevent_evts
    public dm_get_groupeevent_all_notes(grpeventid: string): Promise<IEtudEvent[]> {
        if ((grpeventid === undefined) || (grpeventid === null)) {
            Promise.resolve([]);
        }
        let self = this;
        let depid: string = null;
        let anneeid: string = null;
        let uniteid: string = null;
        let semestreid: string = null;
        let groupeid: string = null;
        let eventDate: Date = null;
        let allevts: IEtudEvent[] = [];
        let xgenre: string = 'note';
        return this.dm_find_item_by_id(grpeventid).then((gvt: IGroupeEvent) => {
            if ((gvt === undefined) || (gvt === null)) {
                Promise.reject(new Error('Unknown groupeevent.'));
            }
            eventDate = gvt.eventDate;
            return self.dm_find_item_by_id(gvt.profaffectationid);
        }).then((praff: IProfAffectation) => {
            if ((praff === undefined) || (praff === null)) {
                Promise.reject(new Error('Unkown profaffectation'));
            }
            groupeid = praff.groupeid;
            semestreid = praff.semestreid;
            anneeid = praff.anneeid;
            depid = praff.departementid;
            let model = new EtudAffectation({
                semestreid: semestreid,
                groupeid: groupeid, anneeid: anneeid,
                departementid: depid

            });
            return self.dm_get_items(model.start_key(),model.end_key());
        }).then((affs: IEtudAffectation[]) => {
            let cont = ((affs !== undefined) && (affs !== null)) ?
                affs : [];
            for (let xaf of affs) {
                let x = new EtudEvent({
                    departementid: depid,
                    anneeid: anneeid,
                    semestreid: semestreid,
                    groupeid: groupeid,
                    personid: xaf.personid,
                    etudiantid: xaf.etudiantid,
                    etudaffectationid: xaf.id,
                    firstname: xaf.firstname,
                    lastname: xaf.lastname,
                    groupeeventid: grpeventid,
                    eventDate: eventDate,
                    genre: xgenre
                });
                allevts.push(x);
            }// xaff
            return self.dm_get_groupeevent_evts(grpeventid, true);
        }).then((pp: IEtudEvent[]) => {
            for (let y of allevts) {
                let xid = y.personid;
                for (let z of pp) {
                    if ((z.genre == xgenre) && (z.personid == xid)) {
                        y.id = z.id;
                        y.rev = z.rev;
                        y.status = z.status;
                        y.note = z.note;
                        y.attachments = z.attachments;
                        break;
                    }
                }// z
            }// y
            return allevts;
        });
    }//check_groupeevent_events
    //
    public dm_find_attachment(docid: string, attachmentId: string) : Promise<Blob>{
      return this.find_attachment(docid,attachmentId);
    }
    public dm_maintains_attachment(docid: string, attachmentId: string,
    attachmentData: Blob, attachmentType: string) : Promise<boolean> {
      return this.maintains_attachment(docid,attachmentId,attachmentData,attachmentType).then((p)=>{
        if ((p !== undefined) && (p !== null) && (p.ok)){
          return true;
        } else {
          return false;
        }
        });
    }
    public dm_remove_attachment(docid: string, attachmentId: string) : Promise<boolean> {
      return this.remove_attachment(docid,attachmentId).then((p)=>{
        if ((p !== undefined) && (p !== null) && (p.ok)){
          return true;
        } else {
          return false;
        }
        });
    }
    //
    public dm_is_online() : Promise<boolean> {
      return this.isOnline();
    }
    //
    public dm_check_database() : Promise<any> {
      return this.check_database();
    }
    //
    public dm_query_by_keys(viewName: string, startKey: string, endKey: string) :
     Promise<IBaseItem[]> {
       let vRet:IBaseItem[] = [];
       if ((viewName === undefined) || (viewName === null) ||
           (startKey === undefined) || (startKey === null) ||
           (endKey === undefined) || (endKey === null)) {
           return Promise.resolve(vRet);
       }
       let fact:IItemFactory = this.itemFactory;
       return this.query_by_keys(viewName,startKey,endKey).then((docs)=>{
         if ((docs !== undefined) && (docs !== null)){
             for (let oMap of docs){
               let p = fact.create(oMap);
               if (oMap !== null){
                 vRet.push(p);
               }
             }// oMap
         }// docs
         if (vRet.length > 1){
           let px = vRet[0];
           if ((px.sort_func !== undefined) && (px.sort_func !== null)){
              let func = px.sort_func;
              vRet.sort(func);
           }
         }
         return vRet;
         });
     }//dm_query_by_keys
    //
    public dm_remove_item(item: IBaseItem) : Promise<boolean> {
      let vRet:boolean = false;
      if ((item === undefined) || (item === null)){
        throw new Error('Invalid item');
      }
      let id:string = item.id;
      if ((id === undefined)|| (id === null)){
          throw new Error('Invalid id');
      }
      return this.remove_item(id).then((p)=>{
        if ((p !== undefined) && (p !== null) && (p.ok)){
          vRet = true;
        }
        return vRet;
        });
    }// dm_remove_item
    //
    public dm_find_items_array(ids: string[]) : Promise<IBaseItem[]> {
      let vRet:IBaseItem[] = [];
      if ((ids === undefined) || (ids === null)){
        return Promise.resolve(vRet);
      }
      let xids:string[] = [];
      for (let x of ids){
        if ((x !== undefined) && (x !== null) && (x.trim().length > 0)){
          xids.push(x);
        }
      }// x
      if (xids.length < 1){
          return Promise.resolve(vRet);
      }
      let fact:IItemFactory = this.itemFactory;
      return this.find_items_array(xids).then((docs)=>{
        if ((docs !== undefined) && (docs !== null)){
            for (let oMap of docs){
              let p = fact.create(oMap);
              if (oMap !== null){
                vRet.push(p);
              }
            }// oMap
        }// docs
        if (vRet.length > 1){
          let px = vRet[0];
          if ((px.sort_func !== undefined) && (px.sort_func !== null)){
             let func = px.sort_func;
             vRet.sort(func);
          }
        }
        return vRet;
        });
    }//dm_find_items_array
    //
    public dm_check_items(items: IBaseItem[]) : Promise<any> {
      let vRet:IBaseItem[] = [];
      if ((items === undefined) || (items === null)){
         return Promise.resolve(vRet);
      }
      let docs:IPouchDoc[] = [];
      for (let x of items){
        if ((x !== undefined) && (x !== null)){
          if (x.is_storeable()){
            x.check_id();
            if ((x.id !== undefined) && (x.id !== null)){
              let xMap:any = {};
                x.to_map(xMap);
                docs.push(xMap);
            }
          }// storable
        }
      }// x
      if (docs.length < 1){
        return Promise.resolve(vRet);
      }
      return this.check_items(docs);
    }// dm_check_items
    //
    public dm_maintains_items(items: IBaseItem[]) : Promise<any> {
      let vRet:IBaseItem[] = [];
      if ((items === undefined) || (items === null)){
         return Promise.resolve(vRet);
      }
      let docs:IPouchDoc[] = [];
      for (let x of items){
        if ((x !== undefined) && (x !== null)){
          if (x.is_storeable()){
            x.check_id();
            if ((x.id !== undefined) && (x.id !== null)){
              let xMap:any = {};
                x.to_map(xMap);
                docs.push(xMap);
            }
          }// storable
        }
      }// x
      if (docs.length < 1){
        return Promise.resolve(vRet);
      }
      return this.maintains_items(docs);
    }// dm_maintains_items
    //
    public dm_maintains_item(item: IBaseItem) : Promise<IBaseItem> {
      let vRet:IBaseItem = null;
        if ((item === undefined) || (item === null)){
          throw new Error('Invalid item');
        }
        if (!item.is_storeable()){
            throw new Error('Item not storeable');
        }
        item.check_id();
        let id:string = item.id;
        if ((id === undefined)|| (id === null)){
          throw new Error('Invalid item id');
        }
        let oMap:any = {};
        item.to_map(oMap);
        let self = this;
        return this.maintains_doc(oMap).then((p:PouchUpdateResponse)=>{
           if ((p !== undefined) && (p !== null) && (p.ok)){
             return self.dm_find_item_by_id(id);
           } else {
              throw new Error('Operation failed');
           }
          });
      }//dm_maintains_item
    public dm_get_ids(startKey: string, endKey: string) : Promise<string[]> {
      return this.get_ids(startKey,endKey);
    }
    public dm_get_items(startKey: string, endKey: string) : Promise<IBaseItem[]> {
      let self = this;
      return this.get_ids(startKey,endKey).then((ids)=>{
          return self.dm_find_items_array(ids);
        })
    }
    public  dm_find_item_by_id(id: string, bAttach?: boolean): Promise<IBaseItem> {
        let vRet: IBaseItem = null;
        if ((id === undefined) || (id === null)) {
            return Promise.resolve(vRet);
        }
        let fact: IItemFactory = this.itemFactory;
        return this.find_item_by_id(id, bAttach).then((doc) => {
            if ((doc !== undefined) && (doc !== null)) {
                vRet = fact.create(doc);
            }
            return vRet;
        });
    }//fetch_item_by_id
}// class DatabaseManager
