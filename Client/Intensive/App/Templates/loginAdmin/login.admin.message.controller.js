(function(){

	'use strict';

	angular
		.module('Intensive.App')
		.controller('Intensive.App.LoginMessageAdminController', LoginMessageAdminController);

	LoginMessageAdminController.$inject = [
		'$uibModal',
		'Intensive.Core.Models.MessageModel',
		'Intensive.Blocks.Utils.Constants',
		'Intensive.Blocks.Messages.UserMessagesFactory',
		'Intensive.Blocks.Utils.UtilitiesFactory'
	];	

	function LoginMessageAdminController($uibModal,
										 MessageModel,
								 		 UtilsConstants,
								 		 UserMessagesFactory,
										 UtilitiesFactory)
	{
		
		//####################### Instance Properties #######################
		
		var vm = this;

		vm.messageModel = new MessageModel();

		vm.searchMessage = '';

		vm.DeleteMessageByID = DeleteMessageByID;
		vm.DeleteAllMessages = DeleteAllMessages;
		vm.DeleteMessagesSelected = DeleteMessagesSelected;		
		vm.EditMessageById = EditMessageById;
		vm.ViewMessageById = ViewMessageById;
		vm.CheckAllMessages = CheckAllMessages;
		vm.MessageSelectedChanged = MessageSelectedChanged;

		//####################### Public Methods #######################

		function DeleteMessageByID(messageObj)
		{
			if(!UtilitiesFactory.ShowDeleteConfirm())
			{
				return;
			}
		}

		function DeleteAllMessages()
		{	
			if(UtilitiesFactory.IsArrayNullOrEmpty(vm.messageModel.MessagesList))
			{
				UserMessagesFactory.ShowErrorMessage({ Message: "No hay registros para eliminar" });
				return;
			}	

			if(!UtilitiesFactory.ShowDeleteConfirm())
			{
				return;
			}

			vm.messageModel.OperationsModel.DeleteAllItems().then(
				responseDTO =>
				{
					if(responseDTO.HasError)
					{
						UserMessagesFactory.ShowErrorMessage({ Message: responseDTO.UIMessage });
						return;
					}
					
					GetAllMessages();
					UserMessagesFactory.ShowSuccessMessage({ Message: responseDTO.UIMessage });
				},
				error => {
					UserMessagesFactory.ShowErrorMessage({ Message: "Ha ocurrido un problema tratando de borrar los datos" });
					console.log(error);
				}	
			);
		}

		function DeleteMessagesSelected()
		{
			if(UtilitiesFactory.IsArrayNullOrEmpty(vm.messageModel.PaginatorModel.ItemsSelected))
			{
				UserMessagesFactory.ShowErrorMessage({ Message: "Debes seleccionar los registros que deseas eliminar" });
				return;
			}	

			if(!UtilitiesFactory.ShowDeleteConfirm())
			{
				return;
			}
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

			var i = 0;

			if(vm.messageModel.PaginatorModel.CountCurrentPage + 1 > vm.messageModel.PaginatorModel.PageSize)
			{
				i = vm.messageModel.PaginatorModel.CountCurrentPage;
			}

			for(i; i < vm.messageModel.MessagesList.length; i++)
			{
				if(!vm.messageModel.PaginatorModel.SelectAllItems)
				{
					vm.messageModel.MessagesList[i].Selected = vm.messageModel.PaginatorModel.SelectAllItems;
					vm.messageModel.PaginatorModel.ItemsSelected = [];
					continue;
				}

				var currentMessage = vm.messageModel.PaginatorModel.ItemsSelected.find(messageToFind => messageToFind.Id == vm.messageModel.MessagesList[i].Id);

				if(vm.messageModel.PaginatorModel.CurrentPage + 1 > 1)
				{
					if(i >= vm.messageModel.PaginatorModel.CountCurrentPage && 
					   i <= (vm.messageModel.PaginatorModel.CountCurrentPage * 2))
					{
						if(subCount == vm.messageModel.PaginatorModel.PageSize)
						{
							break;
						}

						vm.messageModel.MessagesList[i].Selected = vm.messageModel.PaginatorModel.SelectAllItems;

						if(UtilitiesFactory.IsUndefinedOrNull(currentMessage))
						{
							vm.messageModel.PaginatorModel.ItemsSelected.push(vm.messageModel.MessagesList[i]);
						}

						subCount++;
					}
				}
				else if(vm.messageModel.PaginatorModel.CountCurrentPage == 0)
				{
					if(i < vm.messageModel.PaginatorModel.PageSize)
					{
						if(UtilitiesFactory.IsUndefinedOrNull(currentMessage))
						{
							vm.messageModel.PaginatorModel.ItemsSelected.push(vm.messageModel.MessagesList[i]);
						}

						vm.messageModel.MessagesList[i].Selected = vm.messageModel.PaginatorModel.SelectAllItems;
					}
				}
			}
		}

		function MessageSelectedChanged(messageObj)
		{
			if(messageObj.Selected)
			{
				vm.messageModel.PaginatorModel.ItemsSelected.push(messageObj);

				if(vm.messageModel.PaginatorModel.ItemsSelected.length == vm.messageModel.PaginatorModel.PageSize ||
				   UtilitiesFactory.ValidateItemsSelectedInCurrentPage(vm.messageModel.MessagesList, vm.messageModel.PaginatorModel))
				{
					vm.messageModel.PaginatorModel.SelectAllItems = true;
				}

				return;
			}
			
			vm.messageModel.PaginatorModel.ItemsSelected.splice(vm.messageModel.PaginatorModel.ItemsSelected.indexOf(messageObj), 1);
			if(!UtilitiesFactory.ValidateItemsSelectedInCurrentPage(vm.messageModel.MessagesList, vm.messageModel.PaginatorModel))
			{
				vm.messageModel.PaginatorModel.SelectAllItems = false;
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