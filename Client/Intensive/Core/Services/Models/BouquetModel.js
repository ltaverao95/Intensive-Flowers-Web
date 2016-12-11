(function () {
    'use strict';

    angular
        .module('Intensive.Core')
        .factory('Intensive.Core.Models.BouquetModel', BouquetModel);

    BouquetModel.$inject = [

    ];

    function BouquetModel()
    {
        var Model = function (dataDTO) 
        {
            var _self = this;

            angular.extend(this, {

                

            }, dataDTO);

            //######## Public


            //######## Private

        }

        return Model;
    }
})();