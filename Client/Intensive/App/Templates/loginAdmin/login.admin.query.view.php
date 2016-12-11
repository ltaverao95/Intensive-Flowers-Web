<?php
	session_start();

	if(isset($_SESSION['admin'])){
?>

<div class="row">
    <div class="box">
        <form>
            <div class="form-group">
                <label for="selectName">Buscar por Nombre</label>
                <input type="text" 
                       class="form-control" 
                       ng-model="vm.rootObjQuery.NameToSearch" 
                       placeholder="Nombre cliente a buscar">
            </div>
            <button type="submit" 
                    class="btn btn-default" 
                    ng-click="vm.SearchByName()">
                    Buscar
            </button>
            <hr>

            <div class="form-group">
                <label for="exampleInputText2">Buscar por Fecha y Tienda</label>
                <input type="date" 
                       class="form-control" 
                       id="exampleInputText2" 
                       ng-model="vm.rootObjQuery.DateToSearch">

                <select id="selectName" 
                        ng-model="vm.rootObjQuery.StoreName" 
                        ng-options="store.name as store.name for store in vm.storeNameToSelect"
                        class="form-control">
                    <option value="">[--Seleccionar--]</option>                        
                </select>
            </div>
            <button type="submit" class="btn btn-default" ng-click="vm.SearchByDateAndName()">Buscar</button>
            <hr>

            <div class="form-group">
                <label for="exampleInputText3">Buscar por Tienda</label>
                <select id="selectName" 
                        ng-model="vm.rootObjQuery.StoreName" 
                        ng-options="store.name as store.name for store in vm.storeNameToSelect"
                        class="form-control">
                    <option value="">[--Seleccionar--]</option>                        
                </select>
            </div>
            <button type="submit" class="btn btn-default" ng-click="vm.SearchStore()">Buscar</button>
            
            <hr>
            <button type="submit" class="btn btn-warning" ng-click="vm.CleanQuery()">Limpiar Consultas</button>

        </form>
        <hr>
        <div class="clearfix">
            <div style="width: 100%; height:390px; overflow: scroll;" ng-show="vm.showDataTableResult">
                <div class="table-responsive">
                    <table border="1">
                        <caption>Información del Pedido</caption>
                        <thead>
                            <tr>
                                <th>Id</th>
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
                            <tr ng-repeat="order in vm.rootObjQuery.ResultData">
                                <td>{{order.id}}</td>
                                <td>{{order.name}}</td>
                                <td>{{order.surname}}</td>
                                <td>{{order.addressToSend}}</td>
                                <td>{{order.phone}}</td>
                                <td>{{order.email}}</td>
                                <td>{{order.orderDescription}}</td>
                                <td>{{order.store}}</td>
                                <td>{{order.wayToPay}}</td>
                                <td>{{order.dateOrder}}</td>
                                <td>{{order.dateToSend}}</td>
                                <td>{{order.timeToSend}}</td>
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
		header('location: ../index.html');
	}
?>