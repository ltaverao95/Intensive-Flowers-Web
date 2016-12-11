<?php
	session_start();

	if(isset($_SESSION['admin'])){
      
?>

<div class="row">
    <div class="box">
        <input type="text" class="form-control" placeholder="Buscar..." ng-model="vm.rootOrdersObj.searchOrder">
        <br>
        <div class="clearfix">
            <div style="width: 100%; height:390px; overflow: scroll;">
                <div class="table-responsive">
                    <table class="table table-bordered">
                        <thead>
                            <th>
                                <input type="checkbox" ng-model="vm.rootOrdersObj.selectAllOrders" ng-click="vm.CheckAllOrders()">
                            </th>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Dirección de Envío</th>
                            <th>Teléfono</th>
                            <th>Email</th>
                            <th>Descripción Pedido</th>
                            <th>Tienda</th>
                            <th>Forma de Pago</th>
                            <th>Fecha del Pedido</th>
                            <th>Fecha de Entrega</th>
                            <th>Hora Entrega</th>
                        </thead>
                        <tbody ng-repeat="order in vm.rootOrdersObj.allOrders | filter: vm.rootOrdersObj.searchOrder | pagination: vm.currentPage * vm.pageSize | limitTo: vm.pageSize" ng-class="{'tableTdColor': $index % 2 != 0}">
                            <td>
                                <input type="checkbox" ng-model="order.Selected" ng-change="vm.OrderSelectedChanged(order)">
                            </td>
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
                            <td>
                                <button class="btn btn-danger glyphicon glyphicon-trash" ng-click="vm.DeleteOrderByID(order)"></button>
                                <button class="btn btn-success glyphicon glyphicon-edit" ng-click="vm.UpdateOrder(order)"></button>
                                <button class="btn btn-primary glyphicon glyphicon-eye-open" ng-click="vm.ViewOrderByID(order)"></button>
                            </td>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="pagination-controle pagination">
                <button type="button" 
                      class="btn btn-primary" 
                      ng-disabled="vm.currentPage == 0" 
                      ng-click="vm.CurrentPageChanged(false)"> 
                      &lt; Anterior
                </button>
                <span>Página {{vm.currentPage + 1}} de {{ vm.numberOfPages() }}</span>
                <button type="button" class="btn btn-primary"
                      ng-disabled="vm.currentPage >= vm.rootOrdersObj.allOrders.length/vm.pageSize - 1 || vm.rootOrdersObj.allOrders == 0"
                      ng-click="vm.CurrentPageChanged(true)">Siguiente &gt;
                </button>
            </div>
            <div>
                <button class="btn btn-success" ng-click="vm.DeleteAllOrders()">Borrar todos</button>
                <button class="btn btn-success" ng-click="vm.DeleteOrderSelected()">Borrar Seleccionados</button>
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