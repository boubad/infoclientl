//matiereworkitem.ts
//
import {WorkItem} from './workitem';
import {IMatiereWorkItem, IPerson} from 'infodata';
//
export class MatiereWorkItem extends WorkItem
    implements IMatiereWorkItem {
    public uniteid: string = null;
    public matiereid: string = null;
    public matiereSigle: string = null;
    public uniteSigle: string = null;
    //
    constructor(oMap?: any) {
        super(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.uniteid !== undefined) {
                this.uniteid = oMap.uniteid;
            }
            if (oMap.matiereid !== undefined) {
                this.matiereid = oMap.matiereid;
            }
            if (oMap.uniteSigle !== undefined) {
                this.uniteSigle = oMap.uniteSigle;
            }
            if (oMap.matiereSigle !== undefined) {
                this.matiereSigle = oMap.matiereSigle;
            }
        } // oMap
    } // constructor
    public to_map(oMap: any): void {
        super.to_map(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            oMap.uniteid = this.uniteid;
            oMap.matiereid = this.matiereid;
            oMap.uniteSigle = this.uniteSigle;
            oMap.matiereSigle = this.matiereSigle;
        }
    } // toInsertMap
    public from_map(oMap: any): void {
        super.from_map(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
              if (oMap.uniteid !== undefined) {
                  this.uniteid = oMap.uniteid;
              }
              if (oMap.matiereid !== undefined) {
                  this.matiereid = oMap.matiereid;
              }
              if (oMap.uniteSigle !== undefined) {
                  this.uniteSigle = oMap.uniteSigle;
              }
              if (oMap.matiereSigle !== undefined) {
                  this.matiereSigle = oMap.matiereSigle;
              }
        }
    }// from_map
    public update_person<T extends IPerson>(pPers: T): void {
        super.update_person(pPers);
        if ((pPers !== undefined) && (pPers !== null)) {
            if ((pPers.uniteids === undefined) || (pPers.uniteids === null)) {
                pPers.uniteids = [];
            }
            this.add_id_to_array(pPers.uniteids, this.uniteid);
            if ((pPers.matiereids === undefined) || (pPers.matiereids === null)) {
                pPers.matiereids = [];
            }
            this.add_id_to_array(pPers.matiereids, this.matiereid);
        }// pPers
    }// update_person
    public is_storeable(): boolean {
        return super.is_storeable() && (this.uniteid !== null) &&
            (this.matiereid !== null);
    }
}
