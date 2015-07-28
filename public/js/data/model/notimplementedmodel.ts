//notimplementedmodel.ts
import {InfoUserInfo} from './infouserinfo';
import {InfoBaseView} from './infobaseview';
//
export class NotImplementedModel extends InfoBaseView {
    //
    public heading: string = 'Info App. Not (yet) implemented!';
    constructor(userinfo: InfoUserInfo) {
        super(userinfo);
        this.title = 'NotImplemented';
    }
}// NotImplemented
