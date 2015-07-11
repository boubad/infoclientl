//main-init.js
//
var origin = window.location.origin;
var pathname = window.location.pathname;
var baseUrl='/';
require.config({
	baseUrl: baseUrl,
	paths: {
		aurelia: baseUrl + "javascripts/aurelia",
		js: baseUrl + "js",
		resources: baseUrl + 'resources',
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
			// alert("loaded");
		});
	})
});
