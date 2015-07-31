// index.ts
//
import {Aurelia} from 'aurelia-framework';
//
export function configure(aurelia: Aurelia) {
		aurelia.globalizeResources(['../sheader-bar','../nav-bar',
		'../elements-bar','../command-bar','../siglename-bar','../avatar-bar',
		'../work-bar','../person-bar','../pagination-bar','../interval-bar',
		'../depart-bar','../depannee-bar','../depunite-bar']);
}
