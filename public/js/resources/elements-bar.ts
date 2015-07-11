//elements-bar.ts
//
import {BaseList} from '../platform/baselist';
import {RootConsultViewModel} from '../platform/rootconsultmodel';
import {BaseItem} from '../data/domain/baseitem';
//
import {IBaseItem} from 'infodata';
import {bindable} from 'aurelia-framework';
//
export class ElementsBar extends BaseList<BaseItem> {
	@bindable data: RootConsultViewModel<BaseItem>;
	//
	constructor() {
		super();
	}
	protected internal_get_parent(): RootConsultViewModel<BaseItem> {
        return (this.data !== undefined) ? this.data : null;
    }
}// class ElementsBase
