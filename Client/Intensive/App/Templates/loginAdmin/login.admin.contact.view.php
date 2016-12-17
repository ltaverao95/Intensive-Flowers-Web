<?php
	session_start();

	if(isset($_SESSION['user_auth']))
    {  
?>

<div class="row">
    <div class="box">
        <input type="text" class="form-control" placeholder="Buscar..." ng-model="vm.searchContact">
        <br>
        <div class="clearfix">
            <div style="width: 100%; max-height:390px; overflow: auto;">
                <div class="table-responsive">
                    <table class="table table-bordered">
                        <thead>
                            <th ng-if="<?php echo $_SESSION['user_auth'][3] == 'admin'?>">
                                <input type="checkbox" ng-model="vm.contactModel.PaginatorModel.SelectAllItems" ng-click="vm.CheckAllContacts()">
                            </th>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Celular</th>
                            <th>Mensaje</th>
                            <th></th>
                        </thead>
                        <tbody ng-repeat="user in vm.contactModel.ContactsList | filter: vm.searchContact | pagination: vm.contactModel.PaginatorModel.CurrentPage * vm.contactModel.PaginatorModel.PageSize | limitTo: vm.contactModel.PaginatorModel.PageSize" ng-class="{'tableTdColor': $index % 2 != 0}">
                            <td ng-if="<?php echo $_SESSION['user_auth'][3] == 'admin'?>">
                                <input type="checkbox" ng-model="user.Selected" ng-change="vm.ContactSelectedChanged(user)">
                            </td>
                            <td>{{user.Name}}</td>
                            <td>{{user.Email}}</td>
                            <td>{{user.Phone}}</td>
                            <td>{{user.Message}}</td>
                            <td>
                                <button class="btn btn-danger glyphicon glyphicon-trash" 
                                        ng-click="vm.DeleteContactByID(user)"
                                        ng-if="<?php echo $_SESSION['user_auth'][3] == 'admin'?>">
                                </button>
                                <button class="btn btn-success glyphicon glyphicon-edit" 
                                        ng-click="vm.EditUserByID(user)"
                                        ng-if="<?php echo $_SESSION['user_auth'][3] != 'reader'?>">
                                </button>
                                <button class="btn btn-primary glyphicon glyphicon-eye-open" ng-click="vm.ViewUserByID(user)"></button>
                            </td>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="pagination-controle pagination">
                <button type="button" 
                      class="btn btn-primary" 
                      ng-disabled="vm.contactModel.PaginatorModel.CurrentPage == 0" 
                      ng-click="vm.contactModel.PaginatorModel.CurrentPageChanged(false)"> 
                      &lt; Anterior
                </button>
                <span>Página {{vm.contactModel.PaginatorModel.CurrentPage + 1}} de {{ vm.contactModel.PaginatorModel.NumberOfPages(vm.contactModel.ContactsList) }}</span>
                <button type="button" class="btn btn-primary"
                      ng-disabled="vm.contactModel.PaginatorModel.CurrentPage >= vm.contactModel.ContactsList.length/vm.contactModel.PaginatorModel.PageSize - 1 || vm.contactModel.ContactsList == 0"
                      ng-click="vm.contactModel.PaginatorModel.CurrentPageChanged(true)">Siguiente &gt;
                </button>
            </div>
            <div ng-if="<?php echo $_SESSION['user_auth'][3] == 'admin'?>">
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