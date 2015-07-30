// index.ts
//
import {Aurelia} from 'aurelia-framework';
//
export function configure(aurelia: Aurelia) {
		aurelia.globalizeResources(['../sheader-bar','../nav-bar','../user-bar',
		'../elements-bar','../command-bar','../siglename-bar','../avatar-bar',
		'../work-bar','../person-bar','../pagination-bar']);
}
