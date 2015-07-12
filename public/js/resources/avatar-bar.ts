//avatar-bar.ts
//
import {BaseDetail} from '../platform/basedetail';
import * as csvmodel from '../platform/baseeditmodel';
import {BaseItem} from '../data/domain/baseitem';
//
import {IBaseItem} from 'infodata';
import {bindable} from 'aurelia-framework';
//
export class AvatarBar extends BaseDetail<BaseItem, csvmodel.BaseEditViewModel<BaseItem>> {
	@bindable data: csvmodel.BaseEditViewModel<BaseItem>;
	//
	constructor() {
		super();
	}
	protected internal_get_parent(): csvmodel.BaseEditViewModel<BaseItem> {
        return (this.data !== undefined) ? this.data : null;
    }
	//
	public get isEditItem():boolean{
		  return (this.parent != null) ? this.parent.isEditItem : false;
	}
	public get avatarUrl(): string {
        return (this.parent != null) ? this.parent.avatarUrl : null;
    }
    public get hasAvatarUrl(): boolean {
        return (this.avatarUrl !== null);
    }
    public get canRemoveAvatar(): boolean {
        return (this.parent != null) ? this.parent.canRemoveAvatar : false;
    }
    public get cannotRemoveAvatar(): boolean {
        return (!this.canRemoveAvatar);
    }
    public get canSaveAvatar(): boolean {
        return (this.parent != null) ? this.parent.canSaveAvatar : false;
    }
    public get cannotSaveAvatar(): boolean {
        return (!this.canSaveAvatar);
    }
    public get workingUrl(): string {
        return (this.parent != null) ? this.parent.workingUrl : null;
    }
    public get hasWorkingUrl(): boolean {
        return (this.workingUrl !== null);
    }
    public avatarFileChanged(event: any): any {
		if (this.parent !== null) {
			return this.parent.avatarFileChanged(event);
		}
        return false;
    }// fileChanged
    public removeAvatar(): any {
		if (this.parent !== null) {
			return this.parent.removeAvatar();
		}
        return false;
    }
    public saveAvatar(): any {
		if (this.parent !== null) {
			return this.parent.saveAvatar();
		}
        return false;
    }// saveAvatar
}// class ElementsBase
