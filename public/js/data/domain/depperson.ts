//depperson.ts
//
import {DepartementChildItem} from './depchild';
import {Person} from './person';
import {AdministratorPerson} from './adminperson';
import {EnseignantPerson} from './profperson';
import {EtudiantPerson} from './etudperson';
import {IDepartementPerson, IDepBasePerson, IDatabaseManager, IBaseItem, IUIManager, IElementDesc, IPerson} from 'infodata';
//
export class DepartementPerson extends DepartementChildItem
    implements IDepartementPerson {
    private _personid: string;
    private _firstname: string;
    private _lastname: string;
    //
    constructor(oMap?: any) {
        super(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.personid !== undefined) {
                this._personid = oMap.personid;
            }
            if (oMap.firstname !== undefined) {
                this._firstname = oMap.firstname;
            }
            if (oMap.lastname !== undefined) {
                this._lastname = oMap.lastname;
            }
        } // oMap
    } // constructor
    public to_map(oMap: any): void {
        super.to_map(oMap);
        if (this.personid !== null) {
            oMap.personid = this.personid;
        }
        if (this.lastname !== null) {
            oMap.lastname = this.lastname;
        }
        if (this.firstname !== null) {
            oMap.firstname = this.firstname;
        }
    } // toInsertMap
    public from_map(oMap: any): void {
        super.from_map(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.personid !== undefined) {
                this._personid = oMap.personid;
            }
            if (oMap.firstname !== undefined) {
                this._firstname = oMap.firstname;
            }
            if (oMap.lastname !== undefined) {
                this._lastname = oMap.lastname;
            }
        } // oMap
    }
    //
    public get personid(): string {
        return (this._personid !== undefined) ? this._personid : null;
    }
    public set personid(s: string) {
        this._personid = (s !== undefined) ? s : null;
    }
    public get firstname(): string {
        return (this._firstname !== undefined) ? this._firstname : null;
    }
    public set firstname(s: string) {
        this._firstname = (s !== undefined) ? s : null;
    }
    public get lastname(): string {
        return (this._lastname !== undefined) ? this._lastname : null;
    }
    public set lastname(s: string) {
        this._lastname = (s !== undefined) ? s : null;
    }
    //
    public get fullname(): string {
        return ((this.lastname !== null) && (this.firstname !== null)) ?
            (this.lastname + ' ' + this.firstname) : null;
    } // fullname
    public avatardocid(): string {
        return this.personid;
    }
    public create_id(): string {
        let s = this.start_key();
        if ((s !== null) && (this.lastname !== null)) {
            s = s + this.lastname.toUpperCase();
        }
        if ((s !== null) && (this.firstname !== null)) {
            s = s + this.firstname.toUpperCase();
        }
        return s;
    } // create_id
    public update_person<T extends IDepBasePerson>(pPers: T): void {
        if ((pPers !== undefined) && (pPers !== null)) {
            if (pPers.id === null) {
                pPers.check_id();
            }
            if (pPers.password === null) {
                pPers.reset_password();
            }
            this.personid = pPers.id;
            this.firstname = pPers.firstname;
            this.lastname = pPers.lastname;
            this.avatarid = pPers.avatarid;
            this.check_id();
            this.add_id_to_array(pPers.departementids, this.departementid);
        }// pPers
    }// update_person
    public check_avatar(service: IDatabaseManager): Promise<IDepartementPerson> {
        if (this.avatarid !== null) {
            return Promise.resolve(this);
        }
        if (this.personid === null) {
            return Promise.resolve(this);
        }
        let self = this;
        return service.dm_find_item_by_id(this.personid).then((pPers: IPerson) => {
            if ((pPers !== undefined) && (pPers !== null) && (pPers.avatarid !== null)) {
                self.avatarid = pPers.avatarid;
            }
            return self;
        });
    }//check_avatar
    public check_url(service: IDatabaseManager, man: IUIManager): Promise<IElementDesc> {
        if (this.url !== null) {
            return Promise.resolve(this);
        }
        let id = this.avatardocid();
        let attid = this.avatarid;
        if ((id !== null) && (attid !== null)) {
            return super.check_url(service, man);
        }
        if (this.personid === null) {
            return Promise.resolve(this);
        }
        let self = this;
        return service.dm_find_item_by_id(this.personid).then((pPers: IPerson) => {
            if ((pPers !== undefined) && (pPers !== null)) {
                self.avatarid = pPers.avatarid;
            }
            if (self.avatarid !== null) {
                return super.check_url(service, man);
            } else {
                return self;
            }
        });
    }//check_url
    public save(service: IDatabaseManager): Promise<IBaseItem> {
        if ((this.personid === null) || (this.departementid === null)) {
            throw new Error('Item not storeable error (personid)');
        }
        let self = this;
        let pPers: IDepBasePerson = null;
        return service.dm_find_item_by_id(this.personid).then((xPers: IDepBasePerson) => {
            pPers = (xPers !== undefined) ? xPers : null;
            if (pPers !== null) {
                self.update_person(pPers);
            } else {
                throw new Error('Item not storeable error (personid)');
            }
            return service.dm_maintains_item(pPers);
        }).then((x) => {
            return service.dm_maintains_item(self);
        }).then((r) => {
            return self;
        });
    }// save
    public is_storeable(): boolean {
        return super.is_storeable() && (this.personid !== null);
    }
    protected get_text(): string {
        return this.fullname;
    }
    public get sort_func(): (p1: IDepartementPerson, p2: IDepartementPerson) => number {
        return DepartementPerson.g_sort_func;
    }
    public static g_sort_func(p1: IDepartementPerson, p2: IDepartementPerson): number {
        let s1 = p1.fullname;
        let s2 = p2.fullname;
        if ((s1 !== null) && (s2 !== null)) {
            return s1.localeCompare(s2);
        } else if ((s1 === null) && (s2 !== null)) {
            return 1;
        } else if ((s1 !== null) && (s2 === null)) {
            return -1;
        } else {
            return 0;
        }
    } // sort_func
}
