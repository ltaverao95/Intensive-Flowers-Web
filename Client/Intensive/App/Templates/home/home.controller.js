(function(){

	'use strict';

	angular
		.module('Intensive.App')
		.controller('Intensive.App.HomeController', HomeController);

	HomeController.$inject = [
		'Intensive.Core.Models.MessageModel',
		'Intensive.Blocks.Utils.Constants',
		'Intensive.Blocks.Messages.UserMessagesFactory'
	];	

	function HomeController(MessageModel, 
							UtilsConstants,
							UserMessagesFactory)
	{
		//####################### Instance Properties #######################
		var vm = this;

		vm.messageModel = new MessageModel();

		vm.SaveMessage = SaveMessage;

		//####################### Public Functions #######################

		function SaveMessage()
		{
			var actionResultModel = vm.messageModel.ValidateMessage();
			if(actionResultModel.HasError)
			{
				UserMessagesFactory.ShowErrorMessage({ Message: actionResultModel.UIMessage});
				return;
			}

			vm.messageModel.SaveMessage().then(
				responseDTO => {

					if(responseDTO.HasError)
					{
						UserMessagesFactory.ShowErrorMessage({ Message: responseDTO.UIMessage});
						return;
					}

					UserMessagesFactory.ShowSuccessMessage({ Message: responseDTO.UIMessage});
				},
				error => {
					UserMessagesFactory.ShowErrorMessage({ Message: "Ha ocurrido un problema tratando de obtener los datos"});
					console.log(error);
				}
			);			
		}

		//##### Private Methods #####

		function Initialize()
		{
			vm.messageModel.GetAllMessages().then(
				responseDTO => {

					if(responseDTO.HasError)
					{
						UserMessagesFactory.ShowErrorMessage({ Message: responseDTO.UIMessage});
						return;
					}

					vm.messageModel.MessagesList = responseDTO.ResponseData;
				},
				error => {
					UserMessagesFactory.ShowErrorMessage({ Message: "Ha ocurrido un problema tratando de obtener los datos"});
					console.log(error);
				}
			);
		}

		Initialize();
	}

})();
