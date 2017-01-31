(function(){

	'use strict';

	angular
		.module('Intensive.App')
		.controller('Intensive.App.StoreController', StoreController);

	StoreController.$inject = [
		'Intensive.Blocks.Utils.Constants'
	];	

	function StoreController(UtilsConstants)
	{
		//####################### Instance Properties #######################

		var vm = this;

		vm.UtilsConstants = UtilsConstants;

		//####################### Public Methods #######################

		//####################### Private Methods #######################
		
		function Initialize()
		{
			
		}

		Initialize();
	}

})();