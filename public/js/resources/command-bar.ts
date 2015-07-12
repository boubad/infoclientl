//command-bar.ts
//
import {BaseDetail} from '../platform/basedetail';
import * as csvmodel from '../platform/baseeditmodel';
import {BaseItem} from '../data/domain/baseitem';
//
import {IBaseItem} from 'infodata';
import {bindable} from 'aurelia-framework';
//
export class CommandBar extends BaseDetail<BaseItem, csvmodel.BaseEditViewModel<BaseItem>> {
	@bindable data: csvmodel.BaseEditViewModel<BaseItem>;
	//
	constructor() {
		super();
	}
	protected internal_get_parent(): csvmodel.BaseEditViewModel<BaseItem> {
        return (this.data !== undefined) ? this.data : null;
    }
	//
	 public get canAdd(): boolean {
		 return (this.parent !== null) ? this.parent.canAdd : false;
    }
	public get cannotAdd():boolean {
		return (!this.canAdd);
	}
    public addNew(): any {
		if (this.parent !== null){
			return this.parent.addNew();
		}
		return false;
    }
    public get canCancel(): boolean {
        return (this.parent !== null) ? this.parent.canCancel : false;
    }
    public get cannotCancel(): boolean {
        return (!this.canCancel);
    }
    public cancel(): void {
       if (this.parent !== null){
			this.parent.cancel();
		}
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
	public save(): any {
		if (this.parent !== null){
			return this.parent.save();
		}
		return false;
    }
	public remove(): any {
		if (this.parent !== null){
			return this.parent.remove();
		}
		return false;
    }
    //
}// class ElementsBase
