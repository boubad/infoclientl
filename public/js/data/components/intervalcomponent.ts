//intervalcompoenet.ts
//
import {BaseComponent} from './basecomponent';
import {BaseDetailComponent} from './basedetailcomponent';
import {IntervalViewModel} from '../model/intervalmodel';
import {IIntervalItem} from 'infodata';
//
export class IntervalComponent<T extends IIntervalItem > extends BaseComponent<IntervalViewModel<T>> {
    //
    constructor() {
        super();
    }
    public get sigle(): string {
        return (this.parent !== null) ? this.parent.sigle : null;
    }
    public set sigle(s: string) {
        if (this.parent !== null) {
            this.parent.sigle = s;
        }
    }
    public get name(): string {
        return (this.parent !== null) ? this.parent.name : null;
    }
    public set name(s: string) {
        if (this.parent !== null) {
            this.parent.name = s;
        }
    }
    public get canShowForm(): boolean {
        return (this.parent !== null) ? this.parent.canShowForm : false;
    }
    public get currentItem(): T {
        return (this.parent !== null) ? this.parent.currentItem : null;
    }
    public set currentItem(s: T) {
        if (this.parent !== null) {
            this.parent.currentItem = s;
        }
    }
    public get isEditable(): boolean {
        return (this.parent !== null) ? this.parent.isEditable : false;
    }
    public get isReadOnly(): boolean {
        return (this.parent !== null) ? this.parent.isReadOnly : true;
    }
    public set isReadOnly(s:boolean){}
    public get isEditItem(): boolean {
        return (this.parent !== null) ? this.parent.isEditItem : false;
    }
    public get canAdd(): boolean {
        return (this.parent !== null) ? this.parent.canAdd : false;
    }
    public addNew(): any {
        if (this.parent !== null) {
            this.parent.addNew();
        }
    }
    public get canCancel(): boolean {
        return (this.parent !== null) ? this.parent.canCancel : false;
    }
    public get cannotCancel(): boolean {
        return (!this.canCancel);
    }
    public cancel_add(): void {
        if (this.parent !== null) {
            this.parent.cancel_add();
        }
    }
    public cancel(): void {
        this.cancel_add();
    }
    public get canRemove(): boolean {
        return (this.parent !== null) ? this.parent.canRemove : false;
    }
    public get cannotRemove(): boolean {
        return (!this.canRemove);
    }
    public get canSave(): boolean {
        return (this.parent !== null) ? this.parent.canSave : false;
    }
    public get cannotSave(): boolean {
        return (!this.canSave);
    }
    //
    public save(): any {
        return (this.parent !== null) ? this.parent.save() : Promise.resolve(false);
    }// save
    public remove(): any {
        return (this.parent !== null) ? this.parent.remove() : Promise.resolve(false);
    }// remove
    public get description(): string {
        return (this.parent !== null) ? this.parent.description : null;
    }
    public set description(s: string) {
        if (this.parent !== null) {
            this.parent.description = s;
        }
    }
    public get minDate():  string {
          return (this.parent !== null) ? this.parent.minDate : null;
    }
    public get maxDate():  string {
          return (this.parent !== null) ? this.parent.maxDate : null;
    }
    public get startDate(): string {
            return (this.parent !== null) ? this.parent.startDate : null;
    }
    public set startDate(s: string) {
          if (this.parent !== null) {
                this.parent.startDate = s;
          }
    }
    public get endDate(): string {
          return (this.parent !== null) ? this.parent.endDate : null;
    }
    public set endDate(s: string) {
          if (this.parent !== null) {
                this.parent.endDate = s;
          }
    }
}// SigleNameComponen
