(function(){

	'use strict';

	angular
		.module('Intensive.App')
		.controller('Intensive.App.StoreDetailController', StoreDetailController);

	StoreDetailController.$inject = [
		'$stateParams',
		'Intensive.Blocks.Utils.Constants'
	];	

	function StoreDetailController($stateParams,
								   UtilsConstants)
	{
		//####################### Instance Properties #######################

		var vm = this;

		vm.storeDetail = UtilsConstants.StoresList[$stateParams.id];	

		//####################### Public Methods #######################

		//####################### Private Methods #######################

		function Initialize()
		{
			
		}

		Initialize();
	}

})();