(function () {
    'use strict';

    angular
        .module('Intensive.Core')
        .factory('Intensive.Core.Models.LoginModel', ModelName);

    ModelName.$inject = [
        '$q',
        '$http',
        'Intensive.Core.Constants',
        'Intensive.Blocks.Utils.UtilitiesFactory',
        'Intensive.Blocks.Utils.ActionResultModel',
        'Intensive.Core.Models.UserAdminModel'
    ];

    function ModelName($q,
                       $http,
                       CoreConstants,
                       UtilitiesFactory,
                       ActionResultModel,
                       UserAdminModel)
    {
        var Model = function (dataDTO) 
        {
            var _self = this;

            angular.extend(this, {

                IDLoginUser: null,
                UserName: null,
                Password: null,
                
                UserAdminModel: new UserAdminModel(),

                SignIn: SignIn,
                LogOut: LogOut,
                GetUserLoggedInfoByID: GetUserLoggedInfoByID,
                UpdateLoggedUserByID: UpdateLoggedUserByID,
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

            function GetUserLoggedInfoByID()
            {
                var requestParamsObj = 
                {
                    url: CoreConstants.LoginServiceURL.GET_USER_LOGGED_INFO_BY_ID_URL,
                    method: 'POST',
                    data: angular.toJson(
                        {
                            IDLoginUser: _self.IDLoginUser
                        }
                    )
                };

                return DoRequestToServer(requestParamsObj);
            }

            function UpdateLoggedUserByID()
            {
                console.log(angular.toJson(_self));
                var requestParamsObj = 
                {
                    url: CoreConstants.LoginServiceURL.UPDATE_USER_LOGGED_INFO_BY_ID_URL,
                    method: 'POST',
                    data: angular.toJson(_self)
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

            function Initialize()
            {
                if(UtilitiesFactory.IsUndefinedOrNull(dataDTO))
                {
                    return;
                }

                _self.UserAdminModel = new UserAdminModel(dataDTO.UserAdminDTO);
            }

            Initialize();
        }

        return Model;
    }
})();