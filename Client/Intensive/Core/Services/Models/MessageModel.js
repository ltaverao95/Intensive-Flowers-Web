(function () {
    'use strict';

    angular
        .module('Intensive.Core')
        .factory('Intensive.Core.Models.MessageModel', MessageModel);

    MessageModel.$inject = [
        '$q',
        '$http',
        'Intensive.Blocks.Utils.UtilitiesFactory',
        'Intensive.Blocks.Utils.ActionResultModel',
        'Intensive.Core.Constants'
    ];

    function MessageModel($q,
                          $http,
                          UtilitiesFactory,
                          ActionResultModel,
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
                GetAllMessages: GetAllMessages,
                SaveMessage: SaveMessage,
                DeleteAllMessages: DeleteAllMessages,
                DeleteMessageByID: DeleteMessageByID,
                DeleteMessagesSelected: DeleteMessagesSelected,
                EditMessageById: EditMessageById,
                ViewMessageById: ViewMessageById,

                //Model Validations
                ValidateMessage: ValidateMessage

            }, dataDTO);

            //######## Public

            function GetAllMessages()
            {
                var requestParamsObj = 
                {
                    url: CoreConstants.MessageServiceURL.GET_ALL_MESSAGES_URL,
                    method: 'GET'
                };

                return DoRequestToServer(requestParamsObj);
            }

            function SaveMessage()
            {
                var requestParamsObj = 
                {
                    url: CoreConstants.MessageServiceURL.SAVE_MESSAGE_URL,
                    method: 'POST',
                    data: angular.toJson(_self)
                };

                return DoRequestToServer(requestParamsObj);
            }

            function DeleteAllMessages()
            {

            }

            function DeleteMessageByID()
            {

            }

            function DeleteMessagesSelected()
            {
                
            }

            function EditMessageById()
            {

            }

            function ViewMessageById()
            {

            }

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