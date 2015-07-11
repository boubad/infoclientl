//depperson.ts
//
import {DepartementChildItem} from './depchild';
import {Person} from './person';
import {AdministratorPerson} from './adminperson';
import {EnseignantPerson} from './profperson';
import {EtudiantPerson} from './etudperson';
import {IElementDesc, IItemFactory, IPouchDoc,
IPerson, IAdministratorPerson, IEnseignantPerson, IEtudiantPerson,
IDepartementPerson, IDatabaseManager, IBaseItem, IUIManager} from 'infodata';
//
export class DepartementPerson extends DepartementChildItem
    implements IDepartementPerson {
    public personid: string = null;
    public firstname: string = null;
    public lastname: string = null;
    constructor(oMap?: any) {
        super(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.personid !== undefined) {
                this.personid = oMap.personid;
            }
            if (oMap.firstname !== undefined) {
                this.firstname = oMap.firstname;
            }
            if (oMap.lastname !== undefined) {
                this.lastname = oMap.lastname;
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
                this.personid = oMap.personid;
            }
            if (oMap.firstname !== undefined) {
                this.firstname = oMap.firstname;
            }
            if (oMap.lastname !== undefined) {
                this.lastname = oMap.lastname;
            }
        } // oMap
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
            s = s + '-' + this.firstname.toUpperCase();
        }
        return s;
    } // create_id
    public update_person<T extends IPerson>(pPers: T): void {
        if ((pPers !== undefined) && (pPers !== null)) {
            pPers.check_id();
            if (pPers.password === null) {
                pPers.reset_password();
            }
            this.personid = pPers.id;
            this.firstname = pPers.firstname;
            this.lastname = pPers.lastname;
            this.avatarid = pPers.avatarid;
            if ((pPers.departementids === undefined) || (pPers.departementids == null)) {
                pPers.departementids = [];
            }
            this.add_id_to_array(pPers.departementids, this.departementid);
        }// pPers
        if (this.id === null) {
            this.id = this.create_id();
        }
    }// update_person

    public save(service: IDatabaseManager): Promise<IBaseItem> {
        if ((service === undefined) || (service === null) || (this.personid === null)) {
            throw new Error('Item not storeable error (personid)');
        }
        let pFact: IItemFactory = service.itemFactory;
        if ((pFact === undefined) || (pFact === null)) {
            throw new Error('Invalid service...');
        }
        let self = this;
        return service.find_item_by_id(this.personid).then((oPers: IPouchDoc) => {
            let pPers: IPerson = pFact.create_person(oPers);
            self.update_person(pPers);
            if (pPers !== null) {
                let xmap: any = {};
                pPers.to_map(xmap);
                return service.maintains_doc(xmap);
            } else {
                return {};
            }
        }).then((x) => {
            let ymap: any = {};
            self.to_map(ymap);
            return service.maintains_doc(ymap);
        }).then((pz) => {
            return self.load(service);
        })
    }// save
    public is_storeable(): boolean {
        return super.is_storeable() && (this.personid !== null) &&
            (this.lastname !== null) && (this.firstname !== null);
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
