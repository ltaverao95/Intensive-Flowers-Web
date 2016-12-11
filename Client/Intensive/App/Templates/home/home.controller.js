(function(){

	'use strict';

	angular
		.module('Intensive.App')
		.controller('Intensive.App.HomeController', HomeController);

	HomeController.$inject = [
		'GetAllMessages',
		'Intensive.App.Models.MessageDTOModel',
		'Intensive.Blocks.Utils.Constants',
		'Intensive.Blocks.Messages.UserMessagesFactory'
	];	

	function HomeController(GetAllMessages,
							MessageDTOModel, 
							UtilsConstants,
							UserMessagesFactory)
	{
		//####################### Instance Properties #######################
		var vm = this;

		vm.messageDTOModel = new MessageDTOModel();

		if(GetAllMessages.Result == UtilsConstants.EnumResult.ERROR && 
		   GetAllMessages.ResponseMessage != "")
		{
			UserMessagesFactory.ShowInfoMessage({ Message: GetAllMessages.ResponseMessage});
		} 
		else 
		{
			vm.messageDTOModel.MessagesList = GetAllMessages.ObjData;
		}

		vm.SaveMessage = SaveMessage;

		//####################### Public Functions #######################

		function SaveMessage()
		{
			var actionResultModel = vm.messageDTOModel.ValidateMessage();
			if(actionResultModel.HasError)
			{
				UserMessagesFactory.ShowErrorMessage({ Message: actionResultModel.UIMessage});
				return;
			}

			vm.messageDTOModel.SaveMessage().then(
				function (data)
				{
					if(data.Result === UtilsConstants.EnumResult.ERROR)
					{
						UserMessagesFactory.ShowErrorMessage({ Message: data.ResponseMessage});
						return;
					}

					UserMessagesFactory.ShowSuccessMessage({ Message: data.ResponseMessage});
				},
				function (error)
				{
					console.log(error);
				}
			);			
		}
	}

})();
