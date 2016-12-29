(function(){

	'use strict';

	angular
		.module('Intensive.App')
		.controller('Intensive.App.LoginProfileUsersAdminController', LoginProfileUsersAdminController);

	LoginProfileUsersAdminController.$inject = [
		'$uibModal',
		'Intensive.Core.Models.LoginModel',
		'Intensive.Blocks.Messages.UserMessagesFactory',
		'Intensive.Blocks.Utils.UtilitiesFactory'
	];	

	function LoginProfileUsersAdminController($uibModal,
											  LoginModel,
											  UserMessagesFactory,
											  UtilitiesFactory)
	{
		//####################### Instance Properties #######################

		var vm = this;

		vm.searchUser = '';

		vm.loginModel = new LoginModel();

		vm.DeleteUserByID = DeleteUserByID;
		vm.DeleteAllUsers = DeleteAllUsers;
		vm.DeleteUsersSelected = DeleteUsersSelected;
		vm.CreateUser = CreateUser;
		vm.EditUserByID = EditUserByID;
		vm.ViewUserByID = ViewUserByID;
		vm.CheckAllUsers = CheckAllUsers;
		vm.UserSelectedChanged = UserSelectedChanged;

		//####### Public Methods

		function DeleteUserByID(userObj)
		{
			if(!UtilitiesFactory.ShowDeleteConfirm())
			{
				return;
			}

			vm.loginModel.OperationsModel.DeleteItemByID(userObj).then(
				responseDTO =>
				{
					if(responseDTO.HasError)
					{
						UserMessagesFactory.ShowErrorMessage({ Message: responseDTO.UIMessage });
						return;
					}

					GetAllUsers();
					UserMessagesFactory.ShowSuccessMessage({ Message: responseDTO.UIMessage });
				},
				error => {
					UserMessagesFactory.ShowErrorMessage({ Message: "Ha ocurrido un problema tratando de borrar los datos" });
					console.log(error);
				}
			);
		}

		function DeleteAllUsers()
		{
			if(UtilitiesFactory.IsArrayNullOrEmpty(vm.loginModel.UsersList))
			{
				UserMessagesFactory.ShowErrorMessage({ Message: "No hay registros para eliminar" });
				return;
			}	

			if(!UtilitiesFactory.ShowDeleteConfirm())
			{
				return;
			}

			vm.loginModel.OperationsModel.DeleteAllItems().then(
				responseDTO =>
				{
					if(responseDTO.HasError)
					{
						UserMessagesFactory.ShowErrorMessage({ Message: responseDTO.UIMessage });
						return;
					}
					
					GetAllUsers();
					UserMessagesFactory.ShowSuccessMessage({ Message: responseDTO.UIMessage });
				},
				error => {
					UserMessagesFactory.ShowErrorMessage({ Message: "Ha ocurrido un problema tratando de borrar los datos" });
					console.log(error);
				}
			);
		}

		function DeleteUsersSelected()
		{
			if(UtilitiesFactory.IsArrayNullOrEmpty(vm.loginModel.PaginatorModel.ItemsSelected))
			{
				UserMessagesFactory.ShowErrorMessage({ Message: "Debes seleccionar los registros que deseas eliminar" });
				return;
			}	

			if(!UtilitiesFactory.ShowDeleteConfirm())
			{
				return;
			}

			vm.loginModel.OperationsModel.DeleteItemsSelected(vm.loginModel.PaginatorModel.ItemsSelected).then(
				responseDTO =>
				{
					if(responseDTO.HasError)
					{
						UserMessagesFactory.ShowErrorMessage({ Message: responseDTO.UIMessage });
						return;
					}

					GetAllUsers();
					vm.loginModel.PaginatorModel.ClearItemsSelected();
					UserMessagesFactory.ShowSuccessMessage({ Message: responseDTO.UIMessage });
				},
				error => {
					UserMessagesFactory.ShowErrorMessage({ Message: "Ha ocurrido un problema tratando de borrar los datos" });
					console.log(error);
				}
			);
		}

		function CreateUser()
		{
			var userObj = {
				IsReadOnlyMode : false,
				IsCreateMode: true
			};

			OpenEditOrUpdateModel(userObj);
		}

		function EditUserByID(userObj)
		{			
			userObj.IsReadOnlyMode = false;
			userObj.IsCreateMode = false;
			OpenEditOrUpdateModel(userObj);
		}

		function ViewUserByID(userObj)
		{
			userObj.IsReadOnlyMode = true;
			userObj.IsCreateMode = false;
			OpenEditOrUpdateModel(userObj);			
		}

		function CheckAllUsers()
		{
			var count = 0;
			var subCount = 0;

			vm.loginModel.PaginatorModel.SelectAllItems = !vm.loginModel.PaginatorModel.SelectAllItems ? false : true;

			var i = 0;

			if(vm.loginModel.PaginatorModel.CountCurrentPage + 1 > vm.loginModel.PaginatorModel.PageSize)
			{
				i = vm.loginModel.PaginatorModel.CountCurrentPage;
			}

			for(i; i < vm.loginModel.UsersList.length; i++)
			{
				if(!vm.loginModel.PaginatorModel.SelectAllItems)
				{
					vm.loginModel.UsersList[i].Selected = vm.loginModel.PaginatorModel.SelectAllItems;
					vm.loginModel.PaginatorModel.ItemsSelected = [];
					continue;
				}

				var currentMessage = vm.loginModel.PaginatorModel.ItemsSelected.find(messageToFind => messageToFind.Id == vm.loginModel.UsersList[i].Id);

				if(vm.loginModel.PaginatorModel.CurrentPage + 1 > 1)
				{
					if(i >= vm.loginModel.PaginatorModel.CountCurrentPage && 
					   i <= (vm.loginModel.PaginatorModel.CountCurrentPage * 2))
					{
						if(subCount == vm.loginModel.PaginatorModel.PageSize)
						{
							break;
						}

						vm.loginModel.UsersList[i].Selected = vm.loginModel.PaginatorModel.SelectAllItems;

						if(UtilitiesFactory.IsUndefinedOrNull(currentMessage))
						{
							vm.loginModel.PaginatorModel.ItemsSelected.push(vm.loginModel.UsersList[i]);
						}

						subCount++;
					}
				}
				else if(vm.loginModel.PaginatorModel.CountCurrentPage == 0)
				{
					if(i < vm.loginModel.PaginatorModel.PageSize)
					{
						if(UtilitiesFactory.IsUndefinedOrNull(currentMessage))
						{
							vm.loginModel.PaginatorModel.ItemsSelected.push(vm.loginModel.UsersList[i]);
						}

						vm.loginModel.UsersList[i].Selected = vm.loginModel.PaginatorModel.SelectAllItems;
					}
				}
			}
		}

		function UserSelectedChanged(userObj)
		{
			if(userObj.Selected)
			{
				vm.loginModel.PaginatorModel.ItemsSelected.push(userObj);

				if(vm.loginModel.PaginatorModel.ItemsSelected.length == vm.loginModel.PaginatorModel.PageSize ||
				   UtilitiesFactory.ValidateItemsSelectedInCurrentPage(vm.loginModel.UsersList, vm.loginModel.PaginatorModel))
				{
					vm.loginModel.PaginatorModel.SelectAllItems = true;
				}

				return;
			}

			vm.loginModel.PaginatorModel.ItemsSelected.splice(vm.loginModel.PaginatorModel.ItemsSelected.indexOf(userObj), 1);
			if(!UtilitiesFactory.ValidateItemsSelectedInCurrentPage(vm.loginModel.UsersList, vm.loginModel.PaginatorModel))
			{
				vm.loginModel.PaginatorModel.SelectAllItems = false;
			}
		}


		//####### Private Methods

		function OpenEditOrUpdateModel(userObj)
		{
			var modalInstance = $uibModal.open(
				{
					animation: true,
					templateUrl: 'Client/Intensive/App/Templates/loginAdmin/login.admin.profile.usersadministration.modal.view.php',
					controller: 'Intensive.App.LoginUserModalAdminController',
					controllerAs: 'vm',
					size: 'md',
					keyboard: false,
					backdrop: 'static',
					resolve: 
					{
						UserObjData : function()
						{
							return userObj;
						}
					}
			});
		}

		function GetAllUsers()
		{
			vm.loginModel.OperationsModel.GetAllItems().then(
				responseDTO =>
				{
					if(responseDTO.HasError)
					{
						vm.loginModel.UsersList = [];
						UserMessagesFactory.ShowErrorMessage({ Message: responseDTO.UIMessage });
						return;
					}

					vm.loginModel.UsersList = responseDTO.ResponseData;
				},
				error => {
					UserMessagesFactory.ShowErrorMessage({ Message: "Ha ocurrido un problema tratando de obtener los datos" });
					console.log(error);
				}
			);
		}

		function Initialize()
		{
			GetAllUsers();
		}

		Initialize();
	}
})();