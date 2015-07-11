//infoelement.ts
//
import {IInfoElement} from 'infodata';
import {MyCrypto} from './mycrypto';
//
let ccCript = new MyCrypto();
//
export class InfoElement implements IInfoElement {
    constructor() { }
    //
    public create_crypted_password(sClearText: string): string {
        return ccCript.md5(sClearText);
    }//
    public check_password(expectedClear: string, actualCrypted): boolean {
        let s = ccCript.md5(expectedClear);
        return (s == actualCrypted);
    }
    //
    public format_note(s: number): number {
        return (Math.floor(s * 100.0 + 0.5)) / 100.0;
    }
    //
    public create_username(slast: string, sfirst: string): string {
        let sRet: string = null;
        if ((slast !== undefined) && (slast !== null)) {
            let us = slast.trim().toLowerCase();
            if (us.length > 5) {
                sRet = us.substr(0, 5).trim();
            } else {
                sRet = us;
            }
        }
        if ((sfirst !== undefined) && (sfirst !== null)) {
            let us = sfirst.trim().toLowerCase();
            if (us.length > 3) {
                sRet = sRet + us.substr(0, 3).trim();
            } else {
                sRet = sRet + us;
            }
        }
        if ((sRet !== null) && (sRet.length < 1)) {
            sRet = null;
        }
        return sRet;
    }// create_username
    //
    public create_random_id(): string {
        let n = Math.floor(Math.random() * 10000.0);
        let sn = '' + n;
        while (sn.length < 4) {
            sn = '0' + sn;
        }
        return sn;
    } // create_random_id
    public create_date_id(seed:Date):string {
      let s = seed.toISOString().substr(0,10);
      return s.replace("-","");
    }
    public create_date_random_id(seed?: Date): string {
        let sn = this.create_random_id();
        let d = ((seed !== undefined) && (seed !== null)) ? seed : new Date();
        let s = d.toISOString() + '-' + sn;
        return s;
    } // create_date_random_id
    public check_value<T>(v: T): T {
        return (v !== undefined) ? v : null;
    }
    public check_string(s: string): string {
        return ((s !== undefined) && (s !== null) && (s.trim().length > 0)) ? s.trim() : null;
    }
    public check_upper_string(s: string): string {
        return ((s !== undefined) && (s !== null) && (s.trim().length > 0)) ?
            s.trim().toUpperCase() : null;
    }
    public check_lower_string(s: string): string {
        return ((s !== undefined) && (s !== null) && (s.trim().length > 0)) ?
            s.trim().toLowerCase() : null;
    }
    public check_array<T>(cont: T[]): T[] {
        return ((cont !== undefined) && (cont !== null)) ? cont : [];
    }
    public add_id_to_array(cont: string[], id: string): void {
        if ((cont === undefined) || (cont === null) ||
            (id === undefined) || (id === null)) {
            return;
        }
        let bFound = false;
        for (let p of cont) {
            if (p == id) {
                bFound = true;
            }
        }// p
        if (!bFound) {
            cont.push(id);
        }
    }// add_id_to_array
    public string_to_date(s: any): Date {
        let dRet: Date = null;
        if ((s !== undefined) && (s !== null)) {
            try {
                let t = Date.parse(s.toString());
                if (!isNaN(t)) {
                    dRet = new Date(t);
                }
            } catch (e) {
            }
        }
        return dRet;
    }
    public date_to_string(d: Date): string {
        let sRet: string = null;
        if ((d !== undefined) && (d !== null)) {
            try {
                let t = Date.parse(d.toString());
                if (!isNaN(t)) {
                    let dd = new Date(t);
                    sRet = dd.toISOString().substr(0, 10);
                }
            } catch (e) { }
        }
        return sRet;
    }
    public number_to_string(n: number): string {
        return ((n !== undefined) && (n !== null)) ? n.toString() : null;
    }
    public string_to_number(s: any): number {
        let dRet: number = null;
        if ((s !== undefined) && (s !== null)) {
            try {
                let x = parseFloat(s);
                if (!isNaN(x)) {
                    dRet = x;
                }
            } catch (e) { }
        }// s
        return dRet;
    }
    public check_date(d: Date): Date {
        return this.string_to_date(d);
    } // check_date
    public check_number(s: any): number {
        return this.string_to_number(s);
    }
}
