(function(){

	'use strict';

	angular
		.module('Intensive.App')
		.controller('Intensive.App.LoginMessageAdminController', LoginMessageAdminController);

	LoginMessageAdminController.$inject = [
		'$uibModal',
		'Intensive.Core.Models.MessageModel',
		'Intensive.Blocks.Utils.Constants',
		'Intensive.Blocks.Messages.UserMessagesFactory'
	];	

	function LoginMessageAdminController($uibModal,
										 MessageModel,
								 		 UtilsConstants,
								 		 UserMessagesFactory)
	{
		
		//####################### Instance Properties #######################
		
		var vm = this;

		vm.messageModel = new MessageModel();

		vm.searchMessage = '';

		vm.DeleteMessageByID = DeleteMessageByID;
		vm.DeleteAllMessages = DeleteAllMessages;
		vm.DeleteMessageSelected = DeleteMessageSelected;		
		vm.EditMessageById = EditMessageById;
		vm.ViewMessageById = ViewMessageById;
		vm.CheckAllMessages = CheckAllMessages;
		vm.MessageSelectedChanged = MessageSelectedChanged;

		//####################### Public Methods #######################

		function DeleteMessageByID(messageObj)
		{
			
		}

		function DeleteAllMessages()
		{			
			
		}

		function DeleteMessageSelected()
		{
			
		}

		function EditMessageById(messageObj)
		{
			messageObj.IsReadOnlyMode = false;
			OpenEditOrUpdateModel(messageObj);
		}

		function ViewMessageById(messageObj)
		{
			messageObj.IsReadOnlyMode = true;
			OpenEditOrUpdateModel(messageObj);
		}

		function CheckAllMessages()
		{			
			var count = 0;
			var subCount = 0;

			vm.messageModel.PaginatorModel.SelectAllItems = !vm.messageModel.PaginatorModel.SelectAllItems ? false : true;

			vm.messageModel.MessagesList.map(
				function (message)
				{
					count++;

					if(!vm.messageModel.PaginatorModel.SelectAllItems)
					{
						message.Selected = vm.messageModel.PaginatorModel.SelectAllItems;
						vm.messageModel.PaginatorModel.ItemsSelected = [];
						return;
					}

					if(vm.messageModel.PaginatorModel.CurrentPage + 1 > 1)
					{
						if(count >= vm.messageModel.PaginatorModel.CountCurrentPage + 1 && count <= (vm.messageModel.PaginatorModel.CountCurrentPage * 2))
						{
							if(subCount == vm.pageSize)
							{
								return;
							}

							message.Selected = vm.messageModel.PaginatorModel.SelectAllItems;
							vm.messageModel.PaginatorModel.ItemsSelected.push(message);
							subCount++;
						}
					}
					else if(vm.messageModel.PaginatorModel.CountCurrentPage == 0)
					{
						if(count <= 6)
						{
							message.Selected = vm.messageModel.PaginatorModel.SelectAllItems;
							vm.messageModel.PaginatorModel.ItemsSelected.push(message);
						}
					}
				}
			);
		}

		function MessageSelectedChanged(messageObj)
		{
			if(messageObj.Selected)
			{
				vm.messageModel.PaginatorModel.ItemsSelected.push(messageObj);

				if(vm.messageModel.PaginatorModel.ItemsSelected.length == vm.rootMessageObj.messagesObj.length)
				{
					vm.messageModel.PaginatorModel.SelectAllItems = true;
				}
			}
			else 
			{
				vm.messageModel.PaginatorModel.ItemsSelected.splice(vm.messageModel.PaginatorModel.ItemsSelected.indexOf(messageObj), 1);
			}
		}

		//####################### Private Methods #######################

		function OpenEditOrUpdateModel(messageObj)
		{
			var modalInstance = $uibModal.open(
				{
					animation: true,
					templateUrl: 'Client/Intensive/App/Templates/loginAdmin/login.admin.message.modal.view.html',
					controller: 'Intensive.App.LoginMessageModalAdminController',
					controllerAs: 'vm',
					size: 'md',
					keyboard: false,
					backdrop: 'static',
					resolve: 
					{
						MessageObjData : function()
						{
							return messageObj;
						}
					}
				}
			);
		}

		function GetAllMessages()
		{
			vm.messageModel.OperationsModel.GetAllItems().then(
				responseDTO =>
				{
					if(responseDTO.HasError)
					{
						vm.messageModel.MessagesList = [];
						UserMessagesFactory.ShowErrorMessage({ Message: responseDTO.UIMessage });
						return;
					}

					vm.messageModel.MessagesList = responseDTO.ResponseData;
				},
				error => {
					UserMessagesFactory.ShowErrorMessage({ Message: "Ha ocurrido un problema tratando de obtener los datos" });
					console.log(error);
				}
			);
		}

		function Initialize()
		{
			GetAllMessages();
		}

		Initialize();
	}
})();