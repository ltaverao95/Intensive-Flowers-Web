<?php
	session_start();

	if(isset($_SESSION['admin']))
    {
?>

<div class="row">
    <div class="box">
        <form name="search_name_form">
            <div class="form-group">
                <h4 class="intro-text">¿Qué desea hacer?</h4>
                
                <div class="col-lg-4">
                    <select name="store_name"
                            ng-model="vm.storeModel.QueryDataModel.QueryOption" 
                            ng-options="queryOption.Id as queryOption.Label for queryOption in vm.UtilsConstants.QueryOptionsList"
                            ng-change="vm.QueryOptionChanged()"
                            class="form-control"
                            required>
                        <option value="">[--Seleccionar--]</option>                        
                    </select>
                </div>
            </div>
        </form>
    </div>
    <div class="box">

        <!-- Search by Identity Card -->
        <form name="search_identity_form" ng-if="vm.UtilsConstants.QueryOptionsList[vm.UtilsConstants.QueryOption.SEARCH_BY_IDENTY_CARD].IsVisible">
            <div class="form-group">
                <label for="search_identity_form_card">Buscar por Cédula</label>
                <input type="text" 
                       id="search_identity_form_card"
                       name="name"
                       class="form-control" 
                       ng-model="vm.storeModel.QueryDataModel.IdentityCard" 
                       placeholder="Digite la cédula"
                       required>
            </div>
            <button type="button" 
                    class="btn btn-default"
                    ng-disabled="!search_name_form.$valid"
                    ng-click="vm.SearchByIdentityCard()">
                    Buscar
            </button>

            <button type="button" 
                    class="btn btn-warning" 
                    ng-click="vm.CleanStoreModel()">
                    Limpiar Consulta
            </button>
        </form>

        <!-- Search by Name -->
        <form name="search_name_form" ng-if="vm.UtilsConstants.QueryOptionsList[vm.UtilsConstants.QueryOption.SEARCH_BY_NAME].IsVisible">
            <div class="form-group">
                <label for="search_name_form_name">Buscar por Nombre</label>
                <input type="text" 
                       id="search_name_form_name"
                       name="name"
                       class="form-control" 
                       ng-model="vm.storeModel.QueryDataModel.NameToSearch" 
                       placeholder="Nombre cliente a buscar"
                       required>
            </div>
            <button type="button" 
                    class="btn btn-default"
                    ng-disabled="!search_name_form.$valid"
                    ng-click="vm.SearchByName()">
                    Buscar
            </button>

            <button type="button" 
                    class="btn btn-warning" 
                    ng-click="vm.CleanStoreModel()">
                    Limpiar Consulta
            </button>
        </form>

        <!-- Search by Date and Store -->
        <form name="search_store_date_form" ng-if="vm.UtilsConstants.QueryOptionsList[vm.UtilsConstants.QueryOption.SEARCH_BY_DATE_AND_STORE].IsVisible">
            <div class="form-group">
                <label for="search_store_date_form_store_name">Buscar por Fecha y Tienda</label>
                <input type="date" 
                       class="form-control"
                       name="date" 
                       id="search_store_date_form_store_name" 
                       ng-model="vm.storeModel.QueryDataModel.DateToSearch"
                       required>

                <select name="store_name"
                        ng-model="vm.storeModel.QueryDataModel.StoreName" 
                        ng-options="store.Id as store.Name for store in vm.UtilsConstants.StoresList"
                        class="form-control"
                        required>
                    <option value="">[--Seleccionar--]</option>                        
                </select>
            </div>
            <button type="button" 
                    class="btn btn-default" 
                    ng-disabled="!search_store_date_form.$valid"
                    ng-click="vm.SearchByDateAndStoreName()">
                    Buscar
            </button>

            <button type="button" 
                    class="btn btn-warning" 
                    ng-click="vm.CleanStoreModel()">
                    Limpiar Consulta
            </button>
        </form>

        <!-- Search by Store -->
        <form name="search_store_form" ng-if="vm.UtilsConstants.QueryOptionsList[vm.UtilsConstants.QueryOption.SEARCH_BY_STORE].IsVisible">
            <div class="form-group">
                <label for="search_store_form_store">Buscar por Tienda</label>
                <select id="search_store_form_store"
                        name="store_name_only" 
                        ng-model="vm.storeModel.QueryDataModel.StoreName" 
                        ng-options="store.Id as store.Name for store in vm.UtilsConstants.StoresList"
                        class="form-control"
                        required>
                    <option value="">[--Seleccionar--]</option>                        
                </select>
            </div>
            <button type="button" 
                    class="btn btn-default"
                    ng-disabled="!search_store_form.$valid" 
                    ng-click="vm.SearchByStore()">
                    Buscar
            </button>

            <button type="button" 
                    class="btn btn-warning" 
                    ng-click="vm.CleanStoreModel()">
                    Limpiar Consulta
            </button>

        </form>

        <hr ng-if="vm.showDataTableResult">

        <div class="clearfix" ng-if="vm.showDataTableResult">
            <div style="width: 100%; height:390px; overflow: auto;">
                <div class="table-responsive">
                    <table class="table table-bordered">
                        <caption>Información del Pedido</caption>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Cédula</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Dirección Envío</th>
                                <th>Teléfono</th>
                                <th>Email</th>
                                <th>Descripción Pedido</th>
                                <th>Tienda</th>
                                <th>Forma de Pago</th>
                                <th>Fecha de Pedido</th>
                                <th>Fecha de Entrega</th>
                                <th>Hora de Entrega</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr ng-repeat="order in vm.storeModel.QueryDataModel.QueryDataResult">
                                <td>{{order.Id}}</td>
                                <td>{{order.IdentityCard}}</td>
                                <td>{{order.Name}}</td>
                                <td>{{order.Surname}}</td>
                                <td>{{order.AddressToSend}}</td>
                                <td>{{order.Phone}}</td>
                                <td>{{order.Email}}</td>
                                <td>{{order.OrderDescription}}</td>
                                <td>{{order.Store}}</td>
                                <td>{{order.WayToPay}}</td>
                                <td>{{order.DateOrder}}</td>
                                <td>{{order.DateToSend}}</td>
                                <td>{{order.TimeToSend}}</td>
                            </tr>
                        </tbody>
                    </table>
                    <br>
                </div>
            </div>    
        </div>
    </div>
</div>
<?php
	}
	else {
		header('location: ../../../../../index.php');
	}
?>