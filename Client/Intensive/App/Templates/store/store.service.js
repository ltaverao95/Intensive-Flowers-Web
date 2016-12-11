(function(){

	'use strict';

	angular
		.module('Intensive.App')
		.service('Intensive.App.StoreService', StoreService);

	StoreService.$inject = [
		'$q',
		'$http',
		'Intensive.Core.Constants'
	];	

	function StoreService($q,
						  $http,
						  CoreConstants)
	{
		//####################### Instance Properties #######################

		var _self = this;

		_self.GetStoresInfo = GetStoresInfo;
		_self.GetAllOrders = GetAllOrders;
		_self.NewOrderMessage = NewOrderMessage;

		//####################### Public Functions #######################

		function GetStoresInfo(){

			var deferred = $q.defer();

			var url = CoreConstants.JSON_DATA_URL + "storesData.json";

			$http.get(url)
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

		function GetAllOrders(){

			var deferred = $q.defer();

			var url = CoreConstants.USER_SERVICES_URL + 'store/getAllOrders.php';

			$http.get(url)
				.success(function(data){
					deferred.resolve(data);
				})
				.error(function(error){
					deferred.reject(error);
				});

			return deferred.promise;
		};

		function NewOrderMessage(objOrderData){

			var deferred = $q.defer();

			var url = CoreConstants.USER_SERVICES_URL + 'store/newOrder.php';

			$http.post(url, objOrderData)
				.success(function(data){
					deferred.resolve(data);
				})
				.error(function(error){
					deferred.reject(error);
				});

			return deferred.promise;
		};
	};

})();