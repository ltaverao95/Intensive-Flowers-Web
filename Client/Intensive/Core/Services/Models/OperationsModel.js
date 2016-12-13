(function () {
    'use strict';

    angular
        .module('Intensive.Core')
        .factory('Intensive.Core.Models.OperationsModel', OperationsModel);

    OperationsModel.$inject = [
        '$q',
        '$http'
    ];

    function OperationsModel($q,
                             $http)
    {
        var Model = function (dataDTO) 
        {
            var _self = this;

            angular.extend(this, {

                //Properties
                GetAllItemsURL: null,
                SaveItemURL: null,
                DeleteAllItemsURL: null,
                DeleteItemByIDURL: null,
                DeleteItemsSelectedURL: null,

                //CRUD Operations
                GetAllItems: GetAllItems,
                SaveItem: SaveItem,
                DeleteAllItems: DeleteAllItems,
                DeleteItemByID: DeleteItemByID,
                DeleteItemsSelected: DeleteItemsSelected

            }, dataDTO);

            //######## Public

            function GetAllItems()
            {
                var requestParamsObj = 
                {
                    url: _self.GetAllItemsURL,
                    method: 'GET'
                };

                return DoRequestToServer(requestParamsObj);
            }

            function SaveItem(itemObj)
            {
                var requestParamsObj = 
                {
                    url: _self.SaveItemURL,
                    method: 'POST',
                    data: angular.toJson(itemObj)
                };

                return DoRequestToServer(requestParamsObj);
            }

            function DeleteAllItems(itemObj)
            {
                var requestParamsObj = 
                {
                    url: _self.DeleteAllItemsURL,
                    method: 'GET'
                };

                return DoRequestToServer(requestParamsObj);
            }

            function DeleteItemByID(itemObj)
            {
                var requestParamsObj = 
                {
                    url: _self.DeleteItemByIDURL,
                    method: 'POST',
                    data: angular.toJson(itemObj)
                };

                return DoRequestToServer(requestParamsObj);
            }

            function DeleteItemsSelected(itemObj)
            {
                var requestParamsObj = 
                {
                    url: _self.DeleteItemsSelected,
                    method: 'POST',
                    data: angular.toJson(itemObj)
                };

                return DoRequestToServer(requestParamsObj);
            }

            //######## Private

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
    }
})();