(function(){

	'use strict';

	angular
		.module('Intensive.App')
		.controller('Intensive.App.LoginOrderModalAdminController', LoginMessageModalAdminController);

	LoginMessageModalAdminController.$inject = [
		'$uibModalInstance',
		'OrderObjData',
		'Intensive.App.LoginOrderAdminService',
		'Intensive.Blocks.Utils.Constants',
		'Intensive.Blocks.Messages.UserMessagesFactory'
	];	

	function LoginMessageModalAdminController($uibModalInstance,
											  OrderObjData,
											  LoginOrderAdminService,
											  UtilsConstants,
											  UserMessagesFactory)
	{
		//####################### Instance Properties #######################

		var vm = this;

		vm.rootModalOrder = {
			orderData: OrderObjData
		};

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