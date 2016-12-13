(function(){

	'use strict';

	angular
		.module('Intensive.App')
		.controller('Intensive.App.LoginOrderAdminController', LoginOrderAdminController);

	LoginOrderAdminController.$inject = [
		'$state',
		'$stateParams',
		'$uibModal',
		'Intensive.Blocks.Utils.Constants',
		'Intensive.Blocks.Messages.UserMessagesFactory',
		'Intensive.Core.Models.StoreModel',
		'Intensive.Blocks.Utils.ActionResultModel'
	];	

	function LoginOrderAdminController($state,
									   $stateParams,
									   $uibModal,
							 		   UtilsConstants,
							 		   UserMessagesFactory,
									   StoreModel,
									   ActionResultModel)
	{	
		//####################### Instance Properties #######################
		
		var vm = this;

		vm.storeModel = new StoreModel();

		vm.searchOrder = '';

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
			var actionResultModel = ValidateItemsBeforeDelete();
			if(actionResultModel.HasError)
			{
				UserMessagesFactory.ShowErrorMessage({ Message: actionResultModel.UIMessage });
			}

			if(!ShowDeleteCurrentUserConfirm())
			{
				return;
			}

			vm.storeModel.OperationsModel.DeleteItemByID().then(
				responseDTO =>
				{
					if(responseDTO.HasError)
					{
						UserMessagesFactory.ShowErrorMessage({ Message: responseDTO.UIMessage });
						return;
					}

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
			var actionResultModel = ValidateItemsBeforeDelete();
			if(actionResultModel.HasError)
			{
				UserMessagesFactory.ShowErrorMessage({ Message: actionResultModel.UIMessage });
			}

			if(!ShowDeleteConfirm())
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
			var actionResultModel = ValidateItemsBeforeDelete();
			if(actionResultModel.HasError)
			{
				UserMessagesFactory.ShowErrorMessage({ Message: actionResultModel.UIMessage });
			}

			if(!ShowDeleteConfirm())
			{
				return;
			}

			vm.storeModel.OperationsModel.DeleteItemsSelected().then(
				responseDTO =>
				{
					if(responseDTO.HasError)
					{
						UserMessagesFactory.ShowErrorMessage({ Message: responseDTO.UIMessage });
						return;
					}

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

			vm.storeModel.OrdersList.map(
				function (order) 
				{
					count++;

					if(!vm.storeModel.PaginatorModel.SelectAllItems)
					{
						order.Selected = vm.storeModel.PaginatorModel.SelectAllItems;
						vm.storeModel.PaginatorModel.ItemsSelected = [];
						return;
					}

					if(vm.storeModel.PaginatorModel.CurrentPage + 1 > 1)
					{
						if(count >= vm.storeModel.PaginatorModel.CountCurrentPage + 1 && count <= (vm.storeModel.PaginatorModel.CountCurrentPage * 2))
						{
							if(subCount == vm.storeModel.PaginatorModel.PageSize)
							{
								return;
							}

							order.Selected = vm.storeModel.PaginatorModel.SelectAllItems;
							vm.storeModel.PaginatorModel.ItemsSelected.push(order);
							subCount++;
						}
					}
					else if(vm.storeModel.PaginatorModel.CountCurrentPage == 0)
					{
						if(count <= 6)
						{
							order.Selected = vm.storeModel.PaginatorModel.SelectAllItems;
							vm.storeModel.PaginatorModel.ItemsSelected.push(order);
						}
					}

				}
			);

		}

		function OrderSelectedChanged(clientOrder)
		{
			if(clientOrder.Selected)
			{
				vm.storeModel.PaginatorModel.ItemsSelected.push(clientOrder);

				if(vm.storeModel.PaginatorModel.ItemsSelected.length == vm.storeModel.OrdersList.length)
				{
					vm.storeModel.PaginatorModel.SelectAllItems = true;
				}
			}
			else 
			{
				vm.storeModel.PaginatorModel.ItemsSelected.splice(vm.storeModel.PaginatorModel.ItemsSelected.indexOf(clientOrder), 1);
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
					resolve: 
					{
						OrderObjData : function()
						{
							return clientOrder;
						}
					}
			});
		}

		function ShowDeleteConfirm()
		{
			var response = confirm("¿Estas seguro que deseas eliminar todos los pedidos?");

			return response;	
		}

		function ShowDeleteCurrentUserConfirm()
		{
			var response = confirm("¿Estas seguro que deseas eliminar este registro?");

			return response;	
		}

		function ValidateItemsBeforeDelete()
		{
			var actionResultModel = new ActionResultModel();

			if(vm.storeModel.OrdersList.length == 0)
			{
				actionResultModel.SetError("No hay registros para eliminar");
				return actionResultModel;
			}

			return actionResultModel;
		}

		function Initialize()
		{
			vm.storeModel.OperationsModel.GetAllItems().then(
				responseDTO =>
				{
					if(responseDTO.HasError)
					{
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

		Initialize();
	}

})();