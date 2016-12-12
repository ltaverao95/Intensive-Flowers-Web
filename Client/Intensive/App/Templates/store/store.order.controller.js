(function(){

	'use strict';

	angular
		.module('Intensive.App')
		.controller('Intensive.App.StoreOrderController', StoreOrderController);

	StoreOrderController.$inject = [
		'$stateParams',
		'Intensive.Core.Models.StoreModel',
		'Intensive.Blocks.Utils.Constants',
		'Intensive.Blocks.Messages.UserMessagesFactory'
	];	

	function StoreOrderController($stateParams,
							      StoreModel,
							      UtilsConstants,
							      UserMessagesFactory)
	{
		//####################### Instance Properties #######################

		var vm = this;

		vm.storeModel = new StoreModel();

		vm.UtilsConstants = UtilsConstants;

        vm.storeDetail = UtilsConstants.StoresList[$stateParams.id];
		vm.storeModel.Store = parseInt($stateParams.id);		

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

        //####################### Private Methods #######################

		function Initialize()
		{
			
		}

		Initialize();
	}

})();