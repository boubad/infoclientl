//homemodel.ts
//
import {InfoUserInfo} from './infouserinfo';
import {InfoBaseView} from './infobaseview';
import {ADMIN_ROUTE, PROF_ROUTE} from '../utils/infoconstants';
//
export class HomeModel extends InfoBaseView {
    //
    public username: string = null;
    public password: string = null;
    public splashImage:string = null;
    //
    constructor(userinfo: InfoUserInfo) {
        super(userinfo);
    }
    public get canConnect(): boolean {
        return (this.userInfo !== null) && (this.username !== null) && (this.password !== null) &&
            (this.username.trim().length > 0) && (this.password.trim().length > 0);
    }
    public get cannotConnect(): boolean {
        return (!this.canConnect);
    }
    public get loginImage():string {
      return this.images_dir + "login.jpg";
    }
    public get hasSplashImage():boolean {
      return ((this.splashImage !== undefined) && (this.splashImage !== null));
    }
    private homeImage():string {
      if (this.is_super){
        return this.images_dir + "admin.jpg";
      } else if (this.is_admin) {
        return this.images_dir + "oper.jpg";
      } else if (this.is_prof){
        return this.images_dir + "home.jpg";
      } else if (this.is_etud){
        return this.images_dir + "etudiant.jpg";
      } else {
        return this.loginImage;
      }
    }
    public login(): Promise<any> {
        if (!this.canConnect) {
            return Promise.resolve(false);
        }
        this.errorMessage = null;
        let self = this;
        return this.userInfo.login(this.username, this.password).then((bRet) => {
            self.username = null;
            self.password = null;
            let pPers = self.userInfo.person;
            if ((pPers !== null) && (pPers.id !== null)) {
              self.splashImage = self.homeImage();
                if (pPers.is_admin) {
                    self.userInfo.publish_navigation_message(ADMIN_ROUTE);
                } else {
                    self.userInfo.publish_navigation_message(PROF_ROUTE);
                }
                return true;
            } else {
                this.errorMessage = 'Identifiant et(ou) mot de passe non-reconnu(s)...';
                return false;
            }
        }).catch((err) => {
            self.set_error(err);
            return false;
        });
    }// login
    public activate(params?: any, config?: any, instruction?: any): any {
        let self = this;
        this.splashImage = this.homeImage();
        return super.activate(params, config, instruction).then((r) => {
            self.username = null;
            self.password = null;
            return self.dataService.dm_check_database();
        });
    }// activate
}// class Login
