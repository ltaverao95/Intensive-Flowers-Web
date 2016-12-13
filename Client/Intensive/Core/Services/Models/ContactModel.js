(function () {
    'use strict';

    angular
        .module('Intensive.Core')
        .factory('Intensive.Core.Models.ContactModel', ContactModel);

    ContactModel.$inject = [
        'Intensive.Core.Constants',
        'Intensive.Blocks.Utils.UtilitiesFactory',
        'Intensive.Blocks.Utils.ActionResultModel',
        'Intensive.Core.Models.OperationsModel',
        'Intensive.Core.Models.PaginatorModel'
    ];

    function ContactModel(CoreConstants,
                          UtilitiesFactory,
                          ActionResultModel,
                          OperationsModel,
                          PaginatorModel)
    {
        var Model = function (dataDTO) 
        {
            var _self = this;

            angular.extend(this, {

                Id: null,
                Name: null,
                Email: null,
                Phone: null,
                Message: null,
                ContactsList: [],

                //CRUD Operations
                OperationsModel: new OperationsModel(),

                //Pagination Operations
                PaginatorModel: new PaginatorModel(),

                //Model Validations
                ValidateContact: ValidateContact

            }, dataDTO);

            //######## Public

            function ValidateContact()
            {
                var actionResultModel = new ActionResultModel();

                if(!UtilitiesFactory.IsStringValid(_self.Name))
                {
                    actionResultModel.SetError("El nombre no puede estar vacío");
                    return actionResultModel;
                }

                if(!UtilitiesFactory.IsStringValid(_self.Email))
                {
                    actionResultModel.SetError("El correo electrónico no puede estar vacío");
                    return actionResultModel;
                }

                if(!UtilitiesFactory.IsStringValid(_self.Phone))
                {
                    actionResultModel.SetError("El teléfono no puede estar vacío");
                    return actionResultModel;
                }

                if(!UtilitiesFactory.IsStringValid(_self.Message))
                {
                    actionResultModel.SetError("El mensaje no puede estar vacío");
                    return actionResultModel;
                }

                return actionResultModel;
            }

            //######## Private

            function Initialize()
            {
                _self.OperationsModel.GetAllItemsURL = CoreConstants.ContactServiceURL.GET_ALL_CONTACTS_URL;
                _self.OperationsModel.SaveItemURL = CoreConstants.ContactServiceURL.SAVE_CONTACT_URL;
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