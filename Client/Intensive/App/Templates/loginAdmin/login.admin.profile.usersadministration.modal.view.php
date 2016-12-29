<style>
    .modal-body{
        max-height: 400px;
        overflow-y: auto;
    }
</style>

<div class="modal-header">
    <h3 class="modal-title">Información del Usuario</h3>
</div>
<div class="modal-body">
        
    <form name="user_detail_form">

        <fieldset>
            <div>
                <label for="user_detail_form_user_name">Nombre de Usuario: </label>
                <input type="text" 
                        id="user_detail_form_user_name"
                        name="user_name_login"
                        class="form-control"
                        ng-model="vm.loginModel.UserName"
                        ng-readonly="!vm.loginModel.IsCreateMode"
                        ng-required="vm.loginModel.IsCreateMode">
            </div>

            <div ng-if="!vm.loginModel.IsCreateMode && !vm.loginModel.IsReadOnlyMode">
                <label for="user_detail_form_user_password">Contraseña: </label>
                <input type="password" 
                        id="user_detail_form_user_password"
                        name="user_password"
                        class="form-control"
                        ng-model="vm.loginModel.Password"
                        ng-readonly="!vm.loginModel.IsCreateMode && vm.loginModel.IsReadOnlyMode"
                        ng-required="vm.loginModel.IsCreateMode">
            </div>

            <br ng-if="vm.loginModel.IsCreateMode">

            <div ng-if="vm.loginModel.IsCreateMode">
                <button class="btn btn-default"
                        ng-class="vm.loginModel.IsValidCurrentUserName ? 'btn btn-success' : 'btn btn-default'"
                        ng-click="vm.ValidateCurrentUserName()">
                        <span ng-show="!vm.loginModel.IsValidCurrentUserName">Validar</span>
                        <span ng-show="vm.loginModel.IsValidCurrentUserName">Validado</span>
                </button>
            </div>
        </fieldset>

        <div ng-if="vm.loginModel.IsValidCurrentUserName">

            <br>

            <div>
                <label for="user_detail_form_user_role">Rol de Usuario: </label>
                <select name="user_role" 
                        id="user_detail_form_user_role"
                        class="form-control"
                        ng-model="vm.loginModel.UserRole"
                        ng-options="user_role.Value as user_role.Label for user_role in vm.UtilsConstants.UserAdminRoleList"
                        ng-disabled="vm.loginModel.IsReadOnlyMode"
                        ng-required="vm.loginModel.IsCreateMode">
                </select>
            </div>

            <div ng-if="vm.loginModel.IsCreateMode">
                <label for="user_detail_form_password">Contraseña: </label>
                <input type="password" 
                    id="user_detail_form_password"
                    name="user_password_login"
                    class="form-control"
                    ng-model="vm.loginModel.Password"
                    required>
            </div>
            <div>
                <label for="user_detail_form_identity_card">Cédula: </label>
                <input type="text" 
                        id="user_detail_form_identity_card"
                        ng-model="vm.loginModel.UserAdminModel.IdentityCard" 
                        class="form-control" 
                        name="identity_card"
                        ng-required="!vm.loginModel.IsReadOnlyMode"
                        ng-readonly="vm.loginModel.IsReadOnlyMode">
            </div>
            <div>
                <label for="user_detail_form_name">Nombre: </label>
                <input type="text" 
                    id="user_detail_form_name"
                    ng-model="vm.loginModel.UserAdminModel.Name" 
                    class="form-control" 
                    name="name"
                    ng-required="!vm.loginModel.IsReadOnlyMode"
                    ng-readonly="vm.loginModel.IsReadOnlyMode">
            </div>
            <div>
                <label for="user_detail_form_surname">Apellido: </label>
                <input type="text" 
                    id="user_detail_form_surname"
                    name="surname"
                    ng-model="vm.loginModel.UserAdminModel.Surname" 
                    class="form-control" 
                    ng-required="!vm.loginModel.IsReadOnlyMode"
                    ng-readonly="vm.loginModel.IsReadOnlyMode">
            </div>
            <div>
                <label for="user_detail_form_phone">Teléfono: </label>
                <input type="text" 
                    id="user_detail_form_phone"
                    name="phone"
                    ng-model="vm.loginModel.UserAdminModel.Phone" 
                    class="form-control" 
                    ng-required="!vm.loginModel.IsReadOnlyMode"
                    ng-readonly="vm.loginModel.IsReadOnlyMode">
            </div>
            <div>
                <label for="user_detail_form_email">Email: </label>
                <input type="email" 
                    id="user_detail_form_email"
                    name="email"
                    ng-model="vm.loginModel.UserAdminModel.Email" 
                    class="form-control"
                    ng-required="!vm.loginModel.IsReadOnlyMode"
                    ng-readonly="vm.loginModel.IsReadOnlyMode">
            </div>

        </div>

    </form>
</div>
<div class="modal-footer"
     ng-if="!vm.loginModel.IsCreateMode">
    <button class="btn btn-success" 
            type="button" 
            ng-click="vm.UpdateUser()" 
            ng-disabled="!user_detail_form.$valid"
            ng-show="!vm.loginModel.IsReadOnlyMode">
            Guardar
    </button>

    <button class="btn btn-warning" 
            type="button" 
            ng-disabled="!user_detail_form.$valid && !vm.loginModel.IsReadOnlyMode"
            ng-click="vm.CloseModal()">
            Cerrar
    </button>
</div>

<div class="modal-footer" ng-if="vm.loginModel.IsCreateMode">

    <button class="btn btn-success" 
            type="button" 
            ng-click="vm.CreateUser()" 
            ng-disabled="!user_detail_form.$valid"
            ng-show="vm.loginModel.IsCreateMode && vm.loginModel.IsValidCurrentUserName">
            Crear
    </button>

    <button class="btn btn-warning" 
            type="button" 
            ng-click="vm.CloseModalWithoutSave()">
            Cerrar
    </button>
</div>