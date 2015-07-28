//person.ts
//
import {BaseItem} from './baseitem';
import {IPerson} from 'infodata';
import {PERSON_KEY, PERSON_PREFIX,ROLE_ADMIN,ROLE_PROF,ROLE_ETUD,ROLE_SUPER} from '../utils/infoconstants';
//
export class Person extends BaseItem implements IPerson {
    //
    private _username: string;
    private _firstname: string;
    private _lastname: string;
    //
    public _email: string ;
    public _phone: string ;
    public _password: string;
    //
    public _roles: string[];
    public _departementids: string[];

    //
    constructor(oMap?: any) {
        super(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.username !== undefined) {
                this._username = oMap.username;
            }
            if (oMap.password !== undefined) {
                this._password = oMap.password;
            }
            if (oMap.firstname !== undefined) {
                this._firstname = oMap.firstname;
            }
            if (oMap.lastname !== undefined) {
                this._lastname = oMap.lastname;
            }
            if (oMap.email !== undefined) {
                this._email = oMap.email;
            }
            if (oMap.phone !== undefined) {
                this._phone = oMap.phone;
            }
            if (oMap.departementids !== undefined) {
                this._departementids = oMap.departementids;
            } //
            if (oMap.roles !== undefined) {
                this._roles = oMap.roles;
            } //
        } // oMap
    } // constructor
    //
    public from_map(oMap: any): void {
        super.from_map(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
             if (oMap.username !== undefined) {
                this._username = oMap.username;
            }
            if (oMap.password !== undefined) {
                this._password = oMap.password;
            }
            if (oMap.firstname !== undefined) {
                this._firstname = oMap.firstname;
            }
            if (oMap.lastname !== undefined) {
                this._lastname = oMap.lastname;
            }
            if (oMap.email !== undefined) {
                this._email = oMap.email;
            }
            if (oMap.phone !== undefined) {
                this._phone = oMap.phone;
            }
            if (oMap.departementids !== undefined) {
                this._departementids = oMap.departementids;
            } //
            if (oMap.roles !== undefined) {
                this._roles = oMap.roles;
            } //
        } // oMap
    }
    //
    public to_map(oMap: any): void {
        super.to_map(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            oMap.username = this.username;
            oMap.password = this.password;
            oMap.firstname = this.firstname;
            oMap.lastname = this.lastname;
            oMap.email = this.email;
            oMap.phone = this.phone;
            oMap.roles = this.roles;
            oMap.departementids = this.departementids;
        }
    } // to_insert_map
    //
	public get password():string {
		return (this._password !== undefined) ? this._password : null;
	}
	public set password(s: string){
		this._password = (s !== undefined) ? s : null;
	}
	public get email():string {
		return (this._email !== undefined) ? this._email : null;
	}
	public set email(s:string){
		this._email = (s !== undefined) ? s : null;
	}
	public get phone():string {
		return (this._phone !== undefined) ? this._phone : null;
	}
	public set phone(s:string){
		this._phone = s;
	}
	public get roles():string[] {
		if ((this._roles == undefined) || (this._roles === null)){
			this._roles = [];
		}
		return this._roles;
	}
	public set roles(s:string[]) {
		this._roles = ((s !== undefined) && (s !== null)) ? s : [];
	}
	public get departementids():string[] {
		if ((this._departementids == undefined) || (this._departementids === null)){
			this._departementids = [];
		}
		return this._departementids;
	}
	public set departementids(s:string[]) {
		this._departementids = ((s !== undefined) && (s !== null)) ? s : [];
	}
    public get username(): string {
        return (this._username !== undefined) ? this._username : null;
    }
    public set username(s: string) {
        this._username = ((s !== undefined) && (s !== null) && (s.trim().length > 0)) ?
            s.trim().toLowerCase() : null;
    }
    public get lastname(): string {
        return (this._lastname !== undefined) ? this._lastname : null;
    }
    public set lastname(s: string) {
        this._lastname = ((s !== undefined) && (s !== null) && (s.trim().length > 0)) ?
            s.trim().toUpperCase() : null;
    }
    public get firstname(): string {
        return (this._firstname !== undefined) ? this._firstname : null;
    }
    public set firstname(s: string) {
        let ss = ((s !== undefined) && (s !== null) && (s.trim().length > 0)) ? s.trim() : null;
        if (ss !== null) {
            if (ss.length > 0) {
                this._firstname = ss.substr(0, 1).toUpperCase() + ss.substr(1).toLocaleLowerCase();
            } else {
                this._firstname = ss.toUpperCase();
            }
        } else {
            this._firstname = null;
        }
    }
    //
    public base_prefix(): string {
        return PERSON_PREFIX;
    }
    public create_id(): string {
        let s = this.start_key();
        if ((s !== null) && (this.username !== null)) {
            s = s + this.username;
        }
        return s;
    }// create_id
    //
    public reset_password(): void {
        if (this.username !== null) {
            this.password = this.create_crypted_password(this.username);
        } else {
            this.password = null;
        }
    }
    public change_password(ct: string): void {
        if ((ct === undefined) || (ct === null)) {
            this.password = null;
        } else {
            var v = null;
            var x = ct.trim();
            if (x.length > 0) {
                v = this.create_crypted_password(x);
            }
            this.password = v;
        }
    }
    public check_password(ct: string): boolean {
        if ((ct === undefined) || (ct === null)) {
            if (this.password === null) {
                return true;
            } else {
                return false;
            }
        }
        var v = this.create_crypted_password(ct);
        return (this.password == v);
    } // check_password
    //
    public type(): string {
        return PERSON_KEY;
    }
    //
    public get fullname(): string {
        return ((this.lastname !== null) && (this.firstname !== null)) ?
            (this.lastname + ' ' + this.firstname) : null;
    } // fullname
    //
    protected get_text(): string {
        return this.fullname;
    }
    public is_storeable(): boolean {
        return super.is_storeable() &&
            (this.username !== null) && (this.firstname !== null) &&
            (this.lastname !== null) && (this.roles !== undefined) &&
            (this.roles !== null) && (this.roles.length > 0);
    }
    public has_role(r: string): boolean {
        if ((this.roles === undefined) || (this.roles === null)) {
            return false;
        }
        let bRet = false;
        if ((r !== undefined) && (r !== null) && (this.roles.length > 0)) {
            let ss = r.trim().toLowerCase();
            for (let r of this.roles) {
                let x = r.trim().toLowerCase();
                if (ss == x) {
                    bRet = true;
                    break;
                }
            }
        }
        return bRet;
    } // hasrole_
    public get is_admin(): boolean {
        return (this.has_role(ROLE_SUPER) || this.has_role(ROLE_ADMIN));
    }
    public get is_super(): boolean {
        return this.has_role(ROLE_SUPER);
    }
    public get is_prof(): boolean {
        return this.has_role(ROLE_PROF);
    }
    public get is_etud(): boolean {
        return this.has_role(ROLE_ETUD);
    }
    public get sort_func(): (p1: IPerson, p2: IPerson) => number {
        return Person.g_sort_func;
    }
    public static g_sort_func(p1: IPerson, p2: IPerson): number {
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
} // class Person
