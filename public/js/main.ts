//main.ts
//
import * as au from 'aurelia-framework';

export function configure(aurelia: au.Aurelia) {
	aurelia.use
		.standardConfiguration()
		.developmentLogging()
		.plugin('resources/index');
	aurelia.start().then(a => a.setRoot('js/platform/views/app'));
}
