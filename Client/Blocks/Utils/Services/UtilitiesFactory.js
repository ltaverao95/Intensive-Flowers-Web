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
            ValidateItemsSelectedInCurrentPage: ValidateItemsSelectedInCurrentPage,

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
            currentDate = year + "-" + month + "-" + day; 

            return currentDate;
        }

        function GetFormatedTime(currentTime)
        {
            var hour = currentTime.getHours();
            var minutes = currentTime.getMinutes();

            if(minutes < 10)
            {
                minutes = '0' + minutes;
            }

            var formatedTime = hour + ":" + minutes; 

            return formatedTime;
        }

        function ValidateItemsSelectedInCurrentPage(itemsList, paginatorModel)
		{
			var i = paginatorModel.CurrentPage * paginatorModel.PageSize;

			for(i; i < itemsList.length; i++)
			{
				if(!itemsList[i].Selected)
				{
					return false;
				}
			}

			return true;
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