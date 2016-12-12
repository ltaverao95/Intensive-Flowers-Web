(function(){

	'use strict';

	angular
		.module('Intensive.App')
		.controller('Intensive.App.BouquetDetailController', BouquetDetailController);

	BouquetDetailController.$inject = [
		'$stateParams',
		'Intensive.Core.Models.BouquetModel',
		'Intensive.Blocks.Utils.Constants'
	];	

	function BouquetDetailController($stateParams,
							         BouquetModel,
									 UtilsConstants)
	{
		//####################### Instance Properties #######################
		var vm = this;

		vm.bouquetDetail = UtilsConstants.BouquetsList[$stateParams.id];
	}

})();