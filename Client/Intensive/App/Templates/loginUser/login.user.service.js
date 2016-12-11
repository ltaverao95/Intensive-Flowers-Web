(function(){

	'use strict';

	angular
		.module('Intensive.App')
		.service('Intensive.App.LoginUserService', LoginUserService);

	LoginUserService.$inject = [
		'$http',
		'$q',
		'Intensive.Core.Constants'
	];	

	function LoginUserService($http, 
						  $q, 
						  CoreConstants)
	{
		//####################### Instance Properties #######################

		var _self = this;

		_self.ValidateUser = ValidateUser;

		//####################### Public Functions #######################		

		function ValidateUser(loginDataObj){

			var deferred = $q.defer();

			var url = CoreConstants.USER_SERVICES_URL + "login/validateUser.php";

			$http.post(url, loginDataObj)
				.success(
					function(data)
					{
						deferred.resolve(data);
					}
				)
				.error(
					function(error)
					{
						deferred.reject(error);
					}
				);

			return deferred.promise;	

		};
	};

})();