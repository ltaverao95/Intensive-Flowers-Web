(function(){

	'use strict';

	angular
		.module('Intensive.App')
		.controller('Intensive.App.LoginUserController', LoginUserController);

	LoginUserController.$inject = [
		'$window',
		'localStorageService',
		'Intensive.Core.Models.LoginModel',
		'Intensive.Blocks.Utils.Constants',
		'Intensive.Core.Constants',
		'Intensive.Blocks.Messages.UserMessagesFactory'
	];	

	function LoginUserController($window,
								 localStorageService,
								 LoginModel,
							 	 UtilsConstants,
								 CoreConstants,
							 	 UserMessagesFactory)
	{
		//####################### Instance Properties #######################
		var vm = this;

		vm.loginModel = new LoginModel();

		vm.ValidateUser = ValidateUser;

		//####################### Public Functions #######################

		function ValidateUser()
		{
			UserMessagesFactory.ShowLoadingDialog();

			vm.loginModel.SignIn().then(
				responseDTO => {

					UserMessagesFactory.HideLoadingDialog();

					if(responseDTO.HasError)
					{
						UserMessagesFactory.ShowErrorMessage({ Message: responseDTO.UIMessage});
						return;
					}

					localStorageService.set(CoreConstants.UserLoggedInfoKey, vm.loginModel.UserName);

					$window.location.reload();
				},
				error => {
					UserMessagesFactory.HideLoadingDialog();
					UserMessagesFactory.ShowErrorMessage({ Message: "Ha ocurrido un problema tratando de obtener los datos"});
					console.log(error);
				}
			);
		}
	}
})();