(function(){

	'use strict';

	angular
		.module('Intensive.App')
		.controller('Intensive.App.HeaderController', HeaderController);

	HeaderController.$inject = [
		'$state',
		'Intensive.Core.Models.LoginModel',
		'Intensive.Blocks.Messages.UserMessagesFactory'
	];	

	function HeaderController($state,
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
					$state.go('intensive.home', {}, {reload: true})
				},
				error => {
					UserMessagesFactory.ShowErrorMessage({ Message: "Ha ocurrido un problema tratando de cerrar la sesión"});
					console.log(error);
				}
			);
		}
	}

})();