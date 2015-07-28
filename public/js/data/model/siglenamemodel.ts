//siglenamemodel.ts
import {InfoUserInfo} from './infouserinfo';
import {BaseEditViewModel} from './baseeditmodel';
import {ISigleNameItem} from 'infodata';
//
export class SigleNameViewModel<T extends ISigleNameItem> extends BaseEditViewModel<T> {
	//
    //
	constructor(userinfo: InfoUserInfo) {
        super(userinfo);
    }
    //
    public get sigle(): string {
        return (this.currentItem !== null) ? this.currentItem.sigle : null;
    }
    public set sigle(s: string) {
			if (this.currentItem !== null){
				this.currentItem.sigle = s;
			}
    }
    public get name(): string {
        return (this.currentItem !== null) ? this.currentItem.name : null;
    }
    public set name(s: string) {
        if (this.currentItem !== null){
					this.currentItem.name = s;
				}
    }

}// class BaseEditViewModel
