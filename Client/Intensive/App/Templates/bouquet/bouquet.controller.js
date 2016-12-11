(function(){

	'use strict';

	angular
		.module('Intensive.App')
		.controller('Intensive.App.BouquetController', BouquetController);

	BouquetController.$inject = [
		'$stateParams',
		'GetAllBouquets'
	];	

	function BouquetController($stateParams,
							   GetAllBouquets)
	{
		//####################### Instance Properties #######################
		var vm = this;

		vm.searchBouquet = '';

		vm.arrBouquetData = GetAllBouquets.bouquetData;

		vm.bouquetDetail = vm.arrBouquetData[$stateParams.id];
	};

})();