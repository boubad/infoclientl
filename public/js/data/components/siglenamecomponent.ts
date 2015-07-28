//siglenamecompoenet.ts
//
import {BaseComponent} from './basecomponent';
import {BaseDetailComponent} from './basedetailcomponent';
import {SigleNameViewModel} from '../model/siglenamemodel';
import {ISigleNameItem} from 'infodata';
//
export class SigleNameComponent<T extends ISigleNameItem > extends BaseDetailComponent<T> {
    //
    constructor() {
        super();
    }
    public get sigle(): string {
        return (this.currentItem !== null) ? this.currentItem.sigle : null;
    }
    public set sigle(s: string) {
        if (this.currentItem !== null) {
            this.currentItem.sigle = s;
        }
    }
    public get name(): string {
        return (this.currentItem !== null) ? this.currentItem.name : null;
    }
    public set name(s: string) {
        if (this.currentItem !== null) {
            this.currentItem.name = s;
        }
    }
}// SigleNameComponen
