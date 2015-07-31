//main-init.js
//
var origin = window.location.origin;
var pathname = window.location.pathname;
var baseUrl = origin + pathname.toLowerCase().replace("index.html", "");
require.config({
	baseUrl: baseUrl,
	paths: {
		aurelia: baseUrl + "javascripts/aurelia",
		jquery: baseUrl + "javascripts/jquery/jquery-2.1.4.min",
		bootstrap: baseUrl + "javascripts/bootstrap/js/bootstrap.min",
		webcomponentsjs: baseUrl + "javascripts/webcomponentsjs",
		js: baseUrl + "js",
		/*views: baseUrl + 'js/platform/views',*/
		resources: baseUrl + 'js/platform/resources',
		bluebird: baseUrl + "javascripts/bluebird/bluebird",
		pouchdb: baseUrl + "javascripts/pouchdb/pouchdb.min",
		papaparse: baseUrl + "javascripts/papaparse/papaparse"
	},
	shim: {
		"bootstrap": {
			deps: ["jquery"]
		},
		"pouchdb": {
			exports: "PouchDB"
		},
		"papaparse": {
			exports: "Papa"
		}
	}
});
require(["aurelia/aurelia-bundle-latest"], function (au) {
	require(["aurelia-bundle-manifest"], function (abm) {
		require(["aurelia-bootstrapper"], function (b) {
			//alert("loaded");
		});
	})
});
