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

            //Utilities

            GetFormatedDate: GetFormatedDate,
            GetFormatedTime: GetFormatedTime,

            //Validations

            IsStringValid: IsStringValid,
            IsUndefinedOrNull: IsUndefinedOrNull
        };

        return service;

        //##### Public Methods

        function GetFormatedDate(currentDate)
        {
            var year = currentDate.getFullYear();
            var month = currentDate.getMonth() + 1;
            var day = currentDate.getDate();

            year = year.toString();
            currentDate = day + "/" + month + "/" + year;

            return currentDate;
        }

        function GetFormatedTime(currentTime)
        {
            var hour = currentTime.getHours();
            var minutes = currentTime.getMinutes();

            var formatedTime = hour + ":" + minutes; 

            return formatedTime;
        }

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