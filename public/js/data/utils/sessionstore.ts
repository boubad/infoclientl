//sessionstore.ts
//
import {IObjectStore} from 'infodata';
//
const ISLOCAL: boolean=(window!==undefined)&&(window!==null)&&
	(window.sessionStorage!==undefined)&&(window.sessionStorage!==null);
//
export class SessionStore implements IObjectStore {
  private _data: any={};
  constructor() {
  }
	public get is_session(): boolean {
		return ISLOCAL;
	}
  public get_value(key: string): string {
    if(ISLOCAL) {
      return window.sessionStorage.getItem(key);
    } else {
			if(this._data[key]!==undefined) {
				return this._data[key];
			} else {
				return null;
			}
		}
	}
	public store_value(key: string,val: string): any {
    if(ISLOCAL) {
      window.sessionStorage.setItem(key,val);
    } else {
			this._data[key]=val;
		}
	}
	public remove_value(key: string): any {
    if(ISLOCAL) {
      window.sessionStorage.removeItem(key);
    } else {
			this._data[key]=null;
		}
	}
  public clear(): any {
    if(ISLOCAL) {
      window.sessionStorage.clear();
    } else {
      this._data={};
    }
  }
}
