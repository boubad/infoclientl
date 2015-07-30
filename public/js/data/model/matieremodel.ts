//matieres.ts
import {InfoUserInfo} from './infouserinfo';
import {DepSigleNameViewModel} from './depsiglenamemodel';
import {Matiere} from '../domain/matiere';
//
export class MatiereModel extends DepSigleNameViewModel<Matiere> {
    constructor(userinfo: InfoUserInfo) {
        super(userinfo);
        this.title = 'Matières';
    }// constructor
    protected perform_activate(): Promise<any> {
        let self = this;
        return super.perform_activate().then((r) => {
            self.choose_departement = true;
            self.choose_unite = true;
        });
    }
    protected create_item(): Matiere {
        return new Matiere({
            departementid: this.departementid,
            uniteid: this.uniteid
        });
    }
    public post_change_unite(): Promise<any> {
        this.modelItem.uniteid = this.uniteid;
        this.currentItem = this.create_item();
        return this.refreshAll();
    }
    protected is_refresh(): boolean {
        return (this.uniteid !== null);
    }
    public get genre(): string {
        return (this.currentItem !== null) ? this.currentItem.genre : null;
    }
    public set genre(s: string) {
        let x = this.currentItem;
        if (x !== null) {
            x.genre = s;
        }
    }
    public get mat_module(): string {
        return (this.currentItem !== null) ? this.currentItem.mat_module : null;
    }
    public set mat_module(s: string) {
        let x = this.currentItem;
        if (x !== null) {
            x.mat_module = s;
        }
    }
    public get coefficient(): string {
        return (this.currentItem !== null) ? this.number_to_string(this.currentItem.coefficient) : null;
    }
    public set coefficient(s: string) {
        let x = this.currentItem;
        if (x !== null) {
            let d = this.string_to_number(s);
            x.coefficient = ((d !== null) && (d > 0)) ? d : null;
        }
    }
    public get ecs(): string {
        return (this.currentItem !== null) ? this.number_to_string(this.currentItem.ecs) : null;
    }
    public set ecs(s: string) {
        let x = this.currentItem;
        if (x !== null) {
            let d = this.string_to_number(s);
            x.ecs = ((d !== null) && (d > 0)) ? d : null;
        }
    }
    public canActivate(params?: any, config?: any, instruction?: any): any {
        return this.is_admin;
    }// activate
}// class Matieres
