(function(){

	'use strict';

	angular
		.module('Intensive.App')
		.controller('Intensive.App.LoginContactAdminController', LoginContactAdminController);

	LoginContactAdminController.$inject = [
		'$uibModal',
		'Intensive.Core.Models.ContactModel',
		'Intensive.Blocks.Utils.UtilitiesFactory',
		'Intensive.Blocks.Messages.UserMessagesFactory'
	];	

	function LoginContactAdminController($uibModal,
										 ContactModel,
								 		 UtilitiesFactory,
								 		 UserMessagesFactory)
	{	
		//####################### Instance Properties #######################

		var vm = this;

		vm.contactModel = new ContactModel();

		vm.searchContact = '';

		vm.DeleteContactByID = DeleteContactByID;
		vm.DeleteAllContacts = DeleteAllContacts;
		vm.DeleteContactsSelected = DeleteContactsSelected;
		vm.EditUserByID = EditUserByID;
		vm.ViewUserByID = ViewUserByID;
		vm.CheckAllContacts = CheckAllContacts;
		vm.ContactSelectedChanged = ContactSelectedChanged;

		//####################### Public Functions #######################

		function DeleteContactByID(clientObj)
		{	
			if(!UtilitiesFactory.ShowDeleteConfirm())
			{
				return;
			}

			vm.contactModel.OperationsModel.DeleteItemByID(clientObj).then(
				responseDTO =>
				{
					if(responseDTO.HasError)
					{
						UserMessagesFactory.ShowErrorMessage({ Message: responseDTO.UIMessage });
						return;
					}

					GetAllContacts();
					UserMessagesFactory.ShowSuccessMessage({ Message: responseDTO.UIMessage });
				},
				error => {
					UserMessagesFactory.ShowErrorMessage({ Message: "Ha ocurrido un problema tratando de borrar los datos" });
					console.log(error);
				}
			);
		}

		function DeleteAllContacts()
		{		
			if(UtilitiesFactory.IsArrayNullOrEmpty(vm.contactModel.ContactsList))
			{
				UserMessagesFactory.ShowErrorMessage({ Message: "No hay registros para eliminar" });
				return;
			}	

			if(!UtilitiesFactory.ShowDeleteConfirm())
			{
				return;
			}

			vm.contactModel.OperationsModel.DeleteAllItems().then(
				responseDTO =>
				{
					if(responseDTO.HasError)
					{
						UserMessagesFactory.ShowErrorMessage({ Message: responseDTO.UIMessage });
						return;
					}

					GetAllContacts();
					UserMessagesFactory.ShowSuccessMessage({ Message: responseDTO.UIMessage });
				},
				error => {
					UserMessagesFactory.ShowErrorMessage({ Message: "Ha ocurrido un problema tratando de borrar los datos" });
					console.log(error);
				}
			);
		}

		function DeleteContactsSelected()
		{
			if(UtilitiesFactory.IsArrayNullOrEmpty(vm.contactModel.PaginatorModel.ItemsSelected))
			{
				UserMessagesFactory.ShowErrorMessage({ Message: "Debes seleccionar los registros que deseas eliminar" });
				return;
			}	

			if(!UtilitiesFactory.ShowDeleteConfirm())
			{
				return;
			}

			vm.contactModel.OperationsModel.DeleteItemsSelected(vm.contactModel.PaginatorModel.ItemsSelected).then(
				responseDTO =>
				{
					if(responseDTO.HasError)
					{
						UserMessagesFactory.ShowErrorMessage({ Message: responseDTO.UIMessage });
						return;
					}

					GetAllContacts();
					vm.contactModel.PaginatorModel.ClearItemsSelected();
					UserMessagesFactory.ShowSuccessMessage({ Message: responseDTO.UIMessage });
				},
				error => {
					UserMessagesFactory.ShowErrorMessage({ Message: "Ha ocurrido un problema tratando de borrar los datos" });
					console.log(error);
				}
			);
		}

		function EditUserByID(clientObj)
		{
			clientObj.IsReadOnlyMode = false;
			OpenEditOrUpdateModel(clientObj);
		}

		function ViewUserByID(clientObj)
		{			
			clientObj.IsReadOnlyMode = true;
			OpenEditOrUpdateModel(clientObj);
		}

		function CheckAllContacts()
		{
			var count = 0;
			var subCount = 0;

			vm.contactModel.PaginatorModel.SelectAllItems = !vm.contactModel.PaginatorModel.SelectAllItems ? false : true;

			var i = 0;

			if(vm.contactModel.PaginatorModel.CountCurrentPage + 1 > vm.contactModel.PaginatorModel.PageSize)
			{
				i = vm.contactModel.PaginatorModel.CountCurrentPage;
			}

			for(i; i < vm.contactModel.ContactsList.length; i++)
			{
				if(!vm.contactModel.PaginatorModel.SelectAllItems)
				{
					vm.contactModel.ContactsList[i].Selected = vm.contactModel.PaginatorModel.SelectAllItems;
					vm.contactModel.PaginatorModel.ItemsSelected = [];
					continue;
				}

				var currentMessage = vm.contactModel.PaginatorModel.ItemsSelected.find(contactToFind => contactToFind.Id == vm.contactModel.ContactsList[i].Id);

				if(vm.contactModel.PaginatorModel.CurrentPage + 1 > 1)
				{
					if(i >= vm.contactModel.PaginatorModel.CountCurrentPage && 
					   i <= (vm.contactModel.PaginatorModel.CountCurrentPage * 2))
					{
						if(subCount == vm.contactModel.PaginatorModel.PageSize)
						{
							break;
						}

						vm.contactModel.ContactsList[i].Selected = vm.contactModel.PaginatorModel.SelectAllItems;

						if(UtilitiesFactory.IsUndefinedOrNull(currentMessage))
						{
							vm.contactModel.PaginatorModel.ItemsSelected.push(vm.contactModel.ContactsList[i]);
						}

						subCount++;
					}
				}
				else if(vm.contactModel.PaginatorModel.CountCurrentPage == 0)
				{
					if(i < vm.contactModel.PaginatorModel.PageSize)
					{
						if(UtilitiesFactory.IsUndefinedOrNull(currentMessage))
						{
							vm.contactModel.PaginatorModel.ItemsSelected.push(vm.contactModel.ContactsList[i]);
						}

						vm.contactModel.ContactsList[i].Selected = vm.contactModel.PaginatorModel.SelectAllItems;
					}
				}
			}

			console.log(vm.contactModel.PaginatorModel.ItemsSelected);
		}

		function ContactSelectedChanged(clientObj)
		{
			if(clientObj.Selected)
			{
				vm.contactModel.PaginatorModel.ItemsSelected.push(clientObj);

				if(vm.contactModel.PaginatorModel.ItemsSelected.length == vm.contactModel.PaginatorModel.PageSize ||
				   UtilitiesFactory.ValidateItemsSelectedInCurrentPage(vm.contactModel.ContactsList, vm.contactModel.PaginatorModel))
				{
					vm.contactModel.PaginatorModel.SelectAllItems = true;
				}

				return;
			}
			
			vm.contactModel.PaginatorModel.ItemsSelected.splice(vm.contactModel.PaginatorModel.ItemsSelected.indexOf(clientObj), 1);
			if(!UtilitiesFactory.ValidateItemsSelectedInCurrentPage(vm.contactModel.ContactsList, vm.contactModel.PaginatorModel))
			{
				vm.contactModel.PaginatorModel.SelectAllItems = false;
			}
		}

		//####################### Private Functions #######################

		function OpenEditOrUpdateModel(clientObj)
		{
			var modalInstance = $uibModal.open(
				{
					animation: true,
					templateUrl: 'Client/Intensive/App/Templates/loginAdmin/login.admin.contact.modal.view.html',
					controller: 'Intensive.App.LoginContactModalAdminController',
					controllerAs: 'vm',
					resolve: 
					{
						ContactObjData : function()
						{
							return clientObj;
						}
					}
				}
			);
		}

		function GetAllContacts()
		{
			vm.contactModel.OperationsModel.GetAllItems().then(
				responseDTO =>
				{
					if(responseDTO.HasError)
					{
						vm.contactModel.ContactsList = [];
						UserMessagesFactory.ShowErrorMessage({ Message: responseDTO.UIMessage });
						return;
					}

					vm.contactModel.ContactsList = responseDTO.ResponseData;
				},
				error => {
					UserMessagesFactory.ShowErrorMessage({ Message: "Ha ocurrido un problema tratando de obtener los datos" });
					console.log(error);
				}
			);
		}

		function Initialize()
		{
			GetAllContacts();
		}

		Initialize();
	}
})();