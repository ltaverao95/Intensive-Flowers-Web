(function () {
    'use strict';

    angular
        .module('Intensive.Core')
        .factory('Intensive.Core.Models.LoginModel', ModelName);

    ModelName.$inject = [
        '$q',
        '$http',
        'Intensive.Core.Constants',
        'Intensive.Blocks.Utils.ActionResultModel'
    ];

    function ModelName($q,
                       $http,
                       CoreConstants,
                       ActionResultModel)
    {
        var Model = function (dataDTO) 
        {
            var _self = this;

            angular.extend(this, {

                UserName: null,
                Password: null,

                SignIn: SignIn,
                LogOut: LogOut,
                ValidateUser: ValidateUser

            }, dataDTO);

            //######## Public

            function SignIn()
            {
                var requestParamsObj = 
                {
                    url: CoreConstants.LoginServiceURL.SIGN_IN_URL,
                    method: 'POST',
                    data: angular.toJson(_self)
                };

                return DoRequestToServer(requestParamsObj);
            }

            function LogOut()
            {
                var requestParamsObj = 
                {
                    url: CoreConstants.LoginServiceURL.LOG_OUT_URL,
                    method: 'GET'
                };

                return DoRequestToServer(requestParamsObj);
            }

            function ValidateUser()
            {
                var actionResultModel = new ActionResultModel();

                if(!UtilitiesFactory.IsStringValid(_self.Name))
                {
                    actionResultModel.SetError("El nombre de usuario no puede estar vacío");
                    return actionResultModel;
                }

                if(!UtilitiesFactory.IsStringValid(_self.Password))
                {
                    actionResultModel.SetError("La contraseña no puede estar vacía");
                    return actionResultModel;
                }

                return actionResultModel;
            }

            //######## Private

            function DoRequestToServer(requestObj)
            {
                var deferred = $q.defer();

                $http(requestObj).then(
                    d => {
                        deferred.resolve(d.data);
                    }
                )
                .catch(
                    error => {
                        deferred.reject(error);
                    }
                );

                return deferred.promise;
            }
        }

        return Model;
    }
})();