// baseelement.ts
//
import {InfoRootElement} from './inforootelement';
import {InfoElement} from '../data/infoelement';
import {IDatabaseManager, IUIManager, IMessageManager} from 'infodata';
//
export class BaseElement<T extends InfoRootElement> extends InfoElement {
    //
    constructor() {
      super();
    }
    //
    protected internal_get_parent(): T {
        return null;;
    }
    //
    protected get parent():T {
      return this.internal_get_parent();
    }
    //
    protected get dataService(): IDatabaseManager {
        return (this.parent !== null) ? this.parent.dataService : null;
    }
    protected confirm(question: string): boolean {
      if ((this.parent !== null) && (this.parent.uiManager !== null)) {
        return this.parent.uiManager.confirm(question);
      } else {
        return false;
      }
    }
    //
    public get departementName():string {
      return (this.parent !== null) ? this.parent.departementName : null;
    }
    public get anneeName():string {
      return (this.parent !== null) ? this.parent.anneeName : null;
    }
    public get uniteName():string {
      return (this.parent !== null) ? this.parent.uniteName : null;
    }
    public get groupeName():string {
      return (this.parent !== null) ? this.parent.groupeName : null;
    }
    public get semestreName():string {
      return (this.parent !== null) ? this.parent.semestreName : null;
    }
    public get matiereName():string {
      return (this.parent !== null) ? this.parent.matiereName : null;
    }
    public get anneeStartDate():string {
      return ((this.parent !== null) && (this.parent.annee !== null)) ?
      this.date_to_string(this.parent.annee.startDate) : null;
    }
    public get anneeEndDate():string {
      return ((this.parent !== null) && (this.parent.annee !== null)) ?
      this.date_to_string(this.parent.annee.endDate) : null;
    }
    public get semestreStartDate():string {
      return ((this.parent !== null) && (this.parent.semestre !== null)) ?
      this.date_to_string(this.parent.semestre.startDate) : null;
    }
    public get semestreEndDate():string {
      return ((this.parent !== null) && (this.parent.semestre !== null)) ?
      this.date_to_string(this.parent.semestre.endDate) : null;
    }
    protected internal_get_mindate():string {
      return this.semestreStartDate;
    }
    protected internal_get_maxdate():string {
      return this.semestreEndDate;
    }
    public get minDate():string {
      return this.internal_get_mindate();
    }
    public get maxDate():string {
      return this.internal_get_maxdate();
    }
}// class BaseDEtailT<T>
