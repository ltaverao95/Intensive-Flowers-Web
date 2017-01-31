(function () {
    'use strict'; 

    angular
        .module('Intensive.Blocks.Utils')
        .factory('Intensive.Blocks.Utils.ActionResultModel', ActionResultModel);

    ActionResultModel.$inject = [
        'Intensive.Blocks.Utils.Constants'
    ];

    function ActionResultModel(UtilsConstants) 
	{
        var Model = function (dataDTO) 
		{
            var _self = this;

            angular.extend(this, {
                Result: UtilsConstants.EnumResult.SUCCESS,
                ResultData: null,
                UIMessage: null,
                StackTrace: null,
                SetAsOk: SetAsOk,
                SetError: SetError,
                SetErrorAndStackTrace: SetErrorAndStackTrace
            }, dataDTO);

            Object.defineProperty(this, "HasError", {
                get: function () {
                    return !_self.IsOk;
                }
            });

            Object.defineProperty(this, "IsOk", {
                get: function () {
                    return _self.Result === UtilsConstants.EnumResult.SUCCESS;
                }
            });

            //######## Private

            function SetAsOk(message) 
			{
                _self.Result = UtilsConstants.EnumResult.SUCCESS;
                _self.UIMessage = message;
                return this;
            }

            function SetError(errorMessage) 
			{
                _self.Result = UtilsConstants.EnumResult.ERROR;
                _self.UIMessage = errorMessage;

                return this;
            }

            function SetErrorAndStackTrace(errorMessage, stackTrace) 
			{
                _self.StackTrace = stackTrace;
                return SetError(errorMessage);
            }

        };

        return Model;
    }
})();