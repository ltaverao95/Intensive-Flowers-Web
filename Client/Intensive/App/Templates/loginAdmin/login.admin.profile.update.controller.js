(function(){

	'use strict';

	angular
		.module('Intensive.App')
		.controller('Intensive.App.LoginProfileUpdateAdminController', LoginProfileUpdateAdminController);

	LoginProfileUpdateAdminController.$inject = [
		'$window',
		'$state',
		'localStorageService',
		'Intensive.Core.Models.LoginModel',
		'Intensive.Core.Constants',
		'Intensive.Blocks.Messages.UserMessagesFactory'		
	];	

	function LoginProfileUpdateAdminController($window,
											   $state,
											   localStorageService,
											   LoginModel,
											   CoreConstants,
											   UserMessagesFactory)
	{
		//####################### Instance Properties #######################

		var vm = this;

		vm.loginModel = new LoginModel();

		vm.UpdateLoggedUserByID = UpdateLoggedUserByID;
		vm.DeleteCurrentAccount = DeleteCurrentAccount;
		
		//####### Public Methods

		function UpdateLoggedUserByID()
		{
			vm.loginModel.UpdateLoggedUserByID().then(
				responseDTO =>
				{
					if(responseDTO.HasError)
					{
						UserMessagesFactory.ShowErrorMessage({ Message: responseDTO.UIMessage });
						return;
					}

					UserMessagesFactory.ShowSuccessMessage({ Message: responseDTO.UIMessage });
				},
				error => {
					UserMessagesFactory.ShowErrorMessage({ Message: "Ha ocurrido un problema tratando de obtener los datos" });
					console.log(error);
				}
			);
		}

		function DeleteCurrentAccount()
		{
			var response = confirm("¿Estas seguro que deseas eliminar todos los registros?");

			if(!response)
			{
				return;
			}

			vm.loginModel.DeleteCurrentAccount().then(
				responseDTO =>
				{
					if(responseDTO.HasError)
					{
						UserMessagesFactory.ShowErrorMessage({ Message: responseDTO.UIMessage });
						return;
					}

					UserMessagesFactory.ShowSuccessMessage({ Message: responseDTO.UIMessage });

					vm.loginModel.LogOut().then(
						responseDTO => {

							if(responseDTO.HasError)
							{
								localStorageService.clearAll();
								UserMessagesFactory.ShowErrorMessage({ Message: responseDTO.UIMessage});
								return;
							}

							localStorageService.remove(CoreConstants.UserLoggedInfoKey)
							$state.go('intensive.home');
							$window.location.reload();
						},
						error => {
							UserMessagesFactory.ShowErrorMessage({ Message: "Ha ocurrido un problema tratando de cerrar la sesión"});
							localStorageService.clearAll();
							console.log(error);
						}
					);
				},
				error => {
					UserMessagesFactory.ShowErrorMessage({ Message: "Ha ocurrido un problema tratando de borrar los datos" });
					console.log(error);
				}
			);
		}

		//####### Private Methods

		function GetUserLoggedInfoByID()
		{
			vm.loginModel.IDLoginUser = localStorageService.get(CoreConstants.UserLoggedInfoKey);

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