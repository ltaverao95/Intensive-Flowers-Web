(function(){

	'use strict';

	angular
		.module('Intensive.App')
		.controller('Intensive.App.LoginMessageModalAdminController', LoginMessageModalAdminController);

	LoginMessageModalAdminController.$inject = [
		'$uibModalInstance',
		'MessageObjData',
		'Intensive.App.MessageLoginService',
		'Intensive.Blocks.Utils.Constants',
		'Intensive.Blocks.Messages.UserMessagesFactory'
	];	

	function LoginMessageModalAdminController($uibModalInstance,
											  MessageObjData,
											  MessageLoginService,
											  UtilsConstants,
											  UserMessagesFactory)
	{
		//####################### Instance Properties #######################

		var vm = this;

		var _paramsDTO = {
			Message: ''
		};

		vm.rootModalMessage = {
			messageData: MessageObjData
		};

		vm.SaveUserMessage = SaveUserMessage;
		vm.CloseModal = CloseModal;
		
		//####################### Public Functions #######################

		function SaveUserMessage()
		{
			MessageLoginService.UpdateMessageByID(vm.rootModalMessage.messageData).then(
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

		function CloseModal(){

			$uibModalInstance.close();
		};
	};

})();