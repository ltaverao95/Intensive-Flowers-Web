(function () {
    'use strict';

    angular
        .module('Intensive.Core')
        .factory('Intensive.Core.Models.ContactModel', ContactModel);

    ContactModel.$inject = [

    ];

    function ContactModel()
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