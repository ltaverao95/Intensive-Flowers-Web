(function () {
    'use strict';

    angular
        .module('Intensive.Core')
        .factory('Intensive.Core.Models.BouquetModel', BouquetModel);

    BouquetModel.$inject = [
        'Intensive.Core.Models.OperationsModel',
        'Intensive.Core.Models.PaginatorModel'
    ];

    function BouquetModel(OperationsModel,
                          PaginatorModel)
    {
        var Model = function (dataDTO) 
        {
            var _self = this;

            angular.extend(this, {

                OperationsModel: new OperationsModel(),
                PaginatorModel: new PaginatorModel()

            }, dataDTO);

            //######## Public


            //######## Private

            function Initialize()
            {
                _self.OperationsModel.GetAllItemsURL = null;
                _self.OperationsModel.SaveItemURL = null;
                _self.OperationsModel.DeleteAllItemsURL = null;
                _self.OperationsModel.DeleteItemByIDURL = null;
                _self.OperationsModel.DeleteItemsSelectedURL = null;
                _self.OperationsModel.EditItemURL = null;
            }

            Initialize();
        }

        return Model;
    }
})();