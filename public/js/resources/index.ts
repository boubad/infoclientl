// index.ts
//
import {Aurelia} from 'aurelia-framework';
//
export function configure(aurelia: Aurelia) {
		aurelia.globalizeResources(['../nav-bar','../connect-bar','../elements-bar',
			'../avatar-bar','../siglename-bar','../command-bar']);
}
