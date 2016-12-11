(function(){

	'use strict';

	angular
		.module('Intensive.App')
		.controller('Intensive.App.LoginContactModalAdminController', LoginContactModalAdminController);

	LoginContactModalAdminController.$inject = [
		'$uibModalInstance',
		'ContactObjData',
		'Intensive.App.ContactLoginService',
		'Intensive.Blocks.Utils.Constants',
		'Intensive.Blocks.Messages.UserMessagesFactory'
	];	

	function LoginContactModalAdminController($uibModalInstance,
											  ContactObjData,
											  ContactLoginService,
											  UtilsConstants,
											  UserMessagesFactory)
	{
		//####################### Instance Properties #######################

		var vm = this;

		var _paramsDTO = {
			Message: ''
		};

		vm.rootModalContact = {
			contactData: ContactObjData
		};

		vm.SaveUserContact = SaveUserContact
		vm.CloseModal = CloseModal;
		//####################### Public Functions #######################

		function SaveUserContact()
		{
			ContactLoginService.UpdateContactByID(vm.rootModalContact.contactData).then(
				function (data)
				{					
					if(data.Result == UtilsConstants.EnumResult.ERROR)
					{
						_paramsDTO.Message = data.ResponseMessage;
						UserMessagesFactory.ShowErrorMessage(_paramsDTO);
						return;
					}

					_paramsDTO.Message = data.ResponseMessage;
					UserMessagesFactory.ShowSuccessMessage(_paramsDTO);
				},
				function (error)
				{
					console.log(error);
				}
			);
		}

		function CloseModal()
		{
			$uibModalInstance.close();
		}
	};

})();