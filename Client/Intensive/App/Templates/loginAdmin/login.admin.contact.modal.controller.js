(function(){

	'use strict';

	angular
		.module('Intensive.App')
		.controller('Intensive.App.LoginContactModalAdminController', LoginContactModalAdminController);

	LoginContactModalAdminController.$inject = [
		'$window',
		'$uibModalInstance',
		'ContactObjData',
		'Intensive.Core.Models.ContactModel',
		'Intensive.Blocks.Utils.UtilitiesFactory',
		'Intensive.Blocks.Messages.UserMessagesFactory'
	];	

	function LoginContactModalAdminController($window,
											  $uibModalInstance,
											  ContactObjData,
											  ContactModel,
											  UtilitiesFactory,
											  UserMessagesFactory)
	{
		//####################### Instance Properties #######################

		var vm = this;

		vm.contactModel = new ContactModel(ContactObjData);

		vm.UpdateContactByID = UpdateContactByID;
		vm.CloseModal = CloseModal;
		//####################### Public Functions #######################

		function UpdateContactByID()
		{
			var actionResultModel = vm.contactModel.ValidateContact();
			if(actionResultModel.HasError)
			{
				UserMessagesFactory.ShowErrorMessage({ Message: actionResultModel.UIMessage });
				return;
			}

			vm.contactModel.OperationsModel.UpdateItemByID(vm.contactModel).then(
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
			if(!vm.contactModel.IsReadOnlyMode)
			{
				var actionResultModel = vm.contactModel.ValidateContact();
				if(actionResultModel.HasError)
				{
					UserMessagesFactory.ShowErrorMessage({ Message: actionResultModel.UIMessage });
					return;
				}
			}

			$uibModalInstance.close();
		}
	}
})();