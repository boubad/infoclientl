//main.ts
//
import * as au from 'aurelia-framework';

export function configure(aurelia: au.Aurelia) {
	aurelia.use
		.standardConfiguration()
		.developmentLogging()
		.plugin('js/resources/index');
	aurelia.start().then(a => a.setRoot('js/views/app'));
}
