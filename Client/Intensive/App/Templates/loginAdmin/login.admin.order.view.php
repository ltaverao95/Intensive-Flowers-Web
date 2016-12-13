<?php
	session_start();

	if(isset($_SESSION['admin']))
    {  
?>

<div class="row">
    <div class="box">
        <input type="text" class="form-control" placeholder="Buscar..." ng-model="vm.searchOrder">
        <br>
        <div class="clearfix">
            <div style="width: 100%; height:390px; overflow: auto;">
                <div class="table-responsive">
                    <table class="table table-bordered">
                        <thead>
                            <th>
                                <input type="checkbox" ng-model="vm.storeModel.PaginatorModel.SelectAllItems" ng-click="vm.CheckAllOrders()">
                            </th>
                            <th>Cédula</th>
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
                            <th>Acciones</th>
                        </thead>
                        <tbody ng-repeat="order in vm.storeModel.OrdersList | pagination: vm.storeModel.PaginatorModel.CurrentPage * vm.storeModel.PaginatorModel.PageSize | limitTo: vm.storeModel.PaginatorModel.PageSize | filter: vm.searchOrder" 
                               ng-class="{'tableTdColor': $index % 2 != 0}">
                            <td>
                                <input type="checkbox" ng-model="order.Selected" ng-change="vm.OrderSelectedChanged(order)">
                            </td>
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
                      ng-disabled="vm.storeModel.PaginatorModel.CurrentPage == 0" 
                      ng-click="vm.storeModel.PaginatorModel.CurrentPageChanged(false)"> 
                      &lt; Anterior
                </button>
                <span>Página {{vm.storeModel.PaginatorModel.CurrentPage + 1}} de {{ vm.storeModel.PaginatorModel.NumberOfPages(vm.storeModel.OrdersList) }}</span>
                <button type="button" class="btn btn-primary"
                      ng-disabled="vm.storeModel.PaginatorModel.CurrentPage >= vm.storeModel.OrdersList.length/vm.storeModel.PaginatorModel.PageSize - 1 || vm.storeModel.OrdersList == 0"
                      ng-click="vm.storeModel.PaginatorModel.CurrentPageChanged(true)">Siguiente &gt;
                </button>
            </div>
            <div>
                <button class="btn btn-success" ng-click="vm.DeleteAllOrders()">Borrar todos</button>
                <button class="btn btn-success" ng-click="vm.DeleteOrdersSelected()">Borrar Seleccionados</button>
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