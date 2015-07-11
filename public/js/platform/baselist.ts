//baselist.ts
//
import {RootConsultViewModel} from './rootconsultmodel';
import {BaseElement} from './baseelement';
import {IBaseItem, IDatabaseManager, IUIManager, IMessageManager, IInfoMessage} from 'infodata';
//
export class BaseList<T extends IBaseItem> extends BaseElement<RootConsultViewModel<T>> {
    constructor() {
        super();
    }
    public get hasItems(): boolean {
		return (this.parent !== null) ? this.parent.hasItems : false;
	}
	public get hasPages(): boolean {
		return (this.parent !== null) ? this.parent.hasPages : false;
	}
	public get pagesCount(): number {
		return (this.parent !== null) ? this.parent.pagesCount : 0;
	}
	public get itemsPerPage(): number {
		return (this.parent !== null) ? this.parent.itemsPerPage : 16;
	}
	public set itemsPerPage(s: number) {
		if (this.parent !== null) {
			this.parent.itemsPerPage = s;
		}
	}
	public get canPrevPage(): boolean {
		return (this.parent !== null) ? this.parent.canPrevPage : false;
	}
	public get canBextPage(): boolean {
		return (this.parent !== null) ? this.parent.canNextPage : false;
	}
	public firstPage(): void {
		if (this.parent !== null) {
			this.parent.firstPage();
		}
	}
	public prevPage(): void {
		if (this.parent !== null) {
			this.parent.prevPage();
		}
	}
	public nextPage(): void {
		if (this.parent !== null) {
			this.parent.nextPage();
		}
	}
	public lastPage(): void {
		if (this.parent !== null) {
			this.parent.lastPage();
		}
	}
}// class BaseList
