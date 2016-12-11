(function(){

	'use strict';

	angular
		.module('Intensive.App')
		.controller('Intensive.App.LoginContactAdminController', LoginContactAdminController);

	LoginContactAdminController.$inject = [
		'$stateParams',
		'$uibModal',
		'$state',
		'GetAllContacts',
		'Intensive.App.ContactLoginService',
		'Intensive.Blocks.Utils.Constants',
		'Intensive.Blocks.Messages.UserMessagesFactory'
	];	

	function LoginContactAdminController($stateParams,
										 $uibModal,
										 $state,
										 GetAllContacts,
										 ContactLoginService,
								 		 UtilsConstants,
								 		 UserMessagesFactory)
	{	
		//####################### Instance Properties #######################

		var vm = this;

		var _paramsDTO = {
			Message: ''
		};

		vm.currentPage = 0;
		vm.pageSize = 6;
		vm.countCurrentPage = 0;

		vm.rootLoginContact = {
			contacts: [],
			searchContact: '',
			selectAllContacts: false,
			arrContactsSelected : []
		};

		if(GetAllContacts.ResponseMessage !== "")
		{
			_paramsDTO.Message = GetAllContacts.ResponseMessage;
			UserMessagesFactory.ShowErrorMessage(_paramsDTO);

			vm.rootLoginContact.contacts = [];
		}
		else
		{
			vm.rootLoginContact.contacts = GetAllContacts.ObjData;
		}

		vm.contactDetailUpdate = $stateParams.objData;

		vm.CurrentPageChanged = CurrentPageChanged;
		vm.DeleteContactByID = DeleteContactByID;
		vm.DeleteAllContacts = DeleteAllContacts;
		vm.DeleteContactsSelected = DeleteContactsSelected;
		vm.EditUserByID = EditUserByID;
		vm.ViewUserByID = ViewUserByID;
		vm.CheckAllContacts = CheckAllContacts;
		vm.ContactSelectedChanged = ContactSelectedChanged;

		vm.NumberOfPages = NumberOfPages;

		//####################### Public Functions #######################

		function CurrentPageChanged(isNextPage)
		{
			if(isNextPage
			)
			{
				vm.currentPage = vm.currentPage + 1;
				vm.countCurrentPage = vm.currentPage * vm.pageSize;
				return;
			}

			vm.currentPage = vm.currentPage - 1
			vm.countCurrentPage = vm.currentPage * vm.pageSize;
		}

		function DeleteContactByID(clientObj)
		{	
			ContactLoginService.DeleteContactByID(clientObj).then(
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

		function DeleteAllContacts()
		{		
			if(vm.rootLoginContact.contacts.length == 0)
			{
				_paramsDTO.Message = "No hay registros para eliminar";
				UserMessagesFactory.ShowErrorMessage(_paramsDTO);
				return;
			}

			var response = confirm("¿Estas seguro que deseas eliminar todos los pedidos?");

			if(!response)
			{
				return;
			}

			ContactLoginService.DeleteAllContacts().then(
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

		function DeleteContactsSelected()
		{
			if(vm.rootLoginContact.arrContactsSelected.length == 0)
			{
				_paramsDTO.Message = "Debes seleccionar los usuarios que quieres eliminar";
				UserMessagesFactory.ShowErrorMessage(_paramsDTO);
				return;
			}

			ContactLoginService.DeleteContactsSelectedByID(vm.rootLoginContact.arrContactsSelected).then(
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

			vm.rootLoginContact.selectAllContacts = !vm.rootLoginContact.selectAllContacts ? false : true;

			angular.forEach(vm.rootLoginContact.contacts, function (user) 
			{
				count++;

				if(!vm.rootLoginContact.selectAllContacts)
				{
					user.Selected = vm.rootLoginContact.selectAllContacts;
					vm.rootLoginContact.arrContactsSelected = [];
					return;
				}

				if(vm.currentPage + 1 > 1)
				{
					if(count >= vm.countCurrentPage + 1 && 
					   count <= (vm.countCurrentPage * 2))
					{
						if(subCount == vm.pageSize)
						{
							return;
						}

						user.Selected = vm.rootLoginContact.selectAllContacts;
						vm.rootLoginContact.arrContactsSelected.push(user);
						subCount++;
					}
				}
				else if(vm.countCurrentPage == 0)
				{
					if(count <= 6)
					{
						user.Selected = vm.rootLoginContact.selectAllContacts;
						vm.rootLoginContact.arrContactsSelected.push(user);
					}
				}
        	});
		}

		function ContactSelectedChanged(clientObj)
		{
			if(clientObj.Selected)
			{
				vm.rootLoginContact.arrContactsSelected.push(clientObj);

				if(vm.rootLoginContact.arrContactsSelected.length == vm.rootLoginContact.contacts.length)
				{
					vm.rootLoginContact.selectAllContacts = true;
				}
			}
			else 
			{
				vm.rootLoginContact.arrContactsSelected.splice(vm.rootLoginContact.arrContactsSelected.indexOf(clientObj), 1);

			}
		}

		//####################### Pagination Functions #######################	

		function NumberOfPages()
		{
			if(vm.rootLoginContact.contacts == 0)
			{
				return 0;
			}

			return Math.ceil(vm.rootLoginContact.contacts.length / vm.pageSize);
		}

		//####################### Private Functions #######################

		function OpenEditOrUpdateModel(clientObj)
		{
			var modalInstance = $uibModal.open(
				{
					animation: true,
					templateUrl: 'Client/Intensive/App/Components/loginAdmin/login.admin.contact.modal.view.html',
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
	};

})();