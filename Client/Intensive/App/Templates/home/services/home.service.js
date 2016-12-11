(function(){

	'use strict';

	angular
		.module('Intensive.App')
		.service('Intensive.App.Services.HomeService', HomeService);

	HomeService.$inject = [
		'$http',
		'$q',
		'Intensive.Core.Constants'
	];

	function HomeService($http,
						 $q,
						 CoreConstants)
	{
		//####################### Instance Properties #######################

		var _self = this;

		_self.GetAllMessages = GetAllMessages;

		//####################### Public Functions #######################

		function GetAllMessages()
		{
			var deferred = $q.defer();

			var url = CoreConstants.USER_SERVICES_URL + 'message/getMessages.php';

			$http.get(url)
				.success(function(data){
					deferred.resolve(data);
				})
				.error(function(error){
					deferred.reject(error);
				});

			return deferred.promise;
		}
	}

})();