(function () {
    'use strict';

    angular
        .module('')
        .factory('', ModelName);

    ModelName.$inject = [

    ];

    function ModelName(UtilsConstants)
    {
        var Model = function (dataDTO) {

            var _self = this;

            angular.extend(this, {

                

            }, dataDTO);

            //######## Public


            //######## Private

            function Activate() {
                if (dataDTO === undefined || 
                    dataDTO === null) 
                {
                    return;
                }
            }

            Activate();
        };

        return Model;
    }
})();