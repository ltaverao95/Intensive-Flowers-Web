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
		'Intensive.Blocks.Messages.UserMessagesFactory'
	];	

	function LoginMessageModalAdminController($uibModalInstance,
											  OrderObjData,
											  StoreModel,
											  UtilsConstants,
											  UserMessagesFactory)
	{
		//####################### Instance Properties #######################

		var vm = this;

		vm.storeModel = new StoreModel(OrderObjData);
		vm.storeModel.Store = parseInt(vm.storeModel.Store);
		vm.storeModel.WayToPay = parseInt(vm.storeModel.WayToPay);

		vm.UtilsConstants = UtilsConstants;

		vm.UpdateOrder = UpdateOrder;
		vm.CloseModal = CloseModal;
		
		//####################### Public Functions #######################

		function UpdateOrder()
		{
			LoginOrderAdminService.UpdateOrderByID(clientOrder).then(
				function (data)
				{
					if(data.Result == UtilsConstants.EnumResult.ERROR)
					{
						_paramsDTO.Message = data.ResponseMessage;
						UserMessagesFactory.ShowErrorMessage(_paramsDTO);
						return;
					}

					_paramsDTO.Message = data.ResponseMessage;
					UserMessagesFactory.ShowSuccessMessage(_paramsDTO);
					
					$state.go('intensive.activities.orders');
				},
				function (error)
				{
					console.log(error);
				}
			);
		}

		function CloseModal()
		{
			$uibModalInstance.close();
		}
	};

})();