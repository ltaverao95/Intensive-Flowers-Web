(function () {
    'use strict';

    angular
        .module('Intensive.Blocks.Utils')
        .factory('Intensive.Blocks.Utils.UtilitiesFactory', UtilitiesFactory);

    UtilitiesFactory.$inject = [

    ];

    function UtilitiesFactory()
    {
        var _self = this;

        var service = {
            IsStringValid: IsStringValid,
            IsUndefinedOrNull: IsUndefinedOrNull
        };

        return service;

        function IsStringValid(stringToValidate)
        {
            if(stringToValidate === undefined ||
               stringToValidate === null ||
               stringToValidate === "")
            {
                return false;
            }

            return true;
        }

        function IsUndefinedOrNull(paramToValidate)
        {
            if(paramToValidate === undefined ||
               paramToValidate === null)
            {
                return true;   
            }

            return false;
        }
    }
})();