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
		vm.displayMessageInformation = false;

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

			vm.messageModel.OperationsModel.SaveItem(vm.messageModel).then(
				responseDTO => {

					if(responseDTO.HasError)
					{
						UserMessagesFactory.ShowErrorMessage({ Message: responseDTO.UIMessage});
						return;
					}

					UserMessagesFactory.ShowSuccessMessage({ Message: responseDTO.UIMessage});
					vm.messageModel = new MessageModel();
					GetAllMessages();
				},
				error => {
					UserMessagesFactory.ShowErrorMessage({ Message: "Ha ocurrido un problema tratando de obtener los datos"});
					console.log(error);
				}
			);			
		}

		//##### Private Methods #####

		function GetAllMessages()
		{
			vm.displayMessageInformation = false;

			vm.messageModel.OperationsModel.GetAllItems().then(
				responseDTO => {

					if(responseDTO.HasError)
					{
						UserMessagesFactory.ShowErrorMessage({ Message: responseDTO.UIMessage});
						return;
					}

					if(!responseDTO.ResponseData)
					{
						vm.displayMessageInformation = true;
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

		function Initialize()
		{
			$('.carousel').carousel(
				{
					interval: 5000 //changes the speed
				}
			);
			
			GetAllMessages();
		}

		Initialize();
	}

})();
