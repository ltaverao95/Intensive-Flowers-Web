(function(){

	'use strict';

	angular
		.module('Intensive.App')
		.controller('Intensive.App.LoginOrderModalAdminController', LoginOrderModalAdminController);

	LoginOrderModalAdminController.$inject = [
		'$uibModalInstance',
		'$rootScope',
		'OrderObjData',
		'Intensive.Core.Models.StoreModel',
		'Intensive.Blocks.Utils.Constants',
		'Intensive.Blocks.Messages.UserMessagesFactory'
	];	

	function LoginOrderModalAdminController($uibModalInstance,
											$rootScope,
											OrderObjData,
											StoreModel,
											UtilsConstants,
											UserMessagesFactory)
	{
		//####################### Instance Properties #######################

		var vm = this;

		vm.storeModel = new StoreModel(OrderObjData);

		vm.UtilsConstants = UtilsConstants;

		vm.UpdateOrder = UpdateOrder;
		vm.CloseModal = CloseModal;
		
		
		//####################### Public Functions #######################

		function UpdateOrder()
		{
			var actionResultModel = vm.storeModel.ValidateOrder();
			if(actionResultModel.HasError)
			{
				UserMessagesFactory.ShowErrorMessage({ Message: actionResultModel.UIMessage });
				return;
			} 

			vm.storeModel.OperationsModel.UpdateItemByID(vm.storeModel).then(
				responseDTO => {

					if(responseDTO.HasError)
					{
						UserMessagesFactory.ShowErrorMessage({ Message: responseDTO.UIMessage});
						return;
					}

					UserMessagesFactory.ShowSuccessMessage({ Message: responseDTO.UIMessage});
					CloseModal();
					$rootScope.$broadcast('OrderChanged');
				},
				error => {
					UserMessagesFactory.ShowErrorMessage({ Message: "Ha ocurrido un problema tratando de actualizar los datos"});
					CloseModal();
					console.log(error);
				}
			);
		}

		//####### Private Methods

		function CloseModal()
		{

			if(!vm.storeModel.IsReadOnlyMode)
			{
				var actionResultModel = vm.storeModel.ValidateOrder();
				if(actionResultModel.HasError)
				{
					UserMessagesFactory.ShowErrorMessage({ Message: actionResultModel.UIMessage });
					return;
				}
			}

			$uibModalInstance.close();
		}

		function SetCurrentDateFormat(currentDate)
		{
			currentDate = currentDate.split("-");
			currentDate[1] -= 1;

			return currentDate;
		}

		function Initialize()
		{
			vm.storeModel.Store = parseInt(vm.storeModel.Store);
			vm.storeModel.WayToPay = parseInt(vm.storeModel.WayToPay);
			
			vm.storeModel.DateOrder = new Date(...SetCurrentDateFormat(vm.storeModel.DateOrder));
			vm.storeModel.DateToSend = new Date(...SetCurrentDateFormat(vm.storeModel.DateToSend));
		}

		Initialize();
	}
})();