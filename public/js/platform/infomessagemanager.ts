//intramessagemanager.ts
//
import {autoinject} from 'aurelia-framework';
import * as evtagg from 'aurelia-event-aggregator';
import {IMessageManager} from 'infodata';
//
@autoinject
export class InfoMessageManager implements IMessageManager {
    //
    private _data:any;
    private _dispose_func: () => void;
    private _eventAggregator: evtagg.EventAggregator;
    //
    constructor(eventAggregator: evtagg.EventAggregator) {
        this._eventAggregator = eventAggregator;
        this._data = {};
    }// constructor
    public publish(type: string, payload: any): void {
        if ((this._eventAggregator !== undefined) && (this._eventAggregator !== null) &&
        (type !== undefined) && (type !== null) && (payload !== undefined)) {
            this._eventAggregator.publish(type, payload);
        }
    }//publish
    public subscribe(type: string, callback: (payload: any) => any): void {
        if ((this._eventAggregator !== undefined) && (this._eventAggregator !== null) &&
        (type !== undefined) && (type !== null) && (callback !== undefined) &&
        (callback !== null) ) {
            if ((this._data[type] === undefined) || (this._data[type] === null)){
              this._data[type] = this._eventAggregator.subscribe(type,callback);
            }
        }
    }// subscribe
    public unsubscribe(type:string) : void {
      if ((type !== undefined) && (type === null)){
        if ((this._data[type] !== undefined) && (this._data[type] !== null)){
          let func = this._data[type];
          func();
          this._data[type] = null;
        }
      }
    }//unsubscribe
}// class InfoMessageManager
