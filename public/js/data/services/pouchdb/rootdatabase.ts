//rootdatabase.ts
/// <reference path="../../../../../typings/pouchdb/pouchdb.d.ts"/>
//
import PouchDB = require('pouchdb');
//
import {InfoElement} from '../../infoelement';
import {IPouchDoc, IRootDatabaseManager} from 'infodata';
import {DATABASE_NAME} from '../../infoconstants';
//
export class RootDatabase extends InfoElement implements IRootDatabaseManager {
    //
    private _url: string;
    private _db: IPouchDB;
    private _local: boolean;
    //
    constructor(name?: string) {
        super();
        this._url = ((name !== undefined) && (name !== null)) ? name : DATABASE_NAME;
        let s: string = this._url.toLowerCase();
        if (s.indexOf('http') >= 0) {
            this._local = false;
        } else {
            this._local = true;
        }
    }
    //
    public get_children_ids(viewName: string, keyVal: string): Promise<string[]> {
        let oRet: string[] = [];
        if ((viewName === undefined) || (viewName === null) ||
            (keyVal === undefined) || (keyVal === null)) {
            return Promise.resolve(oRet);
        }
        let options: PouchQueryOptions = {
            startkey: keyVal, endkey: keyVal
        };
        return this.db.then((xdb: IPouchDB) => {
            return xdb.query(viewName, options);
        }).then((result) => {
            if ((result !== undefined) && (result !== null) && (result.rows !== undefined) &&
                (result.rows != null)) {
                for (let row of result.rows) {
                    if ((row.id !== undefined) && (row.id !== null)) {
                        oRet.push(row.id);
                    }
                }// row
            }// rows
            return oRet;
        }).catch((err) => {
            return oRet;
        });
    }// get_children_ids
    //
    public maintains_design_doc(doc: IPouchDoc): Promise<PouchUpdateResponse> {
        if ((doc === undefined) || (doc === null)) {
            throw new Error('Invalid argument');
        }
        if ((doc._id === undefined) || (doc._id === null)) {
            throw new Error('Invalid document _id');
        }
        let xdb: IPouchDB = null;
        return this.db.then((dx: IPouchDB) => {
            xdb = dx;
            return xdb.get(doc._id);
        }).then((pOld:IPouchDoc) => {
            doc._rev = pOld._rev;
            return xdb.put(doc);
        }, (ex: PouchError) => {
            if (ex.status == 404) {
                return xdb.put(doc);
            } else {
                throw new Error(ex.reason);
            }
        }).then((rx) => {
            return rx;
        }, (err2: PouchError) => {
            if (err2.status == 409) {
                return { ok: true, id: doc._id, rev: doc._id };
            } else {
               throw new Error(err2.reason);
            }
        });
    }// maintains_design_doc
    //
    public query_by_keys(viewName: string, startKey: string, endKey: string): Promise<IPouchDoc[]> {
        let oRet: IPouchDoc[] = [];
        if ((viewName === undefined) || (viewName === null) ||
            (startKey === undefined) || (startKey === null) ||
            (endKey === undefined) || (endKey === null)) {
            return Promise.resolve(oRet);
        }
        let self = this;
        let options: PouchQueryOptions = {
            startkey: startKey, endkey: endKey,
            include_docs: true
        };
        return this.db.then((xdb) => {
            return xdb.query(viewName, options);
        }).then((result) => {
            if ((result !== undefined) && (result !== null) && (result.rows !== undefined) &&
                (result.rows != null)) {
                for (let row of result.rows) {
                    oRet.push(row.doc);
                }// row
            }// rows
            return oRet;
        });
    }// query_bu_keys
    //
    public find_attachment(docid: string, attachmentId: string): Promise<Blob> {
        let oRet = null;
        if ((docid === undefined) || (docid === null) || (attachmentId === undefined) ||
            (attachmentId === null)) {
            return Promise.resolve(oRet);
        }
        return this.db.then((xdb: IPouchDB) => {
            return xdb.getAttachment(docid, attachmentId);
        }).then((p) => {
            return p;
        }, (err: PouchError) => {
            if (err.status != 404) {
                Promise.reject(new Error(err.reason));
            }
            return null;
        });
    }// find_attachment
    public maintains_attachment(docid: string, attachmentId: string,
        attachmentData: Blob, attachmentType: string): Promise<PouchUpdateResponse> {
        if ((docid === undefined) || (docid === null) || (attachmentId === undefined) ||
            (attachmentId === null) || (attachmentData === undefined) ||
            (attachmentData === null) || (attachmentType === undefined) ||
            (attachmentType === null)) {
            throw new Error('Invalid argument(s)');
        }
        let xdb: IPouchDB = null;
        let rev: string = null;
        return this.db.then((d: IPouchDB) => {
            xdb = d;
            return xdb.get(docid);
        }).then((p) => {
            rev = p._rev;
            return xdb.putAttachment(p._id, attachmentId, p._rev, attachmentData, attachmentType);
        }).then((rx) => {
            return rx;
        }, (err: PouchError) => {
            if (err.status == 409) {
                return { ok: true, id: docid, rev: rev };
            } else {
                return { ok: false, id: null, rev: null };
            }
        });
    }// maintains_attachment
    public remove_attachment(docid: string, attachmentId: string): Promise<PouchUpdateResponse> {
        if ((docid === undefined) || (docid === null) || (attachmentId === undefined) ||
            (attachmentId === null)) {
            throw new Error('Invalid argument(s)');
        }
        let xdb: IPouchDB = null;
        return this.db.then((d: IPouchDB) => {
            xdb = d;
            return xdb.get(docid);
        }).then((p) => {
            return xdb.removeAttachment(p._id, attachmentId, p._rev);
        });
    }// maintains_attachment
    public isOnline(): Promise<boolean> {
        let self = this;
        return this.db.then((xdb) => {
            return ((xdb !== undefined) && (xdb !== null));
        });
    }// isOnline
    //
    public remove_item(itemId: string): Promise<PouchUpdateResponse> {
        if ((itemId === undefined) || (itemId === null)) {
            throw new Error('Invalid argument(s)');
        }
        let xdb: IPouchDB = null;
        return this.db.then((d) => {
            xdb = d;
            return xdb.get(itemId);
        }).then((p) => {
            return xdb.remove(p);
        }, (err) => {
            if (err.status != 404) {
                Promise.reject(new Error(err.reason));
            }
            return { ok: false, id: itemId, rev: itemId };
        }).then((rx) => {
            return rx;
        });
    }// remove_one_item
    //

