//siglenamedetaim.ts
//
import {InfoRootElement} from './inforootelement';
import {BaseDetail} from './basedetail';
import {ISigleNameItem} from 'infodata';
//
export class SigleNameDetail<T extends ISigleNameItem, P extends InfoRootElement> extends BaseDetail<T, P> {
    constructor() {
        super();
    }
    public get sigle(): string {
        return (this.item !== null) ? this.item.sigle : null;
    }
    public set sigle(s: string) {
        if (this.item !== null) {
            this.item.sigle = s;
        }
    }
    public get name(): string {
        return (this.item !== null) ? this.item.name : null;
    }
    public set name(s: string) {
        if (this.item !== null) {
            this.item.name = s;
        }
    }
    //
}
