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
		vm.loginPasswordModel = new LoginModel();

		vm.UpdateLoggedUserByID = UpdateLoggedUserByID;
		vm.UpdateCurrentUserPassword = UpdateCurrentUserPassword;
		vm.DeleteCurrentAccount = DeleteCurrentAccount;
		
		//####### Public Methods

		function UpdateLoggedUserByID()
		{
			vm.loginModel.OperationsModel.UpdateItemByID(vm.loginModel).then(
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

		function UpdateCurrentUserPassword()
		{
			var actionResultModel = vm.loginPasswordModel.ValidatePasswordChanged();
			if(actionResultModel.HasError)
			{
				UserMessagesFactory.ShowErrorMessage({ Message: actionResultModel.UIMessage });
				return;
			}

			vm.loginModel.UpdateUserPassword(
				{
					IDLoginUser: vm.loginModel.IDLoginUser,
					Password: vm.loginPasswordModel.Password
				}
			).then(
				responseDTO =>
				{
					if(responseDTO.HasError)
					{
						UserMessagesFactory.ShowErrorMessage({ Message: responseDTO.UIMessage });
						return;
					}

					UserMessagesFactory.ShowSuccessMessage({ Message: responseDTO.UIMessage });
					vm.loginPasswordModel = new LoginModel();
				},
				error => {
					UserMessagesFactory.ShowErrorMessage({ Message: "Ha ocurrido un problema tratando de obtener los datos" });
					console.log(error);
				}
			);
		}

		function DeleteCurrentAccount()
		{
			var response = confirm("¿Estas seguro que deseas eliminar esta cuenta?");

			if(!response)
			{
				return;
			}

			vm.loginModel.OperationsModel.DeleteItemByID(vm.loginModel).then(
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

			vm.loginModel.OperationsModel.GetItemByID(vm.loginModel).then(
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