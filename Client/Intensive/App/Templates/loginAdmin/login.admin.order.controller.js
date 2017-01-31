(function(){

	'use strict';

	angular
		.module('Intensive.App')
		.controller('Intensive.App.LoginOrderAdminController', LoginOrderAdminController);

	LoginOrderAdminController.$inject = [
		'$uibModal',
		'$scope',
		'Intensive.Blocks.Messages.UserMessagesFactory',
		'Intensive.Core.Models.StoreModel',
		'Intensive.Blocks.Utils.ActionResultModel',
		'Intensive.Blocks.Utils.UtilitiesFactory'
	];	

	function LoginOrderAdminController($uibModal,
									   $scope,
							 		   UserMessagesFactory,
									   StoreModel,
									   ActionResultModel,
									   UtilitiesFactory)
	{	
		//####################### Instance Properties #######################
		
		var vm = this;

		vm.storeModel = new StoreModel();

		vm.searchOrder = '';

		$scope.$on("OrderChanged", GetAllOrders);

		vm.DeleteOrderByID = DeleteOrderByID;
		vm.DeleteAllOrders = DeleteAllOrders;
		vm.DeleteOrdersSelected = DeleteOrdersSelected;
		vm.UpdateOrder = UpdateOrder;
		vm.ViewOrderByID = ViewOrderByID;
		vm.CheckAllOrders = CheckAllOrders;
		vm.OrderSelectedChanged = OrderSelectedChanged;

		//####################### Public Functions #######################

		function DeleteOrderByID(clientOrder)
		{
			if(!UtilitiesFactory.ShowDeleteConfirm())
			{
				return;
			}

			vm.storeModel.OperationsModel.DeleteItemByID(clientOrder).then(
				responseDTO =>
				{
					if(responseDTO.HasError)
					{
						UserMessagesFactory.ShowErrorMessage({ Message: responseDTO.UIMessage });
						return;
					}

					GetAllOrders();
					UserMessagesFactory.ShowSuccessMessage({ Message: responseDTO.UIMessage });
				},
				error => {
					UserMessagesFactory.ShowErrorMessage({ Message: "Ha ocurrido un problema tratando de borrar los datos" });
					console.log(error);
				}
			);
		}

		function DeleteAllOrders()
		{
			if(UtilitiesFactory.IsArrayNullOrEmpty(vm.storeModel.OrdersList))
			{
				UserMessagesFactory.ShowErrorMessage({ Message: "No hay registros para eliminar" });
				return;
			}	

			if(!UtilitiesFactory.ShowDeleteConfirm())
			{
				return;
			}

			vm.storeModel.OperationsModel.DeleteAllItems().then(
				responseDTO =>
				{
					if(responseDTO.HasError)
					{
						UserMessagesFactory.ShowErrorMessage({ Message: responseDTO.UIMessage });
						return;
					}
					
					GetAllOrders();
					UserMessagesFactory.ShowSuccessMessage({ Message: responseDTO.UIMessage });
				},
				error => {
					UserMessagesFactory.ShowErrorMessage({ Message: "Ha ocurrido un problema tratando de borrar los datos" });
					console.log(error);
				}
			);
		}

		function DeleteOrdersSelected()
		{
			if(UtilitiesFactory.IsArrayNullOrEmpty(vm.storeModel.PaginatorModel.ItemsSelected))
			{
				UserMessagesFactory.ShowErrorMessage({ Message: "Debes seleccionar los registros que deseas eliminar" });
				return;
			}	

			if(!UtilitiesFactory.ShowDeleteConfirm())
			{
				return;
			}

			vm.storeModel.OperationsModel.DeleteItemsSelected(vm.storeModel.PaginatorModel.ItemsSelected).then(
				responseDTO =>
				{
					if(responseDTO.HasError)
					{
						UserMessagesFactory.ShowErrorMessage({ Message: responseDTO.UIMessage });
						return;
					}

					GetAllOrders();
					vm.storeModel.PaginatorModel.ClearItemsSelected();
					UserMessagesFactory.ShowSuccessMessage({ Message: responseDTO.UIMessage });
				},
				error => {
					UserMessagesFactory.ShowErrorMessage({ Message: "Ha ocurrido un problema tratando de borrar los datos" });
					console.log(error);
				}
			);
		}

		function UpdateOrder(clientOrder)
		{			
			clientOrder.IsReadOnlyMode = false;
			OpenEditOrUpdateModel(clientOrder);
		}

		function ViewOrderByID(clientOrder)
		{
			clientOrder.IsReadOnlyMode = true;
			OpenEditOrUpdateModel(clientOrder);			
		}

		function CheckAllOrders()
		{
			var count = 0;
			var subCount = 0;

			vm.storeModel.PaginatorModel.SelectAllItems = !vm.storeModel.PaginatorModel.SelectAllItems ? false : true;

			var i = 0;

			if(vm.storeModel.PaginatorModel.CountCurrentPage + 1 > vm.storeModel.PaginatorModel.PageSize)
			{
				i = vm.storeModel.PaginatorModel.CountCurrentPage;
			}

			for(i; i < vm.storeModel.OrdersList.length; i++)
			{
				if(!vm.storeModel.PaginatorModel.SelectAllItems)
				{
					vm.storeModel.OrdersList[i].Selected = vm.storeModel.PaginatorModel.SelectAllItems;
					vm.storeModel.PaginatorModel.ItemsSelected = [];
					continue;
				}

				var currentMessage = vm.storeModel.PaginatorModel.ItemsSelected.find(messageToFind => messageToFind.Id == vm.storeModel.OrdersList[i].Id);

				if(vm.storeModel.PaginatorModel.CurrentPage + 1 > 1)
				{
					if(i >= vm.storeModel.PaginatorModel.CountCurrentPage && 
					   i <= (vm.storeModel.PaginatorModel.CountCurrentPage * 2))
					{
						if(subCount == vm.storeModel.PaginatorModel.PageSize)
						{
							break;
						}

						vm.storeModel.OrdersList[i].Selected = vm.storeModel.PaginatorModel.SelectAllItems;

						if(UtilitiesFactory.IsUndefinedOrNull(currentMessage))
						{
							vm.storeModel.PaginatorModel.ItemsSelected.push(vm.storeModel.OrdersList[i]);
						}

						subCount++;
					}
				}
				else if(vm.storeModel.PaginatorModel.CountCurrentPage == 0)
				{
					if(i < vm.storeModel.PaginatorModel.PageSize)
					{
						if(UtilitiesFactory.IsUndefinedOrNull(currentMessage))
						{
							vm.storeModel.PaginatorModel.ItemsSelected.push(vm.storeModel.OrdersList[i]);
						}

						vm.storeModel.OrdersList[i].Selected = vm.storeModel.PaginatorModel.SelectAllItems;
					}
				}
			}
		}

		function OrderSelectedChanged(clientOrder)
		{
			if(clientOrder.Selected)
			{
				vm.storeModel.PaginatorModel.ItemsSelected.push(clientOrder);

				if(vm.storeModel.PaginatorModel.ItemsSelected.length == vm.storeModel.PaginatorModel.PageSize ||
				   UtilitiesFactory.ValidateItemsSelectedInCurrentPage(vm.storeModel.OrdersList, vm.storeModel.PaginatorModel))
				{
					vm.storeModel.PaginatorModel.SelectAllItems = true;
				}

				return;
			}

			vm.storeModel.PaginatorModel.ItemsSelected.splice(vm.storeModel.PaginatorModel.ItemsSelected.indexOf(clientOrder), 1);
			if(!UtilitiesFactory.ValidateItemsSelectedInCurrentPage(vm.storeModel.OrdersList, vm.storeModel.PaginatorModel))
			{
				vm.storeModel.PaginatorModel.SelectAllItems = false;
			}
		}

		//####################### Private Functions #######################

		function OpenEditOrUpdateModel(clientOrder)
		{
			var modalInstance = $uibModal.open(
				{
					animation: true,
					templateUrl: 'Client/Intensive/App/Templates/loginAdmin/login.admin.order.modal.view.html',
					controller: 'Intensive.App.LoginOrderModalAdminController',
					controllerAs: 'vm',
					size: 'md',
					keyboard: false,
					backdrop: 'static',
					resolve: 
					{
						OrderObjData : function()
						{
							return clientOrder;
						}
					}
			});
		}

		function GetAllOrders()
		{
			vm.storeModel.OperationsModel.GetAllItems().then(
				responseDTO =>
				{
					if(responseDTO.HasError)
					{
						vm.storeModel.OrdersList = [];
						UserMessagesFactory.ShowErrorMessage({ Message: responseDTO.UIMessage });
						return;
					}

					vm.storeModel.OrdersList = responseDTO.ResponseData;
				},
				error => {
					UserMessagesFactory.ShowErrorMessage({ Message: "Ha ocurrido un problema tratando de obtener los datos" });
					console.log(error);
				}
			);
		}

		function Initialize()
		{
			GetAllOrders();
		}

		Initialize();
	}

})();