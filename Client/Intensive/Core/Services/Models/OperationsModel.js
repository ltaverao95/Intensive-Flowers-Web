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
                GetItemByIDURL: null,
                SaveItemURL: null,
                DeleteAllItemsURL: null,
                DeleteItemByIDURL: null,
                DeleteItemsSelectedURL: null,
                UpdateItemByIDURL: null,

                //CRUD Operations
                GetAllItems: GetAllItems,
                GetItemByID: GetItemByID,
                SaveItem: SaveItem,
                DeleteAllItems: DeleteAllItems,
                DeleteItemByID: DeleteItemByID,
                DeleteItemsSelected: DeleteItemsSelected,
                UpdateItemByID: UpdateItemByID

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

            function GetItemByID(itemObj)
            {
                var requestParamsObj = 
                {
                    url: _self.GetItemByIDURL,
                    method: 'POST',
                    data: angular.toJson(itemObj)
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

            function DeleteAllItems()
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
                    url: _self.DeleteItemsSelectedURL,
                    method: 'POST',
                    data: angular.toJson(itemObj)
                };

                return DoRequestToServer(requestParamsObj);
            }

            function UpdateItemByID(itemObj)
            {
                var requestParamsObj = 
                {
                    url: _self.UpdateItemByIDURL,
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