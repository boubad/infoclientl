//nav-bar.ts
import {bindable} from 'aurelia-framework';
import * as au from 'aurelia-router';

export class NavBar {
  @bindable router:au.Router = null;
}
