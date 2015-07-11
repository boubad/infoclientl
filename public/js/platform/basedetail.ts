//basebar.ts
//
import {InfoRootElement} from './inforootelement';
import {BaseElement} from './baseelement';
import {IBaseItem, IDatabaseManager, IUIManager, IMessageManager, IInfoMessage} from 'infodata';
import {InfoMessage} from '../data/infomessage';
//
export class BaseDetail<T extends IBaseItem, P extends InfoRootElement> extends BaseElement<P> {
    constructor() {
        super();
    }
    //
    protected internal_get_item(): T {
        return null;
    }
    //
    protected get item(): T {
        return this.internal_get_item();
    }
    public get canSave(): boolean {
        return (this.item !== null) && (this.item.is_storeable());
    }
    public get cannotSave(): boolean {
        return (!this.canSave);
    }
    public get canRemove(): boolean {
        return this.isEditItem;
    }
    public get cannotRemove(): boolean {
        return (!this.canRemove);
    }
    public get isEditItem(): boolean {
        return (this.item !== null) &&
            (this.item.id !== null) && (this.item.rev !== null);
    }
    public save(): Promise<any> {
        if (this.canSave && (this.dataService !== null)) {
            let p = this.parent;
            let bOld: boolean = this.isEditItem;
            return this.item.save(this.dataService).then((b) => {
                if (bOld) {
                    p.refresh();
                } else {
                    p.refreshAll();
                }
            }).catch((err) => {
                p.set_error(err);
            });
        } else {
            return Promise.resolve(true);
        }
    } // save
    public remove(): Promise<any> {
        if (this.canRemove && (this.dataService !== null)) {
            let question: string = 'Voulez-vous supprimer ' + this.item.id + " ?";
            if (this.confirm(question)) {
                let p = this.parent;
                return this.item.remove(this.dataService).then((b) => {
                    return p.refreshAll();
                }).catch((err) => {
                    p.set_error(err);
                })
            } else {
                return Promise.resolve(false);
            }
        } else {
            return Promise.resolve(false);
        }
    } // save
    //
    public get url(): string {
        return (this.item !== null) ? this.item.url : null;
    }
    public get has_url(): boolean {
        return (this.url !== null);
    }
    public get description(): string {
        return (this.item !== null) ? this.item.description : null;
    }
    public set description(s: string) {
        if (this.item !== null) {
            this.item.description = s;
        }
    }

}// class BaseDEtailT<T>
