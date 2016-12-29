<div class="row">
    <div class="col-lg-12">
        <form name="user_profile_update_form">

            <div class="row">
                <div class="col-lg-4">
                    <label for="user_profile_update_form_identity_card">Cédula: </label>
                    <input type="text" 
                           id="user_profile_update_form_identity_card"
                           ng-model="vm.loginModel.UserAdminModel.IdentityCard" 
                           class="form-control" 
                           name="identity_card"
                           required>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-7">
                    <label for="user_profile_update_form_name">Nombre: </label>
                    <input type="text" 
                        id="user_profile_update_form_name"
                        ng-model="vm.loginModel.UserAdminModel.Name" 
                        class="form-control" 
                        name="name"
                        required>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-7">
                    <label for="user_profile_update_form_surname">Apellido: </label>
                    <input type="text" 
                        id="user_profile_update_form_surname"
                        name="surname"
                        ng-model="vm.loginModel.UserAdminModel.Surname" 
                        class="form-control"
                        required>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-7">
                    <label for="user_profile_update_form_phone">Teléfono: </label>
                    <input type="text" 
                        id="user_profile_update_form_phone"
                        name="phone"
                        ng-model="vm.loginModel.UserAdminModel.Phone" 
                        class="form-control"
                        required>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-7">
                    <label for="user_profile_update_form_email">Email: </label>
                    <input type="email" 
                        id="user_profile_update_form_email"
                        name="email"
                        ng-model="vm.loginModel.UserAdminModel.Email" 
                        class="form-control"
                        required>
                </div>
            </div>

            <br>

            <div class="row">
                <div class="col-lg-12">
                    <button type="button" 
                            class="btn btn-primary"
                            ng-disabled="!user_profile_update_form.$valid"
                            ng-click="vm.UpdateLoggedUserByID()">
                        Actualizar Perfil
                    </button>
                </div>
            </div>
        </form>
    </div>
</div>

<hr>

<div class="row">
    <div class="col-lg-12">
        <div class="panel panel-primary">
            <div class="panel-heading">
                <h3 class="panel-title">Opciones de la Cuenta</h3>
            </div>
            <div class="panel-body" style="margin: 5px;">
                <div class="row">
                    <p>
                        Administración de la cuenta, aquí podrás:
                    </p>
                    <ul>
                        <li>
                            Actualizar tus datos personales
                        </li>
                        <li>
                            Actualizar tu contraseña
                        </li>
                        <li>
                            Eliminar tu cuenta (recuerda que una vez borrada no podrás volver a iniciar sesión en el sitio.)
                        </li>
                    </ul>
                </div>

                <hr>

                <div class="row">
                    <div class="col-lg-12">
                        <div class="panel panel-primary">
                            <div class="panel-heading">
                                <h3 class="panel-title">Administración de Contraseñas</h3>
                            </div>
                            <div class="panel-body" style="margin: 5px;">

                                <div class="row">
                                    <div class="col-lg-12">
                                        <form name="user_update_password_form">
                                            <div class="form-group col-lg-5">
                                                <label for="">Contraseña Nueva</label>
                                                <input type="password"
                                                       class="form-control"
                                                       ng-model="vm.loginPasswordModel.Password"
                                                       required>
                                            </div>
                                            <div class="form-group col-lg-5">
                                                <label for="">Confirmación de Contraseña</label>
                                                <input type="password"
                                                       class="form-control"
                                                       ng-model="vm.loginPasswordModel.PasswordConfirmation"
                                                       required>
                                            </div>
                                            <br>
                                            <div class="form-group col-lg-2">
                                                <button type="button" 
                                                        class="btn btn-default"
                                                        ng-disabled="!user_update_password_form.$valid"
                                                        ng-click="vm.UpdateCurrentUserPassword()">
                                                        Actualizar
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-lg-12">
                        <button type="button" 
                                class="btn btn-danger pull-right"
                                ng-click="vm.DeleteCurrentAccount()">
                                Borrar mi cuenta
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>