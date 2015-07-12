//siglename-bar.ts
//
import {SigleNameDetail} from '../platform/siglenamedetail';
import * as csvmodel from '../platform/siglenamemodel';
import {SigleNameItem} from '../data/domain/siglenameitem';
//
import {bindable} from 'aurelia-framework';
//
export class SiglenameBar extends SigleNameDetail<SigleNameItem, csvmodel.SigleNameViewModel<SigleNameItem>> {
	@bindable data: csvmodel.SigleNameViewModel<SigleNameItem>;
	//
	constructor() {
		super();
	}
	protected internal_get_parent(): csvmodel.SigleNameViewModel<SigleNameItem> {
        return (this.data !== undefined) ? this.data : null;
    }
	//
	
}// class ElementsBase
