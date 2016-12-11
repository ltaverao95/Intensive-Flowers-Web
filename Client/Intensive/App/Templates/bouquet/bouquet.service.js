(function(){

	'use strict';

	angular
		.module('Intensive.App')
		.service('Intensive.App.BouquetService', BouquetService);

	BouquetService.$inject = [
		'$q',
		'$http',
		'Intensive.Core.Constants'
	];	

	function BouquetService($q,
							$http,
							CoreConstants)
	{
		//####################### Instance Properties #######################

		var _self = this;

		_self.GetAllBouquets = GetAllBouquets;

		//####################### Public Functions #######################

		function GetAllBouquets(){

			var deferred = $q.defer();

			var url = CoreConstants.JSON_DATA_URL + "bouquetData.json";

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
	};

})();