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
        'Intensive.Core.Models.OperationsModel'
    ];

    function StoreModel(UtilsConstants,
                        CoreConstants,
                        UtilitiesFactory,
                        ActionResultModel,
                        OperationsModel)
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
                OperationsModel: new OperationsModel(),

                //Model Validations
                ValidateOrder: ValidateOrder     

            }, dataDTO);

            //######## Public

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

            function Initialize()
            {
                _self.OperationsModel.GetAllItemsURL = CoreConstants.StoreServiceURL.GET_ALL_ORDERS_FILE;
                _self.OperationsModel.SaveItemURL = CoreConstants.StoreServiceURL.SAVE_ORDER_URL;
                _self.OperationsModel.DeleteAllItemsURL = null;
                _self.OperationsModel.DeleteItemByIDURL = null;
                _self.OperationsModel.DeleteItemsSelectedURL = null;
                _self.OperationsModel.EditItemURL = null;
            }

            Initialize();
        }

        return Model;
    }
})();