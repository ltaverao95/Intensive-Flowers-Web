(function(){

	'use strict';

	angular
		.module('Intensive.App')
		.controller('Intensive.App.LoginProfileUpdateAdminController', LoginProfileUpdateAdminController);

	LoginProfileUpdateAdminController.$inject = [
		'localStorageService',
		'Intensive.Core.Models.LoginModel',
		'Intensive.Core.Constants',
		'Intensive.Blocks.Messages.UserMessagesFactory'		
	];	

	function LoginProfileUpdateAdminController(localStorageService,
											   LoginModel,
											   CoreConstants,
											   UserMessagesFactory)
	{
		//####################### Instance Properties #######################

		var vm = this;

		vm.loginModel = new LoginModel();

		vm.UpdateLoggedUserByID = UpdateLoggedUserByID;
		
		//####### Public Methods

		function UpdateLoggedUserByID()
		{

		}

		//####### Private Methods

		function GetUserLoggedInfoByID()
		{
			vm.loginModel.UserName = localStorageService.get(CoreConstants.UserLoggedInfoKey);

			vm.loginModel.GetUserLoggedInfoByID().then(
				responseDTO =>
				{
					if(responseDTO.HasError)
					{
						UserMessagesFactory.ShowErrorMessage({ Message: responseDTO.UIMessage });
						return;
					}

					vm.loginModel = new LoginModel(responseDTO.ResponseData[0]);
				},
				error => {
					UserMessagesFactory.ShowErrorMessage({ Message: "Ha ocurrido un problema tratando de obtener los datos" });
					console.log(error);
				}
			);
		}

		function Initialize()
		{
			GetUserLoggedInfoByID();
		}

		Initialize();
	}
})();