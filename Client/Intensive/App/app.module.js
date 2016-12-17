(function(){

	'use strict';

	angular
		.module('Intensive.App', [
			'ui.router',
			'ngAnimate',
			'ui.bootstrap',
			'toaster',
			'LocalStorageModule',
			
			'Intensive.Blocks.Utils',
			'Intensive.Blocks.Log',
			'Intensive.Blocks.Messages',
			'Intensive.Core'
		]);
})();