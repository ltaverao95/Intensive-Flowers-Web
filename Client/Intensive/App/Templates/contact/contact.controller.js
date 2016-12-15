(function(){

	'use strict';

	angular
		.module('Intensive.App')
		.controller('Intensive.App.ContactController', ContactController);

	ContactController.$inject = [
		'Intensive.Blocks.Utils.Constants',
		'Intensive.Core.Models.ContactModel',
		'Intensive.Blocks.Messages.UserMessagesFactory'
	];	

	function ContactController(UtilsConstants,
							   ContactModel,
							   UserMessagesFactory)
	{
		//####################### Instance Properties #######################

		var vm = this;

		vm.contactModel = new ContactModel();

		vm.AddNewMessageContact = AddNewMessageContact;

		//####################### Public Methods #######################

		function AddNewMessageContact()
		{
			var actionResultModel = vm.contactModel.ValidateContact();
			if(actionResultModel.HasError)
			{
				UserMessagesFactory.ShowErrorMessage({ Message: actionResultModel.UIMessage});
				return;
			}

			vm.contactModel.OperationsModel.SaveItem(vm.contactModel).then(
				responseDTO => {

					ClearContactModel();

					if(responseDTO.HasError)
					{
						UserMessagesFactory.ShowErrorMessage({ Message: responseDTO.UIMessage});
						return;
					}

					UserMessagesFactory.ShowSuccessMessage({ Message: responseDTO.UIMessage});
				},
				error => {
					ClearContactModel();
					UserMessagesFactory.ShowErrorMessage({ Message: "Ha ocurrido un problema tratando de guardar los datos"});
					console.log(error);
				}
			);
		}

		//####################### Private Methods #######################

		function ClearContactModel()
		{
			vm.contactModel = new ContactModel();
		}
	}
})();