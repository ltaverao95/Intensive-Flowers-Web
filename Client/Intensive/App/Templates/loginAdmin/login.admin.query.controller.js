(function(){

	'use strict';

	angular
		.module('Intensive.App')
		.controller('Intensive.App.LoginQueryAdminController', LoginQueryAdminController);

	LoginQueryAdminController.$inject = [
		'GetStoresInfo',
		'Intensive.App.QueryDataModel',
		'Intensive.App.LoginQueryAdminService',
		'Intensive.Blocks.Utils.Constants',
		'Intensive.Blocks.Messages.UserMessagesFactory'
	];	

	function LoginQueryAdminController(GetStoresInfo,
									   QueryDataModel,
									   LoginQueryAdminService,
							 		   UtilsConstants,
							 		   UserMessagesFactory)
	{
		//####################### Instance Properties #######################
		
		var vm = this;

		var _paramsDTO = {
			Message: ''
		};

		vm.rootObjQuery = new QueryDataModel();

		vm.storeNameToSelect = GetStoresInfo.storeNumber;
		vm.showDataTableResult = false;

		vm.SearchByName = SearchByName;
		vm.SearchByDateAndName = SearchByDateAndName;
		vm.SearchStore = SearchStore;
		vm.CleanQuery = CleanQuery;
		
		//####################### Public Functions #######################

		function SearchByName()
		{
			LoginQueryAdminService.SearchOrderByName({name: vm.rootObjQuery.NameToSearch}).then(
				function (data)
				{
					if(data.ResponseMessage != "")
					{
						_paramsDTO.Message = data.ResponseMessage;
						UserMessagesFactory.ShowErrorMessage(_paramsDTO);
						vm.rootObjQuery.NameToSearch = null;
						return;
					}

					vm.rootObjQuery.ResultData = data.ObjData;
					vm.showDataTableResult = true;
				},
				function (error)
				{
					console.log(error);
				}
			);
		}

		function SearchByDateAndName()
		{
			var fullDate = SetFullDate(vm.rootObjQuery.DateToSearch);

			LoginQueryAdminService.SearchByDateAndName({store: vm.rootObjQuery.StoreName, dateToSend: fullDate}).then(
				function (data)
				{
					if(data.ResponseMessage != "")
					{
						_paramsDTO.Message = data.ResponseMessage;
						UserMessagesFactory.ShowErrorMessage(_paramsDTO);
						return;
					}

					vm.rootObjQuery.ResultData = data.ObjData;
					vm.showDataTableResult = true;
				},
				function (error)
				{
					alert(error.ResponseMessage);
					console.log(error.StackTrace);
				}
			);
		}

		function SearchStore()
		{
			LoginQueryAdminService.SearchByStore({store: vm.rootObjQuery.StoreName}).then(
				function (data)
				{
					if(data.ResponseMessage != "")
					{
						_paramsDTO.Message = data.ResponseMessage;
						UserMessagesFactory.ShowErrorMessage(_paramsDTO);
						return;
					}

					vm.rootObjQuery.ResultData = data.ObjData;
					vm.showDataTableResult = true;
				},
				function (error)
				{
					alert(error.ResponseMessage);
					console.log(error.StackTrace);
				}
			);
		}

		function CleanQuery()
		{
			vm.rootObjQuery = new QueryDataModel();
			vm.showDataTableResult = false;
		}

		//##### Private Methods

		function SetFullDate(date)
		{
			var yyyy = vm.rootObjQuery.DateToSearch.getFullYear();
			var dd = vm.rootObjQuery.DateToSearch.getDate();
			var mm = vm.rootObjQuery.DateToSearch.getMonth() +1;

			if(mm <= 9)
			{
				mm = "0" + mm;
			}

			if(dd <= 9)
			{
				dd = "0" + dd;
			}

			var date = yyyy + "-" + mm + "-" + dd;

			return date;
		}
	};

})();