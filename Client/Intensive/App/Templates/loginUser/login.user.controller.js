(function(){

	'use strict';

	angular
		.module('Intensive.App')
		.controller('Intensive.App.LoginUserController', loginController);

	loginController.$inject = [
		'$state',
		'$timeout',
		'$window',
		'Intensive.App.LoginUserService',
		'Intensive.Blocks.Utils.Constants',
		'Intensive.Blocks.Messages.UserMessagesFactory'

	];	

	function loginController($state,
							 $timeout,
							 $window, 
							 LoginUserService,
							 UtilsConstants,
							 UserMessagesFactory)
	{

		//####################### Instance Properties #######################

		var vm = this;

		var _paramsDTO = {
			Message: ''
		};
		
		vm.rootDataLogin = {
			user: '',
			pass: ''
		};

		vm.ValidateUser = ValidateUser;

		//####################### Public Functions #######################

		function ValidateUser(){

			UserMessagesFactory.ShowLoadingDialog();

			LoginUserService.ValidateUser(vm.rootDataLogin).then(
				function(data){

					if(data.StackTrace != "" && data.Result == UtilsConstants.EnumResult.ERROR)
					{
						UserMessagesFactory.HideLoadingDialog();

						_paramsDTO.Message = data.ResponseMessage;
						UserMessagesFactory.ShowErrorMessage(_paramsDTO);
					}
					else if((data.ResponseMessage != "") && (data.StackTrace == ""))
					{
						UserMessagesFactory.HideLoadingDialog();

						$('#response')
							.html(data.ResponseMessage)
							.css({'color' : 'red'});
					}
					else 
					{
						$state.go('intensive.home');
						$timeout(function(){
							$window.location.reload();	
						}, 300);
					}
				},
				function(err){
					console.log(err);
				}
			);
		};
	};

})();