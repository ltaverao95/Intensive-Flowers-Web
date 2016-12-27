(function(){

	'use strict';

	angular
		.module('Intensive.App')
		.controller('Intensive.App.LoginProfileUsersAdminController', LoginProfileUsersAdminController);

	LoginProfileUsersAdminController.$inject = [
		'Intensive.Core.Models.LoginModel',
		'Intensive.Blocks.Messages.UserMessagesFactory'
	];	

	function LoginProfileUsersAdminController(LoginModel,
											  UserMessagesFactory)
	{
		//####################### Instance Properties #######################

		var vm = this;

		vm.searchUser = '';

		vm.loginModel = new LoginModel();

		//####### Public Methods



		//####### Private Methods

		function GetAllUsers()
		{
			vm.loginModel.OperationsModel.GetAllItems().then(
				responseDTO =>
				{
					if(responseDTO.HasError)
					{
						vm.loginModel.UsersList = [];
						UserMessagesFactory.ShowErrorMessage({ Message: responseDTO.UIMessage });
						return;
					}

					vm.loginModel.UsersList = responseDTO.ResponseData;
				},
				error => {
					UserMessagesFactory.ShowErrorMessage({ Message: "Ha ocurrido un problema tratando de obtener los datos" });
					console.log(error);
				}
			);
		}

		function Initialize()
		{
			GetAllUsers();
		}

		Initialize();
	}
})();