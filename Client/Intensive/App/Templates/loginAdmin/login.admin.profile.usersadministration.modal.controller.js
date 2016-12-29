(function(){

	'use strict';

	angular
		.module('Intensive.App')
		.controller('Intensive.App.LoginUserModalAdminController', LoginUserModalAdminController);

	LoginUserModalAdminController.$inject = [
		'$uibModalInstance',
		'$window',
		'UserObjData',
		'Intensive.Core.Models.LoginModel',
		'Intensive.Blocks.Utils.Constants',
		'Intensive.Blocks.Messages.UserMessagesFactory',
		'Intensive.Blocks.Utils.UtilitiesFactory'
	];	

	function LoginUserModalAdminController($uibModalInstance,
										   $window,
                                           UserObjData,
										   LoginModel,
										   UtilsConstants,
										   UserMessagesFactory,
										   UtilitiesFactory)
	{
		//####################### Instance Properties #######################

		var vm = this;

		vm.loginModel = new LoginModel(UserObjData);

		vm.UtilsConstants = UtilsConstants;

		vm.ValidateCurrentUserName = ValidateCurrentUserName
		vm.CreateUser = CreateUser;
		vm.UpdateUser = UpdateUser;
		vm.CloseModal = CloseModal;
		vm.CloseModalWithoutSave = CloseModalWithoutSave;
		
		//####################### Public Functions #######################

		function ValidateCurrentUserName()
		{
			vm.loginModel.IsValidCurrentUserName = false;

			if(!UtilitiesFactory.IsStringValid(vm.loginModel.UserName))
			{
				UserMessagesFactory.ShowErrorMessage({ Message: "El campo de nombre de usuario no puede estar vacío" });
				return;
			}

			vm.loginModel.ValidateUserIfExists().then(
				responseDTO => {

					if(responseDTO.HasError)
					{
						UserMessagesFactory.ShowErrorMessage({ Message: responseDTO.UIMessage});
						return;
					}

					UserMessagesFactory.ShowSuccessMessage({ Message: responseDTO.UIMessage});
					vm.loginModel.IsValidCurrentUserName = true;
				},
				error => {
					UserMessagesFactory.ShowErrorMessage({ Message: "Ha ocurrido un problema tratando de actualizar los datos"});
					CloseModal();
					console.log(error);
				}
			);
		}

		function CreateUser()
		{
			var actionResultModel = vm.loginModel.ValidateCompleteUser();
			if(actionResultModel.HasError)
			{
				UserMessagesFactory.ShowErrorMessage({ Message: actionResultModel.UIMessage });
				return;
			} 

			if(!vm.loginModel.IsValidCurrentUserName)
			{
				UserMessagesFactory.ShowErrorMessage({ Message: "Debes validar el nombre de usuario antes de crearlo" });
				return;
			}

			vm.loginModel.OperationsModel.SaveItem(vm.loginModel).then(
				responseDTO => {

					if(responseDTO.HasError)
					{
						UserMessagesFactory.ShowErrorMessage({ Message: responseDTO.UIMessage});
						return;
					}

					UserMessagesFactory.ShowSuccessMessage({ Message: responseDTO.UIMessage});
					CloseModal();
					$window.location.reload();
				},
				error => {
					UserMessagesFactory.ShowErrorMessage({ Message: "Ha ocurrido un problema tratando de actualizar los datos"});
					CloseModal();
					console.log(error);
				}
			);
		}

		function UpdateUser()
		{
			var actionResultModel = vm.loginModel.UserAdminModel.ValidateUserAdminModel();
			if(actionResultModel.HasError)
			{
				UserMessagesFactory.ShowErrorMessage({ Message: actionResultModel.UIMessage });
				return;
			} 

			vm.loginModel.OperationsModel.UpdateItemByID(vm.loginModel).then(
				responseDTO => {

					if(responseDTO.HasError)
					{
						UserMessagesFactory.ShowErrorMessage({ Message: responseDTO.UIMessage});
						return;
					}

					UserMessagesFactory.ShowSuccessMessage({ Message: responseDTO.UIMessage});
					CloseModal();
					$window.location.reload();
				},
				error => {
					UserMessagesFactory.ShowErrorMessage({ Message: "Ha ocurrido un problema tratando de actualizar los datos"});
					CloseModal();
					console.log(error);
				}
			);
		}

		function CloseModal()
		{

			if(!vm.loginModel.IsReadOnlyMode)
			{
				var actionResultModel = vm.loginModel.UserAdminModel.ValidateUserAdminModel();
				if(actionResultModel.HasError)
				{
					UserMessagesFactory.ShowErrorMessage({ Message: actionResultModel.UIMessage });
					return;
				}
			}

			$uibModalInstance.close();
		}

		function CloseModalWithoutSave()
		{
			$uibModalInstance.close();	
		}
		//####### Private Methods

	}
})();