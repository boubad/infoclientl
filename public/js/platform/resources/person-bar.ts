//
import {DepartementBasePerson} from '../../data/domain/depbaseperson';
import {DepartementPerson} from '../../data/domain/depperson';
import {PersonViewModel} from '../../data/model/personmodel';
//
export class PersonBar {
    //
    private _parent: PersonViewModel<DepartementPerson, DepartementBasePerson>;
    constructor() {
    }
    public bind(s: PersonViewModel<DepartementPerson, DepartementBasePerson>) {
        this._parent = s;
    }
    //
    protected get parent(): PersonViewModel<DepartementPerson, DepartementBasePerson> {
        return (this._parent !== undefined) ? this._parent : null;
    }
    //
    public get canImport(): boolean {
        return (this.parent !== null) ? this.parent.canImport : false;
    }
    public importFileChanged(event: any): any{
        if (this.parent !== null){
          this.parent.importFileChanged(event);
        }
      }
    //
    public get isReadOnly():boolean{
      return (this.parent !== null) ? this.parent.isReadOnly : false;
    }
    public get isEditItem(): boolean {
        return (this.parent !== null) ? this.parent.isEditItem : false;
    }
    public get isEditable():boolean{
      return (this.parent !== null) ? this.parent.isEditable : false;
    }
    public get avatarUrl(): string {
        return (this.parent != null) ? this.parent.avatarUrl : null;
    }
    public get hasAvatarUrl(): boolean {
        return (this.avatarUrl !== null);
    }
    public get canRemoveAvatar(): boolean {
        return (this.parent !== null) ? this.parent.canRemoveAvatar : false;
    }
    public get cannotRemoveAvatar(): boolean {
        return (!this.canRemoveAvatar);
    }
    public get canSaveAvatar(): boolean {
        return (this.parent !== null) ? this.parent.canSaveAvatar : false;
    }
    public get cannotSaveAvatar(): boolean {
        return (!this.canSaveAvatar);
    }
    public get workingUrl(): string {
        return (this.parent !== null) ? this.parent.workingUrl : null;
    }
    public get hasWorkingUrl(): boolean {
        return (this.workingUrl !== null);
    }
    public avatarFileChanged(event: any): any {
        if (this.parent !== null) {
            this.parent.avatarFileChanged(event);
        }
    }// fileChanged
    public removeAvatar(): any {
        return (this.parent !== null) ? this.parent.removeAvatar() : Promise.resolve(false);
    }
    public saveAvatar(): any {
        return (this.parent !== null) ? this.parent.saveAvatar() : Promise.resolve(false);
    }// saveAvatar
    public reset_password(): any {
        if (this.parent !== null) {
            this.parent.reset_password();
        }
    }
    public get username(): string {
        return (this.parent !== null) ? this.parent.username : null;
    }
    public set username(s: string) {
        if (this.parent !== null) {
            this.parent.username = s;
        }
    }
    public get lastname(): string {
        return (this.parent !== null) ? this.parent.lastname : null;
    }
    public set lastname(s: string) {
        if (this.parent !== null) {
            this.parent.lastname = s;
        }
    }

    public get firstname(): string {
        return (this.parent !== null) ? this.parent.firstname : null;
    }
    public set firstname(s: string) {
        if (this.parent !== null) {
            this.parent.firstname = s;
        }
    }
    public get email(): string {
        return (this.parent !== null) ? this.parent.email : null;
    }
    public set email(s: string) {
        if (this.parent !== null) {
            this.parent.email = s;
        }
    }
    public get phone(): string {
        return (this.parent !== null) ? this.parent.phone : null;
    }
    public set phone(s: string) {
        if (this.parent !== null) {
            this.parent.phone = s;
        }
    }
}
