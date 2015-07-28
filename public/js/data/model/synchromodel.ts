//synchrpmodel.ts
import {SYNC_IN, SYNC_OUT, SYNC_DATABASE, DATABASE_NAME,
REMOTESERVERSLIST_KEY, SYNC_CHANNEL, SYNC_ERROR, SYNC_PAUSED,
SYNC_CHANGED, SYNC_COMPLETED, SYNC_DENIED,INFO_MESSAGE_CHANNEL,
SYNC_STARTED, SYNC_RESUMED} from '../utils/infoconstants';
import {SynchroManager} from './syncmanager';
import {IInfoMessage,IMessageManager} from 'infodata';
import {InfoMessage} from '../utils/infomessage';
import {DatabaseManager} from '../services/pouchdb/databasemanager';
//
export class SynchroModel {
	//
	public title:string = null;
    //
    private manager: SynchroManager;
		private _evt:IMessageManager;
	private _dispose_func: ()=> void;
    //
    public outputString_In: string = null;
    public outputString_Out: string = null;
    public status_In: string = null;
    public status_Out: string = null;
    public candidateServer: string = null;
    //
    private _currentIn: number = 0;
    private _currentOut: number = 0;
    private is_busy_update: boolean = false;
    //
    constructor(evt:IMessageManager) {
		 		this._evt = evt;
        this.manager = new SynchroManager(evt);
        this.title = 'Synchro';
    }
	public activate(params?: any, config?: any, instruction?: any): any {
        this.subscribe();
        return Promise.resolve(true);
    }// activate
	//
	private subscribe() :void {
		if ((this._evt !== undefined) && (this._evt !== null)){
			let self = this;
			if ((this._dispose_func === undefined) || (this._dispose_func === null)){
				  this._evt.subscribe(InfoMessage.Channel,(payload:IInfoMessage)=>{
					self.message_received(payload);
				});
			}
		}// evt
	}// subscribe
	private unsubscribe():void {
		if ((this._dispose_func !== undefined) || (this._dispose_func !== null)){
			this._dispose_func = null;
		}
	}
	//
	public destroy_database(): any {
		let s = new DatabaseManager();
		return s.dm_destroy().then((r)=>{
			return true;
		}).catch((err)=>{
			return false;
		});
	}
    //
    public get hasApplicationCache(): boolean {
        return ((window !== undefined) && (window !== null) &&
            (window.applicationCache !== undefined) && (window.applicationCache !== null));
    }// hasApplicationCache
    public set hasApplicationCache(s: boolean) { }
    public get canUpdateCache(): boolean {
        return this.hasApplicationCache && (!this.is_busy_update) && (!this.manager.is_busy_export) &&
            (!this.manager.is_busy_import);
    }// canUpdateCavhe
    public set canUpdateCache(s: boolean) { }
    public updateCache(): void {
        if ((window !== undefined) && (window !== null) &&
            (window.applicationCache !== undefined) && (window.applicationCache !== null)) {
            this.is_busy_update = true;
            window.applicationCache.update();
            this.is_busy_update = false;
        }
    }// updateCache
    public canActivate(params?: any, config?: any, instruction?: any): any {
        return true;
    }// activate
    //
    protected display_string(s: string, direction: string): void {
        if (direction == SYNC_IN) {
            this.status_In = s;
        } else {
            this.status_Out = s;
        }
    }
    protected display_info(info: any, direction: string): void {
        let val: string = ((info !== undefined) && (info !== null)) ? JSON.stringify(info) : '';
        if (direction == SYNC_IN) {
            this.outputString_In = val;
        } else {
            this.outputString_Out = val;
        }
    }
    protected process_sync_message(direction: string, type: string, info: any, error: any) {
        if (type == SYNC_STARTED) {
            this.display_string('REPLICATION STARTED...', direction);
            if (direction == SYNC_IN) {
                this._currentIn = 0;
            } else if (direction == SYNC_OUT) {
                this._currentOut = 0;
            }
        } else if (type == SYNC_PAUSED) {
            if (error !== null) {
                this.display_string('PAUSE: Error ' + JSON.stringify(error), direction);
            } else {
                this.display_string('PAUSE...', direction);
            }
            this.manager.terminate_replication(direction);
        } else if (type == SYNC_ERROR) {
            if (error !== null) {
                this.display_string('ERROR: ' + JSON.stringify(error), direction);
            } else {
                this.display_string('ERROR...', direction);
            }
        } else if (type == SYNC_COMPLETED) {
            this.display_string('COMPLETED!', direction);
            this.display_info(info, direction);
        } else if (type == SYNC_CHANGED) {
            let ss: string = "changed... ";
            if (direction == SYNC_IN) {
                this._currentIn++;
                ss = ss + this._currentIn + " ...";
            } else if (direction == SYNC_OUT) {
                this._currentOut++;
                ss = ss + this._currentOut + " ...";
            }
            this.display_string(ss, direction);
            this.display_info(info, direction);
        }
    }// process_sync_message
    protected message_received(message: IInfoMessage): Promise<boolean> {
		if ((message === undefined) || (message === null)){
			return Promise.resolve(false);
		}
        let direction = (message.categ !== undefined) ? message.categ : null;
        let type = (message.type !== undefined) ? message.type : null;
        let info = (message.value !== undefined)? message.value : null;
        let error = (message.error !== undefined) ? message.error : null;
        this.process_sync_message(direction, type, info, error);
        return Promise.resolve(true);
    }// message_received
    public get servers(): string[] {
        return this.manager.servers;
    }
    public get currentServer(): string {
        return this.manager.currentServer;
    }
    public set currentServer(s: string) {
        this.manager.currentServer = s;
    }
    public clear_import(): void {
        this.outputString_In = null;
        this.status_In = null;
    }
    public clear_export(): void {
        this.outputString_Out = null;
        this.status_Out = null;
    }
    //
    public get canImport(): boolean {
        return this.manager.canImport;
    }
    public set canImport(s: boolean) { }
    public get cannotImport(): boolean {
        return (!this.canImport);
    }
    public set cannotImport(s: boolean) { }
    public import_from(): void {
        this.status_In = null;
        this.manager.import_from();
    }
    public cancel_import(): void {
        this.manager.cancel_import();
    }
    public cancel_export(): void {
        this.manager.cancel_export();
    }
    public get canCancelImport(): boolean {
        return this.manager.is_busy_import;
    }
    public set canCancelImport(s: boolean) { }
    public get cannotCancelImport(): boolean {
        return (!this.canCancelImport);
    }
    public set cannotCancelImport(s: boolean) { }
    //
    public get canExport(): boolean {
        return this.manager.canExport;
    }
    public set canExport(s: boolean) { }
    public get cannotExport(): boolean {
        return (!this.canExport);
    }
    public set cannotExport(s: boolean) { }
    public export_to(): void {
        this.status_Out = null;
        this.manager.export_to();
    }
    public get canCancelExport(): boolean {
        return this.manager.is_busy_export;
    }
    public set canCancelExport(s: boolean) { }
    public get cannotCancelExport(): boolean {
        return (!this.canCancelExport);
    }
    public set cannotCancelExport(s: boolean) { }
    //
    public get canRemoveServer(): boolean {
        return (this.currentServer !== null) && (this.currentServer.trim().length > 0);
    }
    public set canRemoveServer(s: boolean) { }
    public get cannotRemoveServer(): boolean {
        return (!this.canRemoveServer);
    }
    public set cannotRemoveServer(s: boolean) { }
    public removeServer(): void {
        this.manager.remove_server(this.currentServer);
    }// removeServer
    //
    public get canAddServer(): boolean {
        return (this.candidateServer !== null) && (this.candidateServer.trim().length > 0);
    }
    public set cannAddServer(s: boolean) { }
    public get cannotAddServer(): boolean {
        return (!this.canAddServer);
    }
    public set cannotAddServer(s: boolean) { }
    public addServer(): void {
        this.manager.add_server(this.candidateServer);
        this.candidateServer = null;
    }// addServer
    //

}// class SynchroView
