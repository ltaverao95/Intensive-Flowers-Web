(function () {
    'use strict';

    angular
        .module('Intensive.App')
        .factory('Intensive.App.Models.MessageDTOModel', MessageDTOModel);

    MessageDTOModel.$inject = [
        '$q',
        '$http',
        'Intensive.Blocks.Utils.UtilitiesFactory',
        'Intensive.Blocks.Utils.ActionResultModel',
        'Intensive.Core.Constants'
    ];

    function MessageDTOModel($q,
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

                $http(requestObj)
                    .success(
                        function(data)
                        {
                            deferred.resolve(data);
                        }
                    )
                    .error(
                        function(error)
                        {
                            deferred.reject(error);
                        }
                    );

                return deferred.promise;
            }

            function Activate() {

                _self.GetAllMessages();

                if (UtilitiesFactory.IsUndefinedOrNull(dataDTO)) 
                {
                    return;
                }
            }

            Activate();
        };

        return Model;
    }
})();