    //
    protected internal_maintains_one_item(xdb: IPouchDB, oMap: IPouchDoc,
        bCheck?: boolean): Promise<IPouchDoc> {
        if ((oMap === undefined) || (oMap === null)) {
            throw new Error("Invalid doc");
        }
        if ((oMap._id === undefined) || (oMap._id === null)) {
            throw new Error("Invalid id");
        }
        let id = oMap._id;
        if ((bCheck !== undefined) && (bCheck !== null) && (bCheck == true)) {
            return xdb.get(id).then((p) => {
                return { ok: true, id: p._id, rev: p._rev };
            }, (err: PouchError) => {
                if (err.status != 404) {
                    Promise.reject(new Error(err.reason));
                }
                return xdb.put(oMap);
            }).then((z) => {
                return xdb.get(id, { attachments: true });
            }, (e2: PouchError) => {
                if (e2.status != 409) {
                    Promise.reject(new Error(e2.reason));
                }
                return xdb.get(id, { attachments: true });
            }).then((pk) => {
                return pk;
            });
        } else {
            return xdb.get(id, { attachments: true }).then((p) => {
                oMap._rev = p._rev;
                if ((p._attachments !== undefined) && (p._attachments !== null)) {
                    oMap._attachments = p._attachments;
                }
                return xdb.put(oMap);
            }, (err: PouchError) => {
                if (err.status != 404) {
                    Promise.reject(new Error(err.reason));
                }
                return xdb.put(oMap);
            }).then((z) => {
                return xdb.get(id, { attachments: true });
            }, (e2: PouchError) => {
                if (e2.status != 409) {
                    Promise.reject(new Error(e2.reason));
                }
                return xdb.get(id, { attachments: true });
            }).then((pk) => {
                return pk;
            });
        }
    }// internal_maintains_one_item
    //
    public remove_all_items(startKey: string, endKey: string): Promise<any> {
        if ((startKey === undefined) || (startKey === null) ||
            (endKey === undefined) || (endKey === null)) {
            return Promise.reject(new Error('Invalid argument(s)'));
        }
        let self = this;
        let docs: any[] = [];
        let options: PouchGetOptions = {
            startkey: startKey, endkey: endKey, include_docs: true
        };
        let rdb: any = null;
        return this.db.then((xdb) => {
            rdb = xdb;
            return rdb.allDocs(options);
        }).then((dd) => {
            for (let x of dd.rows) {
                let d = x.doc;
                d._deleted = true;
                docs.push(d);
            }// x
            if (docs.length > 0) {
                return rdb.bulkDocs(docs);
            } else {
                return [];
            }
        });
    }//remove_all_items
    //
    public get_ids(startKey: string, endKey: string): Promise<string[]> {
        if ((startKey === undefined) || (startKey === null) ||
            (endKey === undefined) || (endKey === null)) {
            throw new Error('Invalid argument(s)');
        }
        let options: PouchGetOptions = {
            startkey: startKey, endkey: endKey
        };
        return this.db.then((xdb) => {
            return xdb.allDocs(options).then((rr) => {
                let oRet: string[] = [];
                if ((rr !== undefined) && (rr !== null) && (rr.rows !== undefined) &&
                    (rr.rows !== null)) {
                    for (let r of rr.rows) {
                        if (r.id !== undefined) {
                            let id = r.id;
                            oRet.push(id);
                        }
                    }// r
                }
                return oRet;
            });
        });
    }//get_ids
    //
    public find_items_array(ids: string[]): Promise<IPouchDoc[]> {
        let oRet: IPouchDoc[] = [];
        if ((ids === undefined) || (ids === null)) {
            return Promise.resolve(oRet);
        }
        if (ids.length < 1) {
            return Promise.resolve(oRet);
        }
        let options: PouchAllDocsOptions = { keys: ids, include_docs: true };
        return this.db.then((xdb) => {
            return xdb.allDocs(options).then((rr) => {
                if ((rr !== undefined) && (rr !== null)) {
                    let data = rr.rows;
                    if ((data !== undefined) && (data !== null)) {
                        for (let r of data) {
                            let bOk = true;
                            if ((r.value !== undefined) && (r.value !== null)) {
                                let val = r.value;
                                if ((val.deleted !== undefined) && (val.deleted !== null)) {
                                    bOk = false;
                                }
                                if ((val.error !== undefined) && (val.error !== null)) {
                                    bOk = false;
                                }
                            }
                            if ((r.doc === undefined) || (r.doc === null)) {
                                bOk = false;
                            }
                            if (bOk) {
                                oRet.push(r.doc);
                            }
                        }// r
                    }// data
                }// rr
                return oRet;
            });
        }).catch((ez) => {
            oRet = [];
            return oRet;
        });
    }//get_items_array
    //
    public maintains_items(items: IPouchDoc[]): Promise<IPouchDoc[]> {
        if ((items === undefined) || (items === null)) {
            throw new Error('Invalid argument(s)');
        }
        let self = this;
        return this.db.then((xdb) => {
            let pp = [];
            for (let item of items) {
                var p = self.internal_maintains_one_item(xdb, item);
                pp.push(p);
            }// item
            return Promise.all(pp);
        });
    }// maintains_items
    public check_items(items: IPouchDoc[]): Promise<IPouchDoc[]> {
        if ((items === undefined) || (items === null)) {
            throw new Error('Invalid argument(s)');
        }
        let self = this;
        return this.db.then((xdb) => {
            let pp = [];
            for (let item of items) {
                var p = self.internal_maintains_one_item(xdb, item, true);
                pp.push(p);
            }// item
            return Promise.all(pp);
        });
    }// check_items
    //
    public find_item_by_id(id: string, bAttach?: boolean): Promise<IPouchDoc> {
        let vRet: any = null;
        if ((id === undefined) || (id === null)) {
            return Promise.resolve(vRet);
        }
        let options: PouchGetOptions = {};
        if ((bAttach !== undefined) && (bAttach !== null) && (bAttach == true)) {
            options.attachments = true;
        }
        return this.db.then((dx) => {
            return dx.get(id, options);
        }).then((pOld) => {
            vRet = ((pOld !== undefined) && (pOld !== null)) ? pOld : null;
            return vRet;
        }, (err) => {
            return Promise.resolve(vRet);
        }).catch((ex) => {
            return Promise.resolve(vRet);
        })
    }//find_item_by_id
    //
    public maintains_doc(doc: IPouchDoc): Promise<PouchUpdateResponse> {
        if (!doc) {
            throw new Error('Invalid argument');
        }
        if ((doc._id === undefined) || (doc._id === null)) {
            throw new Error('Invalid document _id');
        }
        let xdb: IPouchDB = null;
        let rev: string = (doc._rev !== undefined) ? doc._rev : null;
        return this.db.then((dx: IPouchDB) => {
            xdb = dx;
            return xdb.get(doc._id, { attachments: true });
        }).then((pOld) => {
            rev = pOld._rev;
            doc._rev = rev;
            if ((pOld._attachments !== undefined) && (pOld._attachments !== null)) {
                doc._attachments = pOld._attachments;
            }
            return xdb.put(doc);
        }, (ex: PouchError) => {
            if (ex.status == 404) {
                return xdb.put(doc);
            } else {
                throw new Error(ex.reason);
            }
        }).then((rx) => {
            return rx;
        }, (err3: PouchError) => {
            if (err3.status == 409) {
                return { ok: true, id: doc._id, rev: rev };
            } else {
                throw new Error(err3.reason);
            }
        }).catch((ex) => {
            return { ok: false, id: null, rev: null };
        })
    }// maintains_doc
    //
    public get url(): string {
        return this._url;
    }
    //
    public get db(): Promise<IPouchDB> {
        if ((this._db !== undefined) && (this._db !== null)) {
            return Promise.resolve(this._db);
        }
        let self = this;
        return new Promise((resolve, reject) => {
            if (self._local) {
                try {
                    let xx = new PouchDB(self._url, { auto_compaction: true }, (err: PouchError, xdb: any) => {
                        if ((err !== undefined) && (err !== null)) {
                            reject(new Error(err.reason));
                        } else {
                            self._db = ((xdb !== undefined) && (xdb !== null)) ? xdb : null;
                            if (self._db !== null) {
                                resolve(self._db);
                            } else {
                                reject(new Error('Null Database handle'));
                            }
                        }
                    });
                } catch (e) {
                    let ss = ((e !== undefined) && (e !== null)) ? JSON.stringify(e) : 'Error: ';
                    reject(new Error(ss));
                }
            } else {
                try {
                    let xx = new PouchDB(self._url, (err: PouchError, xdb: any) => {
                        if ((err !== undefined) && (err !== null)) {
                            reject(new Error(err.reason));
                        } else {
                            self._db = ((xdb !== undefined) && (xdb !== null)) ? xdb : null;
                            if (self._db !== null) {
                                resolve(self._db);
                            } else {
                                reject(new Error('Null Database handle'));
                            }
                        }
                    });
                } catch (e) {
                    let ss = ((e !== undefined) && (e !== null)) ? JSON.stringify(e) : 'Error: ';
                    reject(new Error(ss));
                }
            }
        });
    }// db
    //
}// class RootDatabase
