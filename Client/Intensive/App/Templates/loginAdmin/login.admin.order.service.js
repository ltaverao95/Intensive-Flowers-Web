(function(){

	'use strict';

	angular
		.module('Intensive.App')
		.service('Intensive.App.LoginOrderAdminService', LoginOrderAdminService);

	LoginOrderAdminService.$inject = [
		'$q',
		'$http',
		'Intensive.Core.Constants'
	];	

	function LoginOrderAdminService($q,
									$http,
									CoreConstants)
	{
		//####################### Instance Properties #######################

		var _self = this;

		_self.DeleteOrderByID = DeleteOrderByID;
		_self.DeleteAllOrders = DeleteAllOrders;
		_self.DeleteOrderSelectedByID = DeleteOrderSelectedByID;
		_self.UpdateOrderByID = UpdateOrderByID;

		//####################### Public Functions #######################

		function DeleteOrderByID(orderObj)
		{
			var deferred = $q.defer();

			var url = CoreConstants.ADMIN_SERVICES_URL + "store/deleteOrderByID.php";

			$http.post(url, orderObj)
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

		function DeleteAllOrders()
		{
			var deferred = $q.defer();

			var url = CoreConstants.ADMIN_SERVICES_URL + "store/deleteAllOrders.php";

			$http.get(url)
			.success(
				function(data)
				{
					deferred.resolve(data);
				}
			).error(
				function(error)
				{
					deferred.reject(error);
				}
			);

			return deferred.promise;
		}

		function DeleteOrderSelectedByID(orderObj)
		{
			var deferred = $q.defer();

			var url = CoreConstants.ADMIN_SERVICES_URL + "store/deleteOrderSelectedByID.php";

			$http.post(url, orderObj)
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

		function UpdateOrderByID(orderObj)
		{
			var deferred = $q.defer();

			var url = CoreConstants.ADMIN_SERVICES_URL + "store/updateOrderByID.php";

			$http.post(url, orderObj)
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
	};

})();