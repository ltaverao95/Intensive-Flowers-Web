(function(){

	'use strict';

	angular
		.module('Intensive.App')
		.controller('Intensive.App.StoreController', storeController);

	storeController.$inject = [
		'$stateParams',
		'GetStoresInfo',
		'Intensive.App.StoreService',
		'Intensive.Blocks.Utils.Constants',
		'Intensive.Blocks.Messages.UserMessagesFactory'
	];	

	function storeController($stateParams,
							 GetStoresInfo,
							 StoreService,
							 UtilsConstants,
							 UserMessagesFactory)
	{
		//####################### Instance Properties #######################

		var vm = this;

		var _paramsDTO = {
			Message: ''
		};

		vm.rootDataStore = {
			name: '',
			surname: '',
			addressToSend: '',
			phone: '',
			email: '',
			orderDescription: '',
			store: '',
			wayToPay: '',
			dateOrder: new Date(),
			dateToSend: new Date(),
			timeToSend: new Date()
		};

		vm.storesToSelect = GetStoresInfo.storesCompleteInfo;
		vm.wayToPaySelect = GetStoresInfo.wayToPay;
		vm.storeNumberToSelect = GetStoresInfo.storeNumber;

		vm.storeDetail = vm.storesToSelect[$stateParams.id];		

		vm.NewOrder = NewOrder;

		//####################### Public Functions #######################

		function NewOrder(){

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
		};
	};

})();