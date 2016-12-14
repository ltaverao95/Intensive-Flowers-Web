(function(){

	'use strict';

	angular
		.module('Intensive.App')
		.controller('Intensive.App.LoginOrderModalAdminController', LoginMessageModalAdminController);

	LoginMessageModalAdminController.$inject = [
		'$uibModalInstance',
		'OrderObjData',
		'Intensive.Core.Models.StoreModel',
		'Intensive.Blocks.Utils.Constants',
		'Intensive.Blocks.Utils.UtilitiesFactory',
		'Intensive.Blocks.Messages.UserMessagesFactory'
	];	

	function LoginMessageModalAdminController($uibModalInstance,
											  OrderObjData,
											  StoreModel,
											  UtilsConstants,
											  UtilitiesFactory,
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

			);
		}

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