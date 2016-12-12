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
            var actionResultModel = vm.storeModel.ValidateOrder();
			if(actionResultModel.HasError)
			{
				UserMessagesFactory.ShowErrorMessage({ Message: actionResultModel.UIMessage});
				return;
			}

			vm.storeModel.OperationsModel.SaveItem(vm.storeModel).then(
				responseDTO => {

					if(responseDTO.HasError)
					{
						UserMessagesFactory.ShowErrorMessage({ Message: responseDTO.UIMessage});
						return;
					}

					UserMessagesFactory.ShowSuccessMessage({ Message: responseDTO.UIMessage});
				},
				error => {
					UserMessagesFactory.ShowErrorMessage({ Message: "Ha ocurrido un problema tratando de guardar los datos"});
					console.log(error);
				}
			);
		}

        //####################### Private Methods #######################

        function ClearStoreModel()
        {
            vm.storeModel = new StoreModel();
        }

		function Initialize()
		{
			
		}

		Initialize();
	}

})();