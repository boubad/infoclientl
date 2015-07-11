//infodata.d.ts
/// <reference path="./es6.d.ts"/>
/// <reference path="./pouchdb/pouchdb.d.ts"/>
//
declare module "infodata" {
    //
    export interface IInfoElement {
        create_crypted_password?: (sClearText: string) => string;
        check_password?: (expectedClear: string, actualCrypted) => boolean;
        format_note?: (s: number) => number;
        create_username?: (slast: string, sfirst: string) => string;
        create_random_id?: () => string;
        create_date_id?: (seed: Date) => string;
        create_date_random_id?: (seed?: Date) => string;
        check_value? :(v: any) => any;
        check_string?: (s: string) => string;
        check_upper_string?: (s: string) => string;
        check_lower_string?: (s: string) => string;
        check_array?: (cont: any[]) => any[];
        add_id_to_array?: (cont: string[], id: string) => void;
        string_to_date?: (s: any) => Date;
        date_to_string?: (d: Date) => string;
        number_to_string?: (n: number) => string;
        string_to_number?: (s: any) => number;
        check_date?: (d: Date) => Date;
        check_number?: (s: any) => number;
    }
    //
    export interface IInfoMessage extends IInfoElement {
        type: string;
        categ?: string;
        value?: any;
        info?: string;
        source?: any;
        error?: string;
        tag?: string;
    }// interface IInfoMessage
    //
    export interface IPouchDoc extends IInfoElement {
        _id?: string;
        _rev?: string;
        _deleted?: boolean;
        _attachments?: any;
        type?: string;
    }// IPouchDocument
    export interface IRootDatabaseManager extends IInfoElement {
        get_children_ids: (viewName: string, keyVal: string) => Promise<string[]>;
        maintains_design_doc: (doc: IPouchDoc) => Promise<PouchUpdateResponse>;
        query_by_keys: (viewName: string, startKey: string, endKey: string) => Promise<IPouchDoc[]>;
        find_attachment: (docid: string, attachmentId: string) => Promise<Blob>;
        maintains_attachment: (docid: string, attachmentId: string,
        attachmentData: Blob , attachmentType: string) => Promise<PouchUpdateResponse>;
        remove_attachment: (docid: string, attachmentId: string) => Promise<PouchUpdateResponse>;
        remove_item: (itemId: string) => Promise<PouchUpdateResponse>;
        maintains_items: (items: IPouchDoc[]) => Promise<IPouchDoc[]>;
        check_items: (items: IPouchDoc[]) => Promise<IPouchDoc[]>;
        remove_all_items: (startKey: string, endKey: string) => Promise<any>;
        get_ids: (startKey: string, endKey: string) => Promise<string[]>;
        find_items_array: (ids: string[]) => Promise<IPouchDoc[]>;
        find_item_by_id: (id: string, bAttach?: boolean) => Promise<IPouchDoc>;
        maintains_doc: (doc: IPouchDoc) => Promise<PouchUpdateResponse>;
        url: string;
        isOnline: () => Promise<boolean>;
    }
    export interface IDesignDatabaseManager extends IRootDatabaseManager {
        check_admin: () => Promise<any>;
        check_database: () => Promise<any>
    }
    //
    export interface IDatabaseManager extends IDesignDatabaseManager {
        itemFactory: IItemFactory;
        //
        dm_is_online: () => Promise<boolean>;
        dm_check_database: () => Promise<any>
        dm_query_by_keys: (viewName: string, startKey: string, endKey: string) => Promise<IBaseItem[]>;
        dm_remove_item: (item: IBaseItem) => Promise<boolean>;
        dm_find_items_array: (ids: string[]) => Promise<IBaseItem[]>;
        dm_check_items: (items: IBaseItem[]) => Promise<any>;
        dm_maintains_items: (items: IBaseItem[]) => Promise<any>;
        dm_maintains_item: (item: IBaseItem) => Promise<IBaseItem>;
        dm_find_item_by_id: (id: string, bAttach?: boolean) => Promise<IBaseItem>;
        dm_get_ids: (startKey: string, endKey: string) => Promise<string[]>;
        dm_get_items: (startKey: string, endKey: string) => Promise<IBaseItem[]>;
        //
        dm_find_attachment: (docid: string, attachmentId: string) => Promise<Blob>;
        dm_maintains_attachment: (docid: string, attachmentId: string, attachmentData: Blob, attachmentType: string) => Promise<boolean>;
        dm_remove_attachment: (docid: string, attachmentId: string) => Promise<boolean>;
        dm_get_groupeevent_all_notes: (grpeventid: string) => Promise<IEtudEvent[]>;
        dm_get_groupeevent_evts :(grpeventid: string, bNote?: boolean) => Promise<IEtudEvent[]>;
        dm_get_etudaffectations: (semestreid: string, groupeid: string) => Promise<IEtudAffectation[]>;
        dm_get_person_departements : (personid: string) => Promise<IDepartement[]>;
        dm_get_departement_groupes : (depid: string) => Promise<IGroupe[]>;
        dm_get_departement_unites: (depid: string) => Promise<IUnite[]>;
        dm_get_departement_annees: (depid: string) => Promise<IAnnee[]> ;
        dm_get_annee_semestres: (anneeid: string) => Promise<ISemestre[]>;
        dm_get_unite_matieres: (uniteid: string)=> Promise<IMatiere[]>;
        dm_get_all_departements: ()=> Promise<IDepartement[]>;
    }
    //
    export interface IUIManager extends IInfoElement {
        createUrl: (data: Blob ) => string;
        revokeUrl: (s: string) => void;
        confirm: (question: string) => boolean;
    }
    export interface IObjectStore extends IInfoElement {
        get_value: (key: string) => string;
        store_value: (key: string, value: string) => any;
        remove_value: (key: string) => any;
        clear: () => any;
    }// interface IObjectStore
    //
    export interface IElementDesc extends IInfoElement {
        text: string;
        url: string;
        has_url: boolean;
        selected: boolean;
        sort_func: (p1: IElementDesc, p2: IElementDesc) => number;
        avatarid: string;
        avatardocid: () => string;
        check_url: (service: IRootDatabaseManager, man: IUIManager) => Promise<IElementDesc>;
        to_map: (doc: any) => void;
        from_map: (doc: any) => void;
        description:string;
    }
    export interface IDisplayEtudiant extends IElementDesc {
        personid: string;
        etudiantid: string;
        uniteid: string;
        matiereid: string;
        groupeid: string;
        firstname: string;
        lastname: string;
        coefficient: number;
        coefficientString: string;
        note: number;
        noteString: string;
        absencesCount: number;
        retardsCount: number;
        miscCount: number;
        notesCount: number;
        fullname: string;
        groupeSigle: string;
    }// interface IDisplayEtudiant
    export interface IBaseItem extends IElementDesc {
        id: string;
        rev: string;
        deleted: boolean;
        //
        type: () => string;
        base_prefix: () => string;
        start_key: () => string;
        end_key: () => string;
        create_id: () => string;
        check_id: () => void;
        is_storeable: ()  => boolean;
    //
    attachments ?: any;
    //
    load: (service: IDatabaseManager) => Promise<IBaseItem>;
    save: (service: IDatabaseManager) => Promise<IBaseItem>;
    remove: (service: IDatabaseManager) => Promise<any>;
}// interface IBaseItem
export interface ISigleNameItem extends IBaseItem {
    sigle: string;
    name: string;
}
export interface IDepartement extends ISigleNameItem {

}
export interface IDepartementSigleNameItem extends ISigleNameItem {
    departementid: string;
}
export interface IUnite extends IDepartementSigleNameItem {

}
export interface IMatiere extends IDepartementSigleNameItem {
    uniteid: string;
    genre?: string;
    mat_module?: string;
    coefficient?: number;
    ecs?: number;
} // interface IMatiere
export interface IGroupe extends IDepartementSigleNameItem {

}
export interface IIntervalItem extends IDepartementSigleNameItem {
    startDate: Date;
    endDate: Date;
}
export interface IAnnee extends IIntervalItem {

}
export interface ISemestre extends IIntervalItem {
    anneeid: string;
}
export interface IDepartementChildItem extends IBaseItem {
    departementid: string;
} // IDepartementChildItem
export interface IPerson extends IBaseItem {
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    email?: string;
    phone?: string;
    roles: string[];
    //
    departementids?: string[];
    anneeids?: string[];
    semestreids?: string[];
    uniteids?: string[];
    matiereids?: string[];
    groupeids?: string[];
    //
    reset_password: () => void;
    change_password: (ct: string) => void;
    check_password: (ct: string) => boolean;
    has_role: (r: string) => boolean;
    is_super: boolean;
    is_admin: boolean;
    is_prof: boolean;
    is_etud: boolean;
    //
    fullname: string;
    //
    affectationids?: string[];
    eventids?: string[];
    administratorids?: string[];
    enseignantids?: string[];
    etudiantids?: string[];
} // interface IPerson
export interface IUserPerson extends IPerson {
    anneeids: string[];
    semestreids: string[];
    uniteids: string[];
    matiereids: string[];
    groupeids: string[];
    affectationids: string[];
    eventids: string[];
}
export interface IEtudiantPerson extends IUserPerson {
    etudiantids: string[];
    dossier?: string;
    sexe?: string;
    birthDate?: Date;
    ville?: string;
    etablissement?: string;
    serieBac?: string;
    optionBac?: string;
    mentionBac?: string;
    etudesSuperieures?: string;
    //
    isMale?: boolean;
    isFeminin?: boolean;
}// interface IEtudiantPerson
export interface IAdministratorPerson extends IPerson {
    administratorids: string[];
}
export interface IEnseignantPerson extends IUserPerson {
    enseignantids: string[];
}
export interface IDepartementPerson extends IDepartementChildItem {
    personid: string;
    firstname: string;
    lastname: string;
    fullname: string;
    update_person: (pPers: IPerson) => void;
} // interface IDepartementPerson
export interface IEnseignant extends IDepartementPerson {

}// interface IEnseignant
export interface IAdministrator extends IDepartementPerson {

}// interface IAdministrator
export interface IEtudiant extends IDepartementPerson {

}// interface IEtudiant
export interface IWorkItem extends IDepartementPerson {
    anneeid: string;
    semestreid: string;
    groupeid: string;
    eventDate?: Date;
    status?: string;
    genre?: string;
    semestreSigle?: string;
    anneeSigle?: string;
    departementSigle?: string;
    groupeSigle?: string;
} // interface IWorkItem
export interface IMatiereWorkItem extends IWorkItem {
    uniteid: string;
    matiereid: string;
    uniteSigle: string;
    matiereSigle: string;
}
export interface IProfAffectation extends IMatiereWorkItem {
    enseignantid: string;
    startDate?: Date;
    endDate?: Date;
}// IProfAffectationItem
export interface IEtudAffectation extends IWorkItem {
    etudiantid: string;
    startDate?: Date;
    endDate?: Date;
}
export interface IGroupeEvent extends IMatiereWorkItem {
    profaffectationid: string;
    name: string;
    location?: string;
    startTime?: Date;
    endTime?: Date;
    coefficient?: number;
} // IGroupeEvent
export interface IEtudEvent extends IMatiereWorkItem {
    etudaffectationid: string;
    groupeeventid: string;
    etudiantid?: string;
    note: number;
    groupeEventName?: string;
    coefficient?: number;
}
export interface IItemFactory extends IInfoElement {
    create: (oMap: IPouchDoc, stype?: string) => IBaseItem;
    create_person: (oMap: IPouchDoc) => IPerson;
}
export interface ITransformArray extends IInfoElement {
    transform_map: (oMap: any) => IBaseItem;
    transform_file: (file: File, stype: string) => Promise<any>;
}
export interface IFileDesc extends IInfoElement {
    name: string;
    type: string;
    data: Blob;
    url: string;
    //
    has_url: boolean;
    is_storeable: boolean;
    clear: () => void;
    changed: (evt: any) => any;
    remove_url: () => string;
}// interface IFileDesc
export interface IMessageManager {
  publish: (type:string,payload:any)=> void;
  subscribe: (type:string,callback:(payload:any)=>any) => void;
  unsubscribe: (type:string) => void;
}
export interface ILogManager {
  error: (s:string)=> void;
  warn: (s:string)=> void;
  info: (s:string)=> void;
  debug: (s:string)=> void;
}
export interface ILoginInfo extends IInfoElement {
        person: IPerson;
        departements: IDepartement[];
        annees: IAnnee[];
        semestres: ISemestre[];
        unites: IUnite[];
        matieres: IMatiere[];
        groupes: IGroupe[];
        administrator: IAdministrator;
        enseignant: IEnseignant;
        etudiant: IEtudiant;
        //
        is_super: boolean;
        is_admin: boolean;
        is_prof: boolean;
        is_etud: boolean;
        //
        clear: () => void;
        login: (username: string, passw:string,service: IDatabaseManager) => Promise<boolean>;
    }// interface ILoginInfo
}// module infodata
