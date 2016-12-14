(function(){

	'use strict';

	angular
		.module('Intensive.App')
		.controller('Intensive.App.LoginMessageModalAdminController', LoginMessageModalAdminController);

	LoginMessageModalAdminController.$inject = [
		'$uibModalInstance',
		'MessageObjData',
		'Intensive.Core.Models.MessageModel',
		'Intensive.Blocks.Utils.Constants',
		'Intensive.Blocks.Messages.UserMessagesFactory'
	];	

	function LoginMessageModalAdminController($uibModalInstance,
											  MessageObjData,
											  MessageModel,
											  UtilsConstants,
											  UserMessagesFactory)
	{
		//####################### Instance Properties #######################

		var vm = this;

		vm.messageModel = new MessageModel(MessageObjData);

		vm.UpdateMessage = UpdateMessage;
		vm.CloseModal = CloseModal;
		
		//####################### Public Functions #######################

		function UpdateMessage()
		{
			
		}

		function CloseModal()
		{

			$uibModalInstance.close();
		}
	}
})();