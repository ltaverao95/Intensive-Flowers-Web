(function(){

	'use strict';

	angular
		.module('Intensive.App')
		.controller('Intensive.App.LoginMessageAdminController', LoginMessageAdminController);

	LoginMessageAdminController.$inject = [
		'$scope',
		'$stateParams',
		'$state',
		'$uibModal',
		'GetAllMessages',
		'Intensive.App.MessageLoginService',
		'Intensive.Blocks.Utils.Constants',
		'Intensive.Blocks.Messages.UserMessagesFactory'
	];	

	function LoginMessageAdminController($scope,
										 $stateParams,
										 $state,
										 $uibModal,
										 GetAllMessages,
										 MessageLoginService,
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

		vm.rootMessageObj = {
			searchMessage : '',
			messagesObj : [],
			selectAllMessages: false,
			arrMessageSelected : []
		};

		if(GetAllMessages.ResponseMessage !== "")
		{
			_paramsDTO.Message = GetAllMessages.ResponseMessage;
			UserMessagesFactory.ShowErrorMessage(_paramsDTO);

			vm.rootMessageObj.messagesObj = [];
		}
		else
		{
			vm.rootMessageObj.messagesObj = GetAllMessages.ObjData;
		}

		vm.messageDetailUpdate = $stateParams.objData;

		vm.CurrentPageChanged = CurrentPageChanged;
		vm.DeleteMessageByID = DeleteMessageByID;
		vm.DeleteAllMessages = DeleteAllMessages;
		vm.DeleteMessageSelected = DeleteMessageSelected;		
		vm.EditMessageById = EditMessageById;
		vm.ViewMessageById = ViewMessageById;
		vm.CheckAllMessages = CheckAllMessages;
		vm.MessageSelectedChanged = MessageSelectedChanged;
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

		function DeleteMessageByID(messageObj)
		{
			MessageLoginService.DeleteMessageByID(messageObj).then(
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

		function DeleteAllMessages()
		{			
			if(vm.rootMessageObj.messagesObj.length == 0)
			{
				_paramsDTO.Message = "No hay registros para eliminar";
				UserMessagesFactory.ShowErrorMessage(_paramsDTO);
				return;
			}

			var response = confirm("¿Estas seguro que deseas eliminar todos los mensajes?");

			if(!response)
			{
				return;
			}

			MessageLoginService.DeleteAllMessages().then(
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

		function DeleteMessageSelected()
		{
			if(vm.rootMessageObj.arrMessageSelected.length == 0)
			{
				_paramsDTO.Message = "Debes seleccionar los mensajes que quieres eliminar";
				UserMessagesFactory.ShowErrorMessage(_paramsDTO);
				return;
			}

			MessageLoginService.DeleteMessagessSelectedByID(vm.rootMessageObj.arrMessageSelected).then(
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

			vm.rootMessageObj.selectAllMessages = !vm.rootMessageObj.selectAllMessages ? false : true;

			angular.forEach(vm.rootMessageObj.messagesObj, function (message) 
			{
				count++;

				if(!vm.rootMessageObj.selectAllMessages)
				{
					message.Selected = vm.rootMessageObj.selectAllMessages;
					vm.rootMessageObj.arrMessageSelected = [];
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

						message.Selected = vm.rootMessageObj.selectAllMessages;
						vm.rootMessageObj.arrMessageSelected.push(message);
						subCount++;
					}
				}
				else if(vm.countCurrentPage == 0)
				{
					if(count <= 6)
					{
						message.Selected = vm.rootMessageObj.selectAllMessages;
						vm.rootMessageObj.arrMessageSelected.push(message);
					}
				}
        	});
		}

		function MessageSelectedChanged(messageObj)
		{
			if(messageObj.Selected)
			{
				vm.rootMessageObj.arrMessageSelected.push(messageObj);

				if(vm.rootMessageObj.arrMessageSelected.length == vm.rootMessageObj.messagesObj.length)
				{
					vm.rootMessageObj.selectAllMessages = true;
				}
			}
			else 
			{
				vm.rootMessageObj.arrMessageSelected.splice(vm.rootMessageObj.arrMessageSelected.indexOf(messageObj), 1);
			}
		}

		//####################### Pagination Functions #######################

		function NumberOfPages()
		{
			if(vm.rootMessageObj.messagesObj == 0)
			{
				return 0;
			}

			return Math.ceil(vm.rootMessageObj.messagesObj.length / vm.pageSize);
		}

		//####################### Private Functions #######################

		function OpenEditOrUpdateModel(messageObj)
		{
			var modalInstance = $uibModal.open(
				{
					animation: true,
					templateUrl: 'Client/Intensive/App/Components/loginAdmin/login.admin.message.modal.view.html',
					controller: 'Intensive.App.LoginMessageModalAdminController',
					controllerAs: 'vm',
					size: 'md',
					resolve: 
					{
						MessageObjData : function(){
							return messageObj;
						}
					}
				}
			);
		}
	};

})();