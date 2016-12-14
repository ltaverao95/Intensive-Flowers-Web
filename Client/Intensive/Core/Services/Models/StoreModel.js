(function () {
    'use strict';

    angular
        .module('Intensive.Core')
        .factory('Intensive.Core.Models.StoreModel', StoreModel);

    StoreModel.$inject = [
        'Intensive.Blocks.Utils.Constants',
        'Intensive.Core.Constants',
        'Intensive.Blocks.Utils.UtilitiesFactory',
        'Intensive.Blocks.Utils.ActionResultModel',
        'Intensive.Core.Models.OperationsModel',
        'Intensive.Core.Models.QueryDataModel',
        'Intensive.Core.Models.PaginatorModel'
    ];

    function StoreModel(UtilsConstants,
                        CoreConstants,
                        UtilitiesFactory,
                        ActionResultModel,
                        OperationsModel,
                        QueryDataModel,
                        PaginatorModel)
    {
        var Model = function (dataDTO) 
        {
            var _self = this;

            angular.extend(this, {

                Id: null,
                IdentityCard: null,
                Name: null,
                Surname: null,
                AddressToSend: null,
                Phone: null,
                Email: null,
                OrderDescription: null,
                Store: UtilsConstants.EnumStores.INTENSIVE_FLOWERS_1,
                WayToPay: UtilsConstants.EnumWayToPay.CREDIT_CARD,
                DateOrder: new Date(),
                DateToSend: null,
                TimeToSend: null,
                OrdersList: [],

                //CRUD Operations
                OperationsModel: new OperationsModel(),
                
                //Pagination Operations
                PaginatorModel: new PaginatorModel(),

                //Query Operations
                QueryDataModel: new QueryDataModel(),

                //Model Validations
                ValidateOrder: ValidateOrder     

            }, dataDTO);

            //######## Public

            function ValidateOrder()
            {
                var actionResultModel = new ActionResultModel();

                if(!UtilitiesFactory.IsStringValid(_self.IdentityCard))
                {
                    actionResultModel.SetError("La cédula no puede estar vacía");
                    return actionResultModel;
                }

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

            function Initialize()
            {
                _self.OperationsModel.GetAllItemsURL = CoreConstants.StoreServiceURL.GET_ALL_ORDERS_URL;
                _self.OperationsModel.SaveItemURL = CoreConstants.StoreServiceURL.SAVE_ORDER_URL;
                _self.OperationsModel.DeleteAllItemsURL = CoreConstants.StoreServiceURL.DELETE_ALL_ORDERS_URL;
                _self.OperationsModel.DeleteItemByIDURL = CoreConstants.StoreServiceURL.DELETE_ORDER_BY_ID_URL;
                _self.OperationsModel.DeleteItemsSelectedURL = CoreConstants.StoreServiceURL.DELETE_ORDERS_SELECTED_URL;
                _self.OperationsModel.UpdateItemByIDURL = CoreConstants.StoreServiceURL.UPDATE_ORDER_SELECTED_URL;

                if(UtilitiesFactory.IsUndefinedOrNull(dataDTO))
                {
                    return;
                }

                _self.OperationsModel = new OperationsModel(dataDTO.OperationsModel);
                _self.QueryDataModel = new QueryDataModel(dataDTO.QueryDataModel);
            }

            Initialize();
        }

        return Model;
    }
})();