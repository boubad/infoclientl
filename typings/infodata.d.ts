//infodata.d.ts
declare module "infodata" {
    //
    export interface IInfoMessage {
        type: string;
        categ: string;
        value: any;
        info: string;
        source: any;
        error: string;
        tag: string;
    }// interface IInfoMessage
    export interface IUIManager {
        createUrl: (data: Blob) => string;
        revokeUrl: (s: string) => void;
        confirm: (question: string) => boolean;
    }// interface IUIManager
    export interface IObjectStore {
        get_value: (key: string) => string;
        store_value: (key: string, value: string) => any;
        remove_value: (key: string) => any;
        clear: () => any;
    }// interface IObjectStore
    export interface IFileDesc {
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
        publish: (type: string, payload: any) => void;
        subscribe: (type: string, callback: (payload: any) => any) => void;
        unsubscribe: (type: string) => void;
    }
    export interface ILogManager {
        error: (s: string) => void;
        warn: (s: string) => void;
        info: (s: string) => void;
        debug: (s: string) => void;
    }
    export interface IDatabaseManager {
        itemFactory: IItemFactory;
        //
        dm_get_children_ids: (viewname: string, id: string) => Promise<string[]>;
        dm_maintains_doc: (doc: any) => Promise<any>;
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
        dm_get_groupeevent_evts: (grpeventid: string, bNote?: boolean) => Promise<IEtudEvent[]>;
        dm_get_etudaffectations: (semestreid: string, groupeid: string) => Promise<IEtudAffectation[]>;
        dm_get_person_departements: (personid: string) => Promise<IDepartement[]>;
        dm_get_departement_groupes: (depid: string) => Promise<IGroupe[]>;
        dm_get_departement_unites: (depid: string) => Promise<IUnite[]>;
        dm_get_departement_annees: (depid: string) => Promise<IAnnee[]>;
        dm_get_annee_semestres: (anneeid: string) => Promise<ISemestre[]>;
        dm_get_unite_matieres: (uniteid: string) => Promise<IMatiere[]>;
        dm_get_all_departements: () => Promise<IDepartement[]>;
        dm_get_semestre_matiere_notes: (semestreid: string, matiereid: string) => Promise<IBaseItem[]>;
        dm_get_semestre_evts_ids: (semestreid: string) => Promise<string[]>;
        dm_get_semestre_evts: (semestreid: string) => Promise<IBaseItem[]>;
        dm_get_etudiant_events: (personid: string) => Promise<IBaseItem[]>;
        dm_get_semestre_matiere_groupe_grpevts_ids: (semestreid: string, matiereid: string, groupeid: string) => Promise<string[]>;
        dm_destroy: () => Promise<any>;
    }
	//
	export interface IMenuDesc {
		id: string;
        description?: string;
        text: string;
        url: string;
        has_url?: boolean;
        selected?: boolean;
	}
    //
    export interface IElementDesc extends IMenuDesc {
        rev?: string;
        avatarid?: string;
        deleted: boolean;
        //
        base_prefix: () => string;
        start_key: () => string;
        end_key: () => string;
        create_id: () => string;
        check_id: () => void;
        type: () => string;
        sort_func?: (p1: IElementDesc, p2: IElementDesc) => number;
        avatardocid?: () => string;
        check_url?: (service: IDatabaseManager, man: IUIManager) => Promise<IElementDesc>;
        to_map?: (doc: any) => void;
        from_map?: (doc: any) => void;
    } // interface IElementDesc
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
        absenceString: string;
        retardString: string;
        miscString: string;
        sortCriteria: number;
        matiereSigle:string;
        uniteSigle:string;
        description:string;
        matiereCoefficient:number;
        uniteCoefficient:number;
        order:number;
        //
        _count?: number;
        _sumcoefs?: number;
        _sumdata?: number;
    }// interface IDisplayEtudiant
    export interface IBaseItem extends IElementDesc {


        is_storeable: () => boolean;
        //
        attachments?: any;
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
        coefficient?:number;
    }
    export interface IMatiere extends IDepartementSigleNameItem {
        uniteid: string;
        genre?: string;
        mat_module?: string;
        coefficient?: number;
        ecs?: number;
        order?:number;
    } // interface IMatiere
    export interface IGroupe extends IDepartementSigleNameItem {
		genre?:string;
		childrenids?:string[];
		get_tp_ids: (service: IDatabaseManager)=>Promise<string[]>;
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
        departementids?: string[];
        enseignantids?: string[];
    } // interface IPerson
    export interface IDepBasePerson extends IPerson {
        departementids?: string[];
    }// interface IDepBasePerson
    export interface IAdministratorPerson extends IDepBasePerson {
        administratorids: string[];
    }
    export interface IUserPerson extends IDepBasePerson {
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

    export interface IEnseignantPerson extends IUserPerson {
        enseignantids: string[];
    }
    export interface IDepartementPerson extends IDepartementChildItem {
        personid: string;
        firstname: string;
        lastname: string;
        fullname: string;
        update_person<T extends IDepBasePerson>(pPers: T): void;
        check_avatar?: (service: IDatabaseManager) => Promise<IDepartementPerson>;
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
    export interface IAffectation extends IWorkItem {
        endDate?: Date;
        startDate?: Date;
    }
    export interface IProfAffectation extends IAffectation {
        enseignantid: string;
        uniteid: string;
        matiereid: string;
        uniteSigle: string;
        matiereSigle: string;
    }// IProfAffectationItem
    export interface IEtudAffectation extends IAffectation {
        etudiantid: string;
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
        matiereCoefficient?:number;
        uniteCoefficient?:number;
        order?:number;
    }
    export interface IItemFactory {
        create: (oMap: any, stype?: string) => IBaseItem;
        create_person: (oMap: any) => IPerson;
    }
    export interface ITransformArray {
        transform_map: (oMap: any) => IBaseItem;
        transform_file: (file: File, stype: string) => Promise<any>;
    }

    export interface ILoginInfo {
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
        login: (username: string, passw: string, service: IDatabaseManager) => Promise<boolean>;
    }// interface ILoginInfo

}// module infodata
