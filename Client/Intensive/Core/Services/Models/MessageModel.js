(function () {
    'use strict';

    angular
        .module('Intensive.Core')
        .factory('Intensive.Core.Models.MessageModel', MessageModel);

    MessageModel.$inject = [
        'Intensive.Blocks.Utils.UtilitiesFactory',
        'Intensive.Blocks.Utils.ActionResultModel',
        'Intensive.Core.Models.OperationsModel',
        'Intensive.Core.Models.PaginatorModel',
        'Intensive.Core.Constants'
    ];

    function MessageModel(UtilitiesFactory,
                          ActionResultModel,
                          OperationsModel,
                          PaginatorModel,
                          CoreConstants)
    {
        var Model = function (dataDTO) 
        {
            var _self = this;

            angular.extend(this, {

                //Properties
                Id: null,
                Name: null,
                Message: null,
                MessagesList: [],

                //CRUD Operations
                OperationsModel: new OperationsModel(),
                
                //Pagination Operations
                PaginatorModel: new PaginatorModel(),

                //Model Validations
                ValidateMessage: ValidateMessage

            }, dataDTO);

            //######## Public

            function ValidateMessage()
            {
                var actionResultModel = new ActionResultModel();

                if(!UtilitiesFactory.IsStringValid(_self.Name))
                {
                    actionResultModel.SetError("El nombre no puede estar vacío");
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
                _self.OperationsModel.GetAllItemsURL = CoreConstants.MessageServiceURL.GET_ALL_MESSAGES_URL;
                _self.OperationsModel.SaveItemURL = CoreConstants.MessageServiceURL.SAVE_MESSAGE_URL;
                _self.OperationsModel.DeleteAllItemsURL = CoreConstants.MessageServiceURL.DELETE_ALL_MESSAGES_URL;
                _self.OperationsModel.DeleteItemByIDURL = CoreConstants.MessageServiceURL.DELETE_MESSAGE_BY_ID_URL;
                _self.OperationsModel.DeleteItemsSelectedURL = CoreConstants.MessageServiceURL.DELETE_MESSAGES_SELECTED_URL;
                _self.OperationsModel.UpdateItemByIDURL = CoreConstants.MessageServiceURL.UPDATE_MESSAGE_SELECTED_URL;
            }

            Initialize();
        }

        return Model;
    }
})();