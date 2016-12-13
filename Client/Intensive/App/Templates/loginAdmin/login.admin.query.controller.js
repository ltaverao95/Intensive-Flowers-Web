(function(){

	'use strict';

	angular
		.module('Intensive.App')
		.controller('Intensive.App.LoginQueryAdminController', LoginQueryAdminController);

	LoginQueryAdminController.$inject = [
		'Intensive.Blocks.Utils.UtilitiesFactory',
		'Intensive.Blocks.Utils.Constants',
		'Intensive.Blocks.Messages.UserMessagesFactory',
		'Intensive.Core.Models.StoreModel'
	];	

	function LoginQueryAdminController(UtilitiesFactory,
							 		   UtilsConstants,
							 		   UserMessagesFactory,
									   StoreModel)
	{
		//####################### Instance Properties #######################
		
		var vm = this;

		vm.storeModel = new StoreModel();

		vm.UtilsConstants = UtilsConstants;
		vm.showDataTableResult = false;

		vm.QueryOptionChanged = QueryOptionChanged;
		vm.SearchByIdentityCard = SearchByIdentityCard;
		vm.SearchByName = SearchByName;
		vm.SearchByDateAndStoreName = SearchByDateAndStoreName;
		vm.SearchByStore = SearchByStore;
		vm.CleanStoreModel = CleanStoreModel;
		
		//####################### Public Methods #######################

		function QueryOptionChanged()
		{
			for(var i = 0; i < UtilsConstants.QueryOptionsList.length; i++)
			{
				UtilsConstants.QueryOptionsList[i].IsVisible = false;
			}

			if(UtilitiesFactory.IsUndefinedOrNull(vm.storeModel.QueryDataModel.QueryOption))
			{
				return;
			}		

			UtilsConstants.QueryOptionsList[vm.storeModel.QueryDataModel.QueryOption].IsVisible = true;
		}

		function SearchByIdentityCard()
		{
			vm.storeModel.QueryDataModel.SearchByIdentityCard().then(
				responseDTO => {

					if(responseDTO.HasError)
					{
						UserMessagesFactory.ShowErrorMessage({ Message: responseDTO.UIMessage});
						return;
					}

					vm.storeModel.QueryDataModel.QueryDataResult = responseDTO.ResponseData;
					vm.showDataTableResult = true;
				},
				error => {
					UserMessagesFactory.ShowErrorMessage({ Message: "Ha ocurrido un problema tratando de obtener los datos"});
					console.log(error);
				}
			);
		}

		function SearchByName()
		{
			vm.storeModel.QueryDataModel.SearchByName().then(
				responseDTO => {

					if(responseDTO.HasError)
					{
						UserMessagesFactory.ShowErrorMessage({ Message: responseDTO.UIMessage});
						return;
					}

					vm.storeModel.QueryDataModel.QueryDataResult = responseDTO.ResponseData;
					vm.showDataTableResult = true;
				},
				error => {
					UserMessagesFactory.ShowErrorMessage({ Message: "Ha ocurrido un problema tratando de obtener los datos"});
					console.log(error);
				}
			);
		}

		function SearchByDateAndStoreName()
		{
			var fullDate = SetFullDate(vm.queryDataModel.DateToSearch);

			LoginQueryAdminService.SearchByDateAndStoreName({store: vm.queryDataModel.StoreName, dateToSend: fullDate}).then(
				function (data)
				{
					if(data.ResponseMessage != "")
					{
						_paramsDTO.Message = data.ResponseMessage;
						UserMessagesFactory.ShowErrorMessage(_paramsDTO);
						return;
					}

					vm.queryDataModel.ResultData = data.ObjData;
					vm.showDataTableResult = true;
				},
				function (error)
				{
					alert(error.ResponseMessage);
					console.log(error.StackTrace);
				}
			);
		}

		function SearchByStore()
		{
			LoginQueryAdminService.SearchByStore({store: vm.queryDataModel.StoreName}).then(
				function (data)
				{
					if(data.ResponseMessage != "")
					{
						_paramsDTO.Message = data.ResponseMessage;
						UserMessagesFactory.ShowErrorMessage(_paramsDTO);
						return;
					}

					vm.queryDataModel.ResultData = data.ObjData;
					vm.showDataTableResult = true;
				},
				function (error)
				{
					alert(error.ResponseMessage);
					console.log(error.StackTrace);
				}
			);
		}

		function CleanStoreModel()
		{
			vm.storeModel = new StoreModel();
			vm.showDataTableResult = false;
		}

		//##### Private Methods
	}
})();