(function(){

	'use strict';

	angular
		.module('Intensive.Blocks.Messages')
		.factory('Intensive.Blocks.Messages.UserMessagesFactory', UserMessagesFactory);

	UserMessagesFactory.$inject = [
		'toaster'
	];	

	function UserMessagesFactory (toaster) {
		
		var _paramsDTO = {
			Message: '',
			State: '',
			Type: ''
		};

		var service = {
			HideLoadingDialog: HideLoadingDialog,
			ShowErrorMessage: ShowErrorMessage,
			ShowInfoMessage: ShowInfoMessage,
			ShowLoadingDialog: ShowLoadingDialog,
			ShowSuccessMessage: ShowSuccessMessage
		};

		return service;

		//####### Public

		function  HideLoadingDialog(){

			$('#pleaseWaitMessage').modal('hide');
		};

		function ShowErrorMessage(paramsDTO){

			_paramsDTO.Message = paramsDTO.Message;
			_paramsDTO.State = 'Error';
			_paramsDTO.Type = 'error';

			ShowToaster(_paramsDTO);
		};

		function ShowInfoMessage(paramsDTO){

			_paramsDTO.Message = paramsDTO.Message;
			_paramsDTO.State = 'Info';
			_paramsDTO.Type = 'info';

			ShowToaster(_paramsDTO);
		};

		function ShowLoadingDialog(){

			$('#pleaseWaitMessage').modal('show');
		};

		function ShowSuccessMessage(paramsDTO){

			_paramsDTO.Message = paramsDTO.Message;
			_paramsDTO.State = 'Success';
			_paramsDTO.Type = 'success';

			ShowToaster(_paramsDTO);
		};

		//####### Private

		function ShowToaster(paramsDTO){

			toaster.pop(paramsDTO.Type, paramsDTO.State, paramsDTO.Message);
		};

	};	

})();