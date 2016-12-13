(function(){

	'use strict';

	angular
		.module('Intensive.App')
		.controller('Intensive.App.LoginHomeAdminController', LoginHomeAdminController);

	LoginHomeAdminController.$inject = [
		'$state'
	];	

	function LoginHomeAdminController($state)
	{
		//####################### Instance Properties #######################
		
		var vm = this;

		//####################### Public Methods #######################

		function Initialize()
		{
			$state.go('intensive.activities.querys');
		}

		Initialize();
	}
})();