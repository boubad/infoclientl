//etudeventreportmodel.ts
//
import {InfoUserInfo} from './infouserinfo';
import {SemestreReportBase} from './semestrereportmodel';
import {EtudEvent} from '../domain/etudevent';
import {DisplayEtudiant, DisplayEtudiantsArray} from '../utils/displayetudiant';
import {IDisplayEtudiant, IEtudEvent} from 'infodata';
//
export class EtudEventReportModel extends SemestreReportBase {
    //
    constructor(userinfo: InfoUserInfo) {
        super(userinfo);
        this.title = 'Evènements Semestres';
    }// constructor

    protected get_initial_events(): Promise<IEtudEvent[]> {
        return this.dataService.dm_get_semestre_evts(this.semestreid);
    }
    protected transform_data(pp: IEtudEvent[]): Promise<IDisplayEtudiant[]> {
        let oRet: IDisplayEtudiant[] = [];
        if ((pp !== undefined) && (pp !== null)) {
            let grp: DisplayEtudiantsArray = new DisplayEtudiantsArray();
            for (let p of pp) {
                grp.add_event(p);
            }
            oRet = grp.get_sorted_etudiantdisplays();
        }// pp
        return Promise.resolve(oRet);
    }// transformData

}// class BaseEditViewModel
