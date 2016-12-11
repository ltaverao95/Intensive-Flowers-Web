(function(){

	'use strict';

	angular
		.module('Intensive.App')
		.controller('Intensive.App.StoreController', StoreController);

	StoreController.$inject = [
		'$stateParams',
		'Intensive.Core.Models.StoreModel',
		'Intensive.Blocks.Utils.Constants',
		'Intensive.Blocks.Messages.UserMessagesFactory'
	];	

	function StoreController($stateParams,
							 StoreModel,
							 UtilsConstants,
							 UserMessagesFactory)
	{
		//####################### Instance Properties #######################

		var vm = this;

		vm.storeModel = new StoreModel();

		vm.storesList = UtilsConstants.StoresList;
		vm.wayToPayList = UtilsConstants.WayToPayList;

		vm.storeDetail = vm.storesList[$stateParams.Id];		

		vm.NewOrder = NewOrder;

		//####################### Public Methods #######################

		function NewOrder()
		{
			StoreService.NewOrderMessage(vm.rootDataStore).then(
				function (data){

					if(data.Result == UtilsConstants.EnumResult.ERROR)
					{
						_paramsDTO.Message = data.ResponseMessage;
						UserMessagesFactory.ShowErrorMessage(_paramsDTO);
						return;
					}

					_paramsDTO.Message = data.ResponseMessage;
					UserMessagesFactory.ShowSuccessMessage(_paramsDTO);
				},
				function (error){
					console.log(error);
				}
			);
		}

		function Initialize()
		{
			
		}

		Initialize();
	}

})();