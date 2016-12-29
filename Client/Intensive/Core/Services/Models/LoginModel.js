(function () {
    'use strict';

    angular
        .module('Intensive.Core')
        .factory('Intensive.Core.Models.LoginModel', ModelName);

    ModelName.$inject = [
        '$q',
        '$http',
        'Intensive.Core.Constants',
        'Intensive.Blocks.Utils.Constants',
        'Intensive.Blocks.Utils.UtilitiesFactory',
        'Intensive.Blocks.Utils.ActionResultModel',
        'Intensive.Core.Models.UserAdminModel',
        'Intensive.Core.Models.OperationsModel',
        'Intensive.Core.Models.PaginatorModel'
    ];

    function ModelName($q,
                       $http,
                       CoreConstants,
                       UtilsConstants,
                       UtilitiesFactory,
                       ActionResultModel,
                       UserAdminModel,
                       OperationsModel,
                       PaginatorModel)
    {
        var Model = function (dataDTO) 
        {
            var _self = this;

            angular.extend(this, {

                IDLoginUser: null,
                UserName: null,
                Password: null,
                UserRole: UtilsConstants.UserAdminRole.READER,
                IsValidCurrentUserName: false,

                UsersList: [],
                
                //CRUD Operations
                OperationsModel: new OperationsModel(),

                //Pagination Operations
                PaginatorModel: new PaginatorModel(),

                UserAdminModel: new UserAdminModel(),

                SignIn: SignIn,
                LogOut: LogOut,
                GetUserLoggedInfoByID: GetUserLoggedInfoByID,
                UpdateLoggedUserByID: UpdateLoggedUserByID,
                DeleteCurrentAccount: DeleteCurrentAccount,
                ValidateUserIfExists: ValidateUserIfExists,
                ValidateUser: ValidateUser,
                ValidateCompleteUser: ValidateCompleteUser

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
                var requestParamsObj = 
                {
                    url: CoreConstants.LoginServiceURL.UPDATE_USER_LOGGED_INFO_BY_ID_URL,
                    method: 'POST',
                    data: angular.toJson(_self)
                };

                return DoRequestToServer(requestParamsObj);
            }

            function DeleteCurrentAccount()
            {
                var requestParamsObj = 
                {
                    url: CoreConstants.LoginServiceURL.DELETE_USER_LOGGED_INFO_BY_ID_URL,
                    method: 'POST',
                    data: angular.toJson(_self)
                };

                return DoRequestToServer(requestParamsObj);
            }

            function ValidateUserIfExists()
            {
                var requestParamsObj = 
                {
                    url: CoreConstants.LoginServiceURL.VALIDATE_USER_IF_EXIST_URL,
                    method: 'POST',
                    data: angular.toJson(
                        {
                            UserName: _self.UserName
                        }
                    )
                };

                return DoRequestToServer(requestParamsObj);
            }

            function ValidateUser()
            {
                var actionResultModel = new ActionResultModel();

                if(!UtilitiesFactory.IsStringValid(_self.UserName))
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

            function ValidateCompleteUser()
            {
                var actionResultModel = _self.ValidateUser();
                if(actionResultModel.HasError)
                {
                    return actionResultModel;
                }

                if(!UtilitiesFactory.IsStringValid(_self.UserRole))
                {
                    actionResultModel.SetError("No se ha definido el rol del usuario");
                    return actionResultModel;
                }

                var actionResultModel = _self.UserAdminModel.ValidateUserAdminModel();
                if(actionResultModel.HasError)
                {
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
                _self.OperationsModel.GetAllItemsURL = CoreConstants.LoginServiceURL.GET_ALL_USERS_URL;
                _self.OperationsModel.SaveItemURL = CoreConstants.LoginServiceURL.SAVE_USER_URL;
                _self.OperationsModel.DeleteAllItemsURL = CoreConstants.LoginServiceURL.DELETE_ALL_USERS_URL;
                _self.OperationsModel.DeleteItemByIDURL = CoreConstants.LoginServiceURL.DELETE_USER_BY_ID_URL;
                _self.OperationsModel.DeleteItemsSelectedURL = CoreConstants.LoginServiceURL.DELETE_USERS_SELECTED_URL;
                _self.OperationsModel.UpdateItemByIDURL = CoreConstants.LoginServiceURL.UPDATE_USER_LOGGED_INFO_BY_ID_URL;

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