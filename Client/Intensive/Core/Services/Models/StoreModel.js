(function () {
    'use strict';

    angular
        .module('Intensive.Core')
        .factory('Intensive.Core.Models.StoreModel', StoreModel);

    StoreModel.$inject = [
        '$q',
        '$http',
        'Intensive.Blocks.Utils.Constants',
        'Intensive.Core.Constants',
        'Intensive.Blocks.Utils.UtilitiesFactory'
    ];

    function StoreModel($q,
                        $http,
                        UtilsConstants,
                        CoreConstants,
                        UtilitiesFactory)
    {
        var Model = function (dataDTO) 
        {
            var _self = this;

            angular.extend(this, {

                Id: null,
                Name: '',
                Surname: '',
                AddressToSend: '',
                Phone: '',
                Email: '',
                OrderDescription: '',
                Store: UtilsConstants.EnumStores.INTENSIVE_FLOWERS_1,
                WayToPay: UtilsConstants.EnumWayToPay.CREDIT_CARD,
                DateOrder: '',
                DateToSend: '',
                TimeToSend: '',
                OrdersList: [],

                //CRUD Operations
                GetAllOrders: GetAllOrders,
                SaveOrder: SaveOrder,
                DeleteAllOrders: DeleteAllOrders,
                DeleteOrderByID: DeleteOrderByID,
                DeleteOrdersSelected: DeleteOrdersSelected,
                EditOrderById: EditOrderById,
                ViewOrderById: ViewOrderById,

                //Model Validations
                ValidateOrder: ValidateOrder     

            }, dataDTO);

            //######## Public

            function GetAllOrders()
            {
                var requestParamsObj = 
                {
                    url: CoreConstants.STORE_FILES_NAMES.GET_ALL_ORDERS_FILE,
                    method: 'GET'
                };

                return DoRequestToServer(requestParamsObj);
            }

            function SaveOrder()
            {
                var requestParamsObj = 
                {
                    url: CoreConstants.MessageServiceURL.SAVE_MESSAGE_URL,
                    method: 'POST',
                    data: angular.toJson(_self)
                };

                return DoRequestToServer(requestParamsObj);
            }

            function DeleteAllOrders()
            {

            }

            function DeleteOrderByID()
            {

            }

            function DeleteOrdersSelected()
            {
                
            }

            function EditOrderById()
            {

            }

            function ViewOrderById()
            {

            }

            function ValidateOrder()
            {
                var actionResultModel = new ActionResultModel();

                if(!UtilitiesFactory.IsStringValid(_self.Name))
                {
                    actionResultModel.SetError("El nombre no puede estar vacío");
                    return actionResultModel;
                }

                if(!UtilitiesFactory.IsStringValid(_self.Surname))
                {
                    actionResultModel.SetError("El apellido no puede estar vacío");
                    return actionResultModel;
                }

                if(!UtilitiesFactory.IsStringValid(_self.AddressToSend))
                {
                    actionResultModel.SetError("La dirección de envío no puede estar vacía");
                    return actionResultModel;
                }

                if(!UtilitiesFactory.IsStringValid(_self.Phone))
                {
                    actionResultModel.SetError("El teléfono no puede estar vacío");
                    return actionResultModel;
                }

                if(!UtilitiesFactory.IsStringValid(_self.Email))
                {
                    actionResultModel.SetError("El correo electrónico no puede estar vacío");
                    return actionResultModel;
                }

                if(!UtilitiesFactory.IsStringValid(_self.OrderDescription))
                {
                    actionResultModel.SetError("La descripción del pedido no puede estar vacía");
                    return actionResultModel;
                }

                if(!UtilitiesFactory.IsStringValid(_self.Store))
                {
                    actionResultModel.SetError("La tienda no puede estar vacía");
                    return actionResultModel;
                }

                if(!UtilitiesFactory.IsUndefinedOrNull(_self.WayToPay))
                {
                    actionResultModel.SetError("El teléfono no puede estar vacío");
                    return actionResultModel;
                }

                if(!UtilitiesFactory.IsStringValid(_self.DateToSend))
                {
                    actionResultModel.SetError("La fecha de envío no puede estar vacía");
                    return actionResultModel;
                }

                if(!UtilitiesFactory.IsStringValid(_self.TimeToSend))
                {
                    actionResultModel.SetError("La hora de envío no puede estar vacía");
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
                _self.DateOrder = UtilitiesFactory.GetFormatedDate(new Date());
                _self.DateToSend = UtilitiesFactory.GetFormatedDate(new Date());
                _self.TimeToSend = UtilitiesFactory.GetFormatedTime(new Date());
            }

            Initialize();
        }

        return Model;
    }
})();