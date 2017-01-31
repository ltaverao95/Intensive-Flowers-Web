(function () {
    'use strict';

    angular
        .module('')
        .factory('', ModelName);

    ModelName.$inject = [

    ];

    function ModelName()
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