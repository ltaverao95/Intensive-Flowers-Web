(function(){

	'use strict';

	angular
		.module('Intensive.App')
		.controller('Intensive.App.LoginOrderAdminController', LoginOrderAdminController);

	LoginOrderAdminController.$inject = [
		'$state',
		'$stateParams',
		'$uibModal',
		'GetStoresInfo',
		'GetAllOrders',
		'Intensive.App.LoginOrderAdminService',
		'Intensive.Blocks.Utils.Constants',
		'Intensive.Blocks.Messages.UserMessagesFactory'

	];	

	function LoginOrderAdminController($state,
									   $stateParams,
									   $uibModal,
									   GetStoresInfo,
									   GetAllOrders,
									   LoginOrderAdminService,
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

		vm.rootOrdersObj = {
			searchOrder: '',
			selectAllOrders : false,
			arrOrderSelected: [],
			allOrders: []
		};
		
		if(GetAllOrders.ResponseMessage !== "")
		{
			_paramsDTO.Message = GetAllOrders.ResponseMessage;
			UserMessagesFactory.ShowErrorMessage(_paramsDTO);
		}
		else
		{
			vm.rootOrdersObj.allOrders = GetAllOrders.ObjData;
		}

		vm.orderDetailUpdate = $stateParams.objData;
		vm.storesToSelect = GetStoresInfo.storeNumber;
		vm.wayToPayToSelect = GetStoresInfo.wayToPay;

		vm.CurrentPageChanged = CurrentPageChanged;
		vm.DeleteOrderByID = DeleteOrderByID;
		vm.DeleteAllOrders = DeleteAllOrders;
		vm.DeleteOrderSelected = DeleteOrderSelected;
		vm.UpdateOrder = UpdateOrder;
		vm.ViewOrderByID = ViewOrderByID;
		vm.CheckAllOrders = CheckAllOrders;
		vm.OrderSelectedChanged = OrderSelectedChanged;
		vm.NumberOfPages = NumberOfPages;

		//####################### Public Functions #######################

		function CurrentPageChanged(isNextPage)
		{
			if(isNextPage)
			{
				vm.currentPage = vm.currentPage + 1;
				vm.countCurrentPage = vm.currentPage * vm.pageSize;
				return;
			}

			vm.currentPage = vm.currentPage - 1
			vm.countCurrentPage = vm.currentPage * vm.pageSize;
		}

		function DeleteOrderByID(clientOrder)
		{
			LoginOrderAdminService.DeleteOrderByID(clientOrder).then(
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

		function DeleteAllOrders()
		{
			if(vm.rootOrdersObj.allOrders.length == 0)
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

			LoginOrderAdminService.DeleteAllOrders().then(
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

		function DeleteOrderSelected()
		{
			if(vm.rootOrdersObj.allOrders.length <= 0)
			{
				_paramsDTO.Message = "No hay registros para eliminar";
				UserMessagesFactory.ShowErrorMessage(_paramsDTO);
				return;
			}

			if(vm.rootOrdersObj.arrOrderSelected.length == 0)
			{
				_paramsDTO.Message = "Debes seleccionar los mensajes que quieres eliminar";
				UserMessagesFactory.ShowErrorMessage(_paramsDTO);
				return;
			}

			LoginOrderAdminService.DeleteOrderSelectedByID(vm.rootOrdersObj.arrOrderSelected).then(
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

			vm.rootOrdersObj.selectAllOrders = !vm.rootOrdersObj.selectAllOrders ? false : true;

			angular.forEach(vm.rootOrdersObj.allOrders, function (order) 
			{
				count++;

				if(!vm.rootOrdersObj.selectAllOrders)
				{
					order.Selected = vm.rootOrdersObj.selectAllOrders;
					vm.rootOrdersObj.arrOrderSelected = [];
					return;
				}

				if(vm.currentPage + 1 > 1)
				{
					if(count >= vm.countCurrentPage + 1 && count <= (vm.countCurrentPage * 2))
					{
						if(subCount == vm.pageSize)
						{
							return;
						}

						order.Selected = vm.rootOrdersObj.selectAllOrders;
						vm.rootOrdersObj.arrOrderSelected.push(order);
						subCount++;
					}
				}
				else if(vm.countCurrentPage == 0)
				{
					if(count <= 6)
					{
						order.Selected = vm.rootOrdersObj.selectAllOrders;
						vm.rootOrdersObj.arrOrderSelected.push(order);
					}
				}

        	});

		}

		function OrderSelectedChanged(clientOrder)
		{
			if(clientOrder.Selected)
			{
				vm.rootOrdersObj.arrOrderSelected.push(clientOrder);

				if(vm.rootOrdersObj.arrOrderSelected.length == vm.rootOrdersObj.allOrders.length)
				{
					vm.rootOrdersObj.selectAllOrders = true;
				}
			}
			else 
			{
				vm.rootOrdersObj.arrOrderSelected.splice(vm.rootOrdersObj.arrOrderSelected.indexOf(clientOrder), 1);
			}
		}

		//####################### Pagination Functions #######################

		function NumberOfPages()
		{
			if(vm.rootOrdersObj.allOrders == 0)
			{
				return 0;
			}

			return Math.ceil(vm.rootOrdersObj.allOrders.length / vm.pageSize);
		}

		//####################### Private Functions #######################

		function OpenEditOrUpdateModel(clientOrder)
		{
			var modalInstance = $uibModal.open(
				{
					animation: true,
					templateUrl: 'Client/Intensive/App/Components/loginAdmin/login.admin.order.modal.view.html',
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
	}

})();