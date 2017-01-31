(function () {
    'use strict';

    angular
        .module('Intensive.Core')
        .factory('Intensive.Core.Models.UserAdminModel', UserAdminModel);

    UserAdminModel.$inject = [
        'Intensive.Blocks.Utils.ActionResultModel',
        'Intensive.Blocks.Utils.UtilitiesFactory'
    ];

    function UserAdminModel(ActionResultModel,
                            UtilitiesFactory)
    {
        var Model = function (dataDTO) 
        {
            var _self = this;

            angular.extend(this, {

                IDLoginUser: null,
                IdentityCard: null,
                Name: null,
                Surname: null,
                Phone: null,
                Email: null,

                ValidateUserAdminModel: ValidateUserAdminModel

            }, dataDTO);

            //######## Public

            function ValidateUserAdminModel()
            {
                var actionResultModel = new ActionResultModel();

                if(!UtilitiesFactory.IsStringValid(_self.IdentityCard))
                {
                    actionResultModel.SetError("La cédula no puede estar vacía");
                    return actionResultModel;
                }

                if(!UtilitiesFactory.IsStringValid(_self.Name))
                {
                    actionResultModel.SetError("El nombre de usuario no puede estar vacío");
                    return actionResultModel;
                }

                if(!UtilitiesFactory.IsStringValid(_self.Surname))
                {
                    actionResultModel.SetError("El apellido no puede estar vacío");
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

                return actionResultModel;
            }

            //######## Private

        }

        return Model;
    }
})();