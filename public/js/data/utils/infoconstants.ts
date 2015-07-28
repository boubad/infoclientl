//infoconstants.ts
//
import {InfoElement} from './infoelement';
//
export const EMPTY_STRING: string = '';
//
export const SYNC_CHANNEL: string = 'sync_channel';
export const SYNC_OUT: string = 'sync_out';
export const SYNC_IN: string = 'sync_in';
export const SYNC_DATABASE: string = 'sync_database';
export const SYNC_PAUSED: string = 'sync_paused';
export const SYNC_COMPLETED: string = 'sync_completed';
export const SYNC_ERROR: string = 'sync_error';
export const SYNC_CHANGED: string = 'sync_changed';
export const SYNC_STARTED: string = 'sync_started';
export const SYNC_DENIED: string = 'sync_denied';
export const SYNC_RESUMED: string = 'sync_resumed';
//
export const DATABASE_NAME: string = 'geninfo';
export const REMOTESERVERSLIST_KEY: string = 'remoteservers';
export const DEFAULT_SERVERS:string[] = ['http://localhost:5984/geninfo','http://boubadiarra.hd.free.fr:5984/geninfo'];
//
export const INFO_MESSAGE_CHANNEL: string = 'genmessage';
export const INFO_MESSAGE: string = 'infomsg';
export const ERROR_MESSAGE: string = 'errormsg';
export const MESSAGE_LOGIN: string = 'login';
export const MESSAGE_LOGOUT: string = 'logout';
export const MESSAGE_DOMAIN: string = 'domain';
export const MESSAGE_NAVIGATE: string = 'navigate';
export const MESSAGE_REFRESH:string = 'refresh';
export const MESSAGE_REFRESHALL:string = 'refreshall';
export const HOME_ROUTE:string = 'welcome';
export const ADMIN_ROUTE:string = 'admin-router';
export const PROF_ROUTE:string = 'prof-router';
//
export const PERSON_KEY: string = 'person';
export const ETUDIANTPERSON_KEY: string = 'etudperson';
export const ADMINISTRATORPERSON_KEY: string = 'adminperson';
export const ENSEIGNANTPERSON_KEY: string = 'profperson';
export const DEPARTEMENTID_KEY: string = 'departementid';
export const ANNEEID_KEY: string = 'anneeid';
export const SEMESTREID_KEY: string = 'semestreid';
export const UNITEID_KEY: string = 'uniteid';
export const MATIEREID_KEY: string = 'matiereid';
export const GROUPEID_KEY: string = 'groupeid';
export const ENSEIGNANTID_KEY: string = 'enseignantid';
export const ETUDIANTID_KEY: string = 'etudiantid';
//
export const ROLE_SUPER: string = 'super';
export const ROLE_ADMIN: string = 'admin';
export const ROLE_PROF: string = 'prof';
export const ROLE_ETUD: string = 'etud';
export const SUPER_USERNAME: string = 'admin';
export const SUPER_LASTNAME: string = 'SYSTEM';
export const SUPER_FIRSTNAME: string = 'Administrator';
//
export const BASEITEM_TYPE:string = 'baseitem';
export const BASEITEM_PREFIX:string = 'BAS';
export const ANNEE_TYPE: string = 'annee';
export const ANNEE_PREFIX: string = 'ANN';
export const DEPARTEMENT_TYPE: string = 'departement';
export const DEPARTEMENT_PREFIX: string = 'DEP';
export const ENSEIGNANT_TYPE: string = 'enseignant';
export const ENSEIGNANT_PREFIX: string = 'PRF';
export const ETUDAFFECTATION_TYPE: string = 'etudaffectation';
export const ETUDAFFECTATION_PREFIX: string = 'ETF';
export const ETUDEVENT_TYPE: string = 'etudevent';
export const ETUDEVENT_PREFIX: string = 'EVT';
export const ETUDIANT_TYPE: string = 'etudiant';
export const ETUDIANT_PREFIX: string = 'ETD';
export const GROUPE_TYPE: string = 'groupe';
export const GROUPE_PREFIX: string = 'GRP';
export const MATIERE_TYPE: string = 'matiere';
export const MATIERE_PREFIX: string = 'MAT';
export const PERSON_PREFIX: string = 'PER';
export const PERSON_TYPE = PERSON_KEY;
export const ETUDIANTPERSON_TYPE = ETUDIANTPERSON_KEY;
export const ADMINISTRATORPERSON_TYPE = ADMINISTRATORPERSON_KEY;
export const ENSEIGNANTPERSON_TYPE = ENSEIGNANTPERSON_KEY;
export const PROFAFFECTATION_TYPE: string = 'profaffectation';
export const PROFAFFECTATION_PREFIX: string = 'AFP';
export const SEMESTRE_TYPE: string = 'semestre';
export const SEMESTRE_PREFIX: string = 'SEM';
export const UNITE_TYPE: string = 'unite';
export const UNITE_PREFIX: string = 'UNT';
export const GROUPEEVENT_TYPE: string = 'groupeevent';
export const GROUPEEVENT_PREFIX: string = 'GVT';
export const ADMINISTRATOR_TYPE: string = 'administrator';
export const ADMINISTRATOR_PREFIX: string = 'ADM';
//
export const ETUDEVENTS_BY_GROUPEEVENT:string ='etudevents/by_groupeevent';
export const ETUDEVENTS_BY_ETUDAFFECTATION:string ='etudevents/by_groupeevent';
export const GROUPEEVENT_BY_PROFAFFECTATION:string = 'groupeevents/by_profaffectation';
export const GROUPEEVENTS_BY_SEMESTRE_MATIERE_GROUPE ='groupeevents/by_semestre_matiere_groupe';
export const PROFAFFECTATION_BY_SEMESTRE:string='profaffectations/by_semestre';
export const PROFAFFECTATION_BY_MATIERE:string='profaffectations/by_matiere';
export const PROFAFFECTATION_BY_GROUPE:string='profaffectations/by_groupe';
export const PROFAFFECTATION_BY_PERSON:string='profaffectations/by_person';
export const PROFAFFECTATION_BY_ENSEIGNANT:string='profaffectations/by_enseignant';
export const ETUDAFFECTATION_BY_SEMESTRE:string='etudaffectations/by_semestre';
export const ETUDAFFECTATION_BY_GROUPE:string='etudaffectations/by_groupe';
export const ETUDAFFECTATION_BY_PERSON:string='etudaffectations/by_person';
export const ETUDAFFECTATION_BY_ETUDIANT:string='etudaffectations/by_etudiant';
export const SEMESTRE_BY_ANNEE:string='semestres/by_annee';
export const MATIERE_BY_UNITE:string='matieres/by_unite';
export const UNITE_BY_DEPARTEMENT:string='unites/by_departement';
export const ANNEE_BY_DEPARTEMENT:string='annees/by_departement';
export const GROUPE_BY_DEPARTEMENT:string='groupes/by_departement';
export const ETUDIANT_BY_PERSON:string='etudiants/by_person';
export const ENSEIGNANT_BY_PERSON:string='enseignants/by_person';
//
export const ETUDEVENTS_BY_PERSON:string ='etudevents/by_id';
export const ETUDEVENTS_BY_SEMESTRE_NOTES:string ='etudevents/by_semestre_notes';
export const ETUDEVENTS_BY_SEMESTRE_EVTS:string ='etudevents/by_semestre_evts';
export const NOTES_BY_SEMESTRE_MATIERE:string ='etudevents/by_semestre_matiere_notes';
//
export const PERSONS_BY_LASTNAME_FIRSTNAME:string ='persons/by_names';
