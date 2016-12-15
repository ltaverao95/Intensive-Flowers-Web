(function(){

	'use strict';

	angular
		.module('Intensive.App')
		.controller('Intensive.App.LoginMessageModalAdminController', LoginMessageModalAdminController);

	LoginMessageModalAdminController.$inject = [
		'$window',
		'$uibModalInstance',
		'MessageObjData',
		'Intensive.Core.Models.MessageModel',
		'Intensive.Blocks.Messages.UserMessagesFactory'
	];	

	function LoginMessageModalAdminController($window,
											  $uibModalInstance,
											  MessageObjData,
											  MessageModel,
											  UserMessagesFactory)
	{
		//####################### Instance Properties #######################

		var vm = this;

		vm.messageModel = new MessageModel(MessageObjData);

		vm.UpdateMessageByID = UpdateMessageByID;
		vm.CloseModal = CloseModal;
		
		//####################### Public Functions #######################

		function UpdateMessageByID()
		{
			var actionResultModel = vm.messageModel.ValidateMessage();
			if(actionResultModel.HasError)
			{
				UserMessagesFactory.ShowErrorMessage({ Message: actionResultModel.UIMessage });	
				return;
			}

			vm.messageModel.OperationsModel.UpdateItemByID(vm.messageModel).then(
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
			if(!vm.messageModel.IsReadOnlyMode)
			{	
				var actionResultModel = vm.messageModel.ValidateMessage();
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