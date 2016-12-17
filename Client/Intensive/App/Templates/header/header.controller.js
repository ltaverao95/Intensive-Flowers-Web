(function(){

	'use strict';

	angular
		.module('Intensive.App')
		.controller('Intensive.App.HeaderController', HeaderController);

	HeaderController.$inject = [
		'$state',
		'$window',
		'localStorageService',
		'Intensive.Core.Constants',
		'Intensive.Core.Models.LoginModel',
		'Intensive.Blocks.Messages.UserMessagesFactory'
	];	

	function HeaderController($state,
							  $window,
							  localStorageService,
							  CoreConstants,
							  LoginModel,
							  UserMessagesFactory)
	{
		//####################### Instance Properties #######################
		var vm = this;
		
		var _loginModel = new LoginModel();

		vm.LogOut = LogOut;

		//####################### Public Methods #######################

		function LogOut()
		{
			_loginModel.LogOut().then(
				responseDTO => {

					if(responseDTO.HasError)
					{
						localStorageService.clearAll();
						UserMessagesFactory.ShowErrorMessage({ Message: responseDTO.UIMessage});
						return;
					}

					localStorageService.remove(CoreConstants.UserLoggedInfoKey)
					UserMessagesFactory.ShowSuccessMessage({ Message: responseDTO.UIMessage});
					$state.go('intensive.home');
					$window.location.reload();
				},
				error => {
					UserMessagesFactory.ShowErrorMessage({ Message: "Ha ocurrido un problema tratando de cerrar la sesión"});
					localStorageService.clearAll();
					console.log(error);
				}
			);
		}

		//####### Private Methods

	}
})();