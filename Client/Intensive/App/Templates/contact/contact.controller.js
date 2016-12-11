(function(){

	'use strict';

	angular
		.module('Intensive.App')
		.controller('Intensive.App.ContactController', ContactController);

	ContactController.$inject = [
		'Intensive.App.ContactService',
		'Intensive.Blocks.Utils.Constants',
		'Intensive.Blocks.Messages.UserMessagesFactory'
	];	

	function ContactController(ContactService,
							   UtilsConstants,
							   UserMessagesFactory)
	{
		//####################### Instance Properties #######################

		var vm = this;

		var _paramsDTO = {
			Message: ''
		};

		vm.rootDataContact = {
			name: '',
			email: '',
			phone: '',
			message: ''
		};

		vm.AddNewMessageContact = AddNewMessageContact;

		//####################### Public Functions #######################

		function AddNewMessageContact(){

			ContactService.NewContactMessage(vm.rootDataContact).then(
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

			vm.rootDataContact = {
				name: '',
				email: '',
				phone: '',
				message: ''
			};
		};
	};

})();