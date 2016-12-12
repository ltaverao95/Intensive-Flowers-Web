(function(){

	'use strict';

	angular
		.module('Intensive.App')
		.controller('Intensive.App.HeaderController', HeaderController);

	HeaderController.$inject = [
		'$window',
		'Intensive.Core.Models.LoginModel',
		'Intensive.Blocks.Messages.UserMessagesFactory'
	];	

	function HeaderController($window,
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
						UserMessagesFactory.ShowErrorMessage({ Message: responseDTO.UIMessage});
						return;
					}

					UserMessagesFactory.ShowSuccessMessage({ Message: responseDTO.UIMessage});
					$window.location.reload();
				},
				error => {
					UserMessagesFactory.ShowErrorMessage({ Message: "Ha ocurrido un problema tratando de cerrar la sesión"});
					console.log(error);
				}
			);
		}
	}

})();