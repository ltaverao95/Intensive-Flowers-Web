(function(){

	'use strict';

	angular
		.module('Intensive.App')
		.service('Intensive.App.LoginQueryAdminService', LoginQueryAdminService);

	LoginQueryAdminService.$inject = [
		'$q',
		'$http',
		'Intensive.Core.Constants'
	];	

	function LoginQueryAdminService($q,
									$http,
									CoreConstants)
	{
		//####################### Instance Properties #######################

		var _self = this;

		_self.SearchOrderByName = SearchOrderByName;
		_self.SearchByDateAndName = SearchByDateAndName;
		_self.SearchByStore = SearchByStore;
		
		//####################### Public Functions #######################

		function SearchOrderByName(orderData)
		{
			var deferred = $q.defer();

			var url = CoreConstants.ADMIN_SERVICES_URL + "store/getOrderByName.php";

			$http.post(url, orderData)
			.success(
				function (data){
					deferred.resolve(data);
				}
			)
			.error(
				function (error){
					deferred.reject(error);
				}
			);

			return deferred.promise;
		}

		function SearchByDateAndName(orderData)
		{
			var deferred = $q.defer();

			var url = CoreConstants.ADMIN_SERVICES_URL + "store/getOrderByDateAndName.php";

			$http.post(url, orderData)
			.success(
				function (data){
					deferred.resolve(data);
				}
			)
			.error(
				function (error){
					deferred.reject(error);
				}
			);

			return deferred.promise;
		}

		function SearchByStore(orderData)
		{
			var deferred = $q.defer();

			var url = CoreConstants.ADMIN_SERVICES_URL + "store/getOrderByStore.php";

			$http.post(url, orderData)
			.success(
				function (data){
					deferred.resolve(data);
				}
			)
			.error(
				function (error){
					deferred.reject(error);
				}
			);

			return deferred.promise;
		}
	}

})();