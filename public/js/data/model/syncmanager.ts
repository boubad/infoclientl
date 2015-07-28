//syncmanager.ts
import {InfoMessage} from '../utils/infomessage';
import {LocalStore} from '../utils/localstore';
import {SessionStore} from '../utils/sessionstore';
import {IInfoMessage, IMessageManager, IObjectStore, ILogManager} from 'infodata';
//
import {SYNC_IN, SYNC_OUT, SYNC_DATABASE, DATABASE_NAME,
REMOTESERVERSLIST_KEY, SYNC_CHANNEL, SYNC_ERROR, SYNC_PAUSED,
SYNC_CHANGED, INFO_MESSAGE_CHANNEL, SYNC_COMPLETED,
SYNC_DENIED, SYNC_STARTED, SYNC_RESUMED, DEFAULT_SERVERS} from '../utils/infoconstants';
//
declare var PouchDB: IPouchDB;
//
export class SynchroManager {
    //
    private _mess: IMessageManager;
    private localStore: IObjectStore;
    //
    public servers: string[];
    private _server: string;
    protected _repObject_in: PouchReplicateObject;
    protected _repObject_out: PouchReplicateObject;
    protected _store: IObjectStore;
    //
    constructor(evt: IMessageManager) {
        this._mess = evt;
        this.localStore = new LocalStore();
        this._store = new SessionStore();
        this._server = null;
        this._repObject_in = null;
        this._repObject_out = null;
        let s = this.localStore.get_value(REMOTESERVERSLIST_KEY);
        if (s !== null) {
            try {
                this.servers = JSON.parse(s);
                this._server = this.sessionStore.get_value(SYNC_DATABASE);
            } catch (e) {
                console.log(e);
            }
        }// s
        if ((this.servers === undefined) || (this.servers === null)) {
            this.servers = DEFAULT_SERVERS;
        } else if (this.servers.length < 1) {
            this.servers = DEFAULT_SERVERS;
        }
    }
    //
    private publish_message(payload: IInfoMessage): any {
        if ((this._mess !== undefined) && (this._mess !== null)) {
            this._mess.publish(InfoMessage.Channel, payload);
        }
    }// publish
    //
    public get sessionStore(): IObjectStore {
        return this._store;
    }
    //
    public get currentServer(): string {
        return this._server;
    }
    public set currentServer(s: string) {
        this._server = ((s !== undefined) && (s !== null) && (s.trim().length > 0)) ?
            s.trim() : null;
        if (this._server !== null) {
            this.sessionStore.store_value(SYNC_DATABASE, this._server);
        } else {
            this.sessionStore.remove_value(SYNC_DATABASE);
        }
    }
    //
    public remove_server(candidate: string): void {
        if ((candidate === undefined) || (candidate === null)) {
            return;
        }
        if (this.servers.length < 1) {
            return;
        }
        let oRet: string[] = [];
        let s = candidate.trim().toLowerCase();
        for (let x of this.servers) {
            let xx = x.trim().toLowerCase();
            if (xx != s) {
                oRet.push(x);
            }
        }
        this.servers = oRet;
        let sx: string = null;
        try {
            sx = JSON.stringify(this.servers);
            this.localStore.store_value(REMOTESERVERSLIST_KEY, sx);
        } catch (e) {
            console.log(e);
        }
    }// removeServer
    public add_server(candidate: string): void {
        if ((candidate === undefined) || (candidate === null)) {
            return;
        }
        let s = candidate.trim();
        if (s.length < 1) {
            return;
        }
        let ss = s.toLowerCase();
        let bFound = false;
        for (let x of this.servers) {
            let xx = x.trim().toLowerCase();
            if (xx == ss) {
                bFound = true;
                break;
            }
        }
        if (bFound) {
            return;
        }
        this.servers.push(s);
        let sx: string = null;
        try {
            sx = JSON.stringify(this.servers);
            this.localStore.store_value(REMOTESERVERSLIST_KEY, sx);
        } catch (e) {
            console.log(e);
        }
    }// addServer
    //
    public get canImport(): boolean {
        return (this._repObject_in === null) && (this.currentServer !== null);
    }
    public get canExport(): boolean {
        return (this._repObject_out === null) && (this.currentServer !== null);
    }
    public import_from(): void {
        this.currentServer = this.sessionStore.get_value(SYNC_DATABASE);
        if (!this.canImport) {
            return;
        }
        let source = this.currentServer;
        let dest = DATABASE_NAME;
        this._repObject_in = this.perform_replicate(source, dest, SYNC_IN);
    }
    public cancel_import(): void {
        this.terminate_replication(SYNC_IN);
    }
    public cancel_export(): void {
        this.terminate_replication(SYNC_OUT);
    }
    public get is_busy_import(): boolean {
        return (this._repObject_in !== null);
    }
    public get is_busy_export(): boolean {
        return (this._repObject_out !== null);
    }
    public export_to(): void {
        this.currentServer = this.sessionStore.get_value(SYNC_DATABASE);
        if (!this.canExport) {
            return;
        }
        let dest = this.currentServer;
        let source = DATABASE_NAME;
        this._repObject_out = this.perform_replicate(source, dest, SYNC_OUT);
    }
    //
    private publish(data: any, direction: string): any {
        let type = (data.type !== undefined) ? data.type : null;
        let info = (data.info !== undefined) ? data.info : null;
        let err = (data.error !== undefined) ? data.error : null;
        let msg = new InfoMessage({type:type, categ:direction, info:info,error:err});
        this.publish_message(msg);
    }// publish
    public terminate_replication(direction: string) {
        if (direction == SYNC_IN) {
            if (this._repObject_in !== null) {
                this._repObject_in.cancel();
                this._repObject_in = null;
            }
            this.sessionStore.remove_value(SYNC_IN);
        } else if (direction == SYNC_OUT) {
            if (this._repObject_out !== null) {
                this._repObject_out.cancel();
                this._repObject_out = null;
            }
            this.sessionStore.remove_value(SYNC_OUT);
        }
    }// terminate_replication
    protected perform_replicate(source: string, dest: string, direction: string): PouchReplicateObject {
        let self = this;
        this.sessionStore.store_value(SYNC_DATABASE, this.currentServer);
        this.sessionStore.store_value(direction, direction);
        this.publish({ type: SYNC_STARTED, info: null }, direction);
        let rep: PouchReplicateObject = PouchDB.replicate(source, dest, {
            live: true,
            retry: true
        }).on('change', (info) => {
            self.publish({ type: SYNC_CHANGED, info: info }, direction);
        }).on('paused', (err) => {
            self.terminate_replication(direction);
            self.publish({ type: SYNC_PAUSED, info: null, error: err }, direction);
        }).on('active', () => {
            self.publish({ type: SYNC_RESUMED, info: null }, direction);
        }).on('denied', (info) => {
            self.terminate_replication(direction);
            self.publish({ type: SYNC_DENIED, info: info }, direction);
        }).on('complete', (info) => {
            self.terminate_replication(direction);
            self.publish({ type: SYNC_COMPLETED, info: info }, direction);
        }).on('error', (err) => {
            self.terminate_replication(direction);
            self.publish({ type: SYNC_ERROR, error: err }, direction);
        });
        return rep;
    }
    //
}// class SynchroManager
