(function () {
    'use strict';

    angular
        .module('Intensive.Core')
        .factory('Intensive.Core.Models.StoreModel', StoreModel);

    StoreModel.$inject = [

    ];

    function StoreModel()
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