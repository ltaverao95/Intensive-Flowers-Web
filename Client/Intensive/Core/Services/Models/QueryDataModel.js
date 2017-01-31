(function(){

	'use strict';

	angular
		.module('Intensive.Core')
		.factory('Intensive.Core.Models.QueryDataModel', QueryDataModel);

	QueryDataModel.$inject = [
		'$q',
		'$http',
		'Intensive.Core.Constants',
		'Intensive.Blocks.Utils.Constants',
		'Intensive.Blocks.Utils.UtilitiesFactory'
	];	

	function QueryDataModel($q,
							$http,
							CoreConstants,
							UtilsConstants,
							UtilitiesFactory)
	{
		var Model = function(dataDTO)
		{
			var _self = this;
			
			angular.extend(this, {

				QueryDataResult: null,

				QueryOption: UtilsConstants.QueryOption.SEARCH_BY_IDENTY_CARD,
				IdentityCard: null,
				NameToSearch: null,
				DateToSearch: new Date(),
				StoreName: UtilsConstants.EnumStores.INTENSIVE_FLOWERS_1,

				SearchByIdentityCard: SearchByIdentityCard,
				SearchByName: SearchByName,
				SearchByDateAndStoreName: SearchByDateAndStoreName,
				SearchByStore: SearchByStore,
			}, dataDTO);

			//######## Public Methods

			function SearchByIdentityCard()
			{
				var requestParamsObj = 
                {
                    url: CoreConstants.StoreServiceURL.GET_ORDER_BY_IDENTITY_CARD_URL,
                    method: 'POST',
                    data: angular.toJson(
						{
							IdentityCard: _self.IdentityCard
						}
					)
                };

                return DoRequestToServer(requestParamsObj);
			}

			function SearchByName()
			{
				var requestParamsObj = 
                {
                    url: CoreConstants.StoreServiceURL.GET_ORDER_BY_NAME_URL,
                    method: 'POST',
                    data: angular.toJson(
						{
							Name: _self.NameToSearch
						}
					)
                };

                return DoRequestToServer(requestParamsObj);
			}

			function SearchByDateAndStoreName()
			{
				var requestParamsObj = 
                {
                    url: CoreConstants.StoreServiceURL.GET_ORDER_BY_DATE_AND_STORE_NAME_URL,
                    method: 'POST',
                    data: angular.toJson(
						{
							DateOrder: UtilitiesFactory.GetFormatedDate(_self.DateToSearch),
							Store: _self.StoreName
						}
					)
                };

                return DoRequestToServer(requestParamsObj);
			}

			function SearchByStore()
			{
				var requestParamsObj = 
                {
                    url: CoreConstants.StoreServiceURL.GET_ORDER_BY_STORE_NAME_URL,
                    method: 'POST',
                    data: angular.toJson(
						{
							Store: _self.StoreName
						}
					)
                };

                return DoRequestToServer(requestParamsObj);
			}

			//######## Private Methods

			function DoRequestToServer(requestObj)
            {
                var deferred = $q.defer();

                $http(requestObj).then(
                    d => {
                        deferred.resolve(d.data);
                    }
                )
                .catch(
                    error => {
                        deferred.reject(error);
                    }
                );

                return deferred.promise;
            }
		}

		return Model;

	};	

})();