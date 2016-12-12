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
        'Intensive.Blocks.Utils.UtilitiesFactory',
        'Intensive.Blocks.Utils.ActionResultModel'
    ];

    function StoreModel($q,
                        $http,
                        UtilsConstants,
                        CoreConstants,
                        UtilitiesFactory,
                        ActionResultModel)
    {
        var Model = function (dataDTO) 
        {
            var _self = this;

            angular.extend(this, {

                Id: null,
                Name: 'Felipe',
                Surname: 'Tavera',
                AddressToSend: 'Cra 36 a # 97 b 17',
                Phone: 8916391,
                Email: 'lftavera@hotmail.com',
                OrderDescription: 'Rosas',
                Store: UtilsConstants.EnumStores.INTENSIVE_FLOWERS_1,
                WayToPay: UtilsConstants.EnumWayToPay.CREDIT_CARD,
                DateOrder: '12/12/2016',
                DateToSend: '12/12/2016',
                TimeToSend: '11:00',
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
                    url: CoreConstants.StoreServiceURL.GET_ALL_ORDERS_FILE,
                    method: 'GET'
                };

                return DoRequestToServer(requestParamsObj);
            }

            function SaveOrder()
            {
                var requestParamsObj = 
                {
                    url: CoreConstants.StoreServiceURL.SAVE_ORDER_URL,
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
                    actionResultModel.SetError("Debes seleccionar una tienda");
                    return actionResultModel;
                }

                if(UtilitiesFactory.IsUndefinedOrNull(_self.WayToPay))
                {
                    actionResultModel.SetError("Debes seleccionar Una forma de pago");
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
            }

            Initialize();
        }

        return Model;
    }
})();