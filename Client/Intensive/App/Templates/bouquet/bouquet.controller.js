(function(){

	'use strict';

	angular
		.module('Intensive.App')
		.controller('Intensive.App.BouquetController', BouquetController);

	BouquetController.$inject = [
		'Intensive.Blocks.Utils.Constants'
	];	

	function BouquetController(UtilsConstants)
	{
		//####################### Instance Properties #######################
		var vm = this;

		vm.UtilsConstants = UtilsConstants;
		vm.searchBouquet = '';
	}
})();