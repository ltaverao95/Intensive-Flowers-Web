<?php
	session_start();

	if(isset($_SESSION['admin'])){
      
?>

<div class="row">
    <div class="box">
        <input type="text" class="form-control" placeholder="Buscar..." ng-model="vm.rootLoginContact.searchContact">
        <br>
        <div class="clearfix">
            <div style="width: 100%; height:390px; overflow: scroll;">
                <div class="table-responsive">
                    <table class="table table-bordered">
                        <thead>
                            <th>
                                <input type="checkbox" ng-model="vm.rootLoginContact.selectAllContacts" ng-click="vm.CheckAllContacts()">
                            </th>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Celular</th>
                            <th>Mensaje</th>
                            <th></th>
                        </thead>
                        <tbody ng-repeat="user in vm.rootLoginContact.contacts | filter: vm.rootLoginContact.searchContact | pagination: vm.currentPage * vm.pageSize | limitTo: vm.pageSize" ng-class="{'tableTdColor': $index % 2 != 0}">
                            <td>
                                <input type="checkbox" ng-model="user.Selected" ng-change="vm.ContactSelectedChanged(user)">
                            </td>
                            <td>{{user.id}}</td>
                            <td>{{user.name}}</td>
                            <td>{{user.email}}</td>
                            <td>{{user.phone}}</td>
                            <td>{{user.message}}</td>
                            <td>
                                <button class="btn btn-danger glyphicon glyphicon-trash" ng-click="vm.DeleteContactByID(user)"></button>
                                <button class="btn btn-success glyphicon glyphicon-edit" ng-click="vm.EditUserByID(user)"></button>
                                <button class="btn btn-primary glyphicon glyphicon-eye-open" ng-click="vm.ViewUserByID(user)"></button>
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
                      ng-disabled="vm.currentPage >= vm.rootLoginContact.contacts.length/vm.pageSize - 1 || vm.rootLoginContact.contacts == 0"
                      ng-click="vm.CurrentPageChanged(true)">Siguiente &gt;
                </button>
            </div>
            <div>
                <button class="btn btn-success" ng-click="vm.DeleteAllContacts()">Borrar todos</button>
                <button class="btn btn-success" ng-click="vm.DeleteContactsSelected()">Borrar Seleccionados</button>
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