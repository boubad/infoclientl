//main-init.js
//
var origin = window.location.origin;
var pathname = window.location.pathname;
var baseUrl = origin + pathname.toLowerCase().replace("index.html", "");
require.config({
	baseUrl: baseUrl,
	paths: {
		aurelia: baseUrl + "javascripts/aurelia",
		webcomponentsjs: baseUrl + "javascripts/webcomponentsjs/webcomponentsjs.min",
		js: baseUrl + "js",
		resources: baseUrl + 'js/platform/resources',
		bluebird: baseUrl + "javascripts/bluebird/bluebird",
		pouchdb: baseUrl + "javascripts/pouchdb/pouchdb.min",
		papaparse: baseUrl + "javascripts/papaparse/papaparse"
	},
	shim: {
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
