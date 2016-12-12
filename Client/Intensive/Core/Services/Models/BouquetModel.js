(function () {
    'use strict';

    angular
        .module('Intensive.Core')
        .factory('Intensive.Core.Models.BouquetModel', BouquetModel);

    BouquetModel.$inject = [
        'Intensive.Core.Models.OperationsModel'
    ];

    function BouquetModel(OperationsModel)
    {
        var Model = function (dataDTO) 
        {
            var _self = this;

            angular.extend(this, {

                OperationsModel: new OperationsModel()

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