// profperson.ts
//
import {UserPerson} from './userperson';
import {IEnseignantPerson, IEnseignant, IDatabaseManager} from 'infodata';
import {ENSEIGNANTPERSON_KEY, ROLE_PROF, ENSEIGNANT_BY_PERSON} from '../infoconstants';
//
export class EnseignantPerson extends UserPerson implements IEnseignantPerson {
    public enseignantids: string[] = [];
    //
    constructor(oMap?: any) {
        super(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.enseignantids !== undefined) {
                this.enseignantids = oMap.enseignantids;
            }
        } // oMap
        this.roles = [ROLE_PROF];
    } // constructor
    public to_map(oMap: any): void {
        super.to_map(oMap);
        if ((this.enseignantids !== undefined) && (this.enseignantids !== null) &&
            (this.enseignantids.length > 0)) {
            oMap.enseignantids = this.enseignantids;
        }
    } // to_map
    public from_map(oMap: any): void {
        super.from_map(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            oMap.enseignantids = this.enseignantids;
        }
    }
    public type(): string {
        return ENSEIGNANTPERSON_KEY;
    }
    public remove(service: IDatabaseManager): Promise<any> {
        if ((service === undefined) || (service === null)) {
            return Promise.reject(new Error('Invalid service'));
        }
        if ((this.id === null) || (this.rev === null)) {
            return Promise.reject(new Error('Item not removeable error'));
        }
        let self = this;
        let id: string = this.id;
        return service.get_children_ids(ENSEIGNANT_BY_PERSON, id).then((aa_ids) => {
            return self.remove_with_children(service,aa_ids,id);
        });
    }// remove
} // class EtudiantPerson
