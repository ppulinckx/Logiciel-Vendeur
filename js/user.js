(function () {

	'use strict';

	var tst = angular.module('test', []);
	tst.controller('StoreController', function ($sce) {

		var store = this;
		this.default = {
			option : "Veuillez choisir...",
			surface : 100,
		}

		var test = function(t) {
			 return t;
		 }

	});

})();
