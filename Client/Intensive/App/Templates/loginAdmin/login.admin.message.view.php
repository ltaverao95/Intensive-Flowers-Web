<?php
	session_start();

	if(isset($_SESSION['admin'])){
      
?>

<div class="row">
    <div class="box">
        <input type="text" class="form-control" placeholder="Buscar..." ng-model="vm.rootMessageObj.searchMessage">
        <br>
        <div class="clearfix">
            <div style="width: 100%; height:390px; overflow: scroll;">
                <div class="table-responsive">
                    <table class="table table-bordered">
                        <thead>
                            <th>
                                <input type="checkbox" ng-model="vm.rootMessageObj.selectAllMessages" ng-click="vm.CheckAllMessages()">
                            </th>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Comentario</th>
                            <th>Opciones</th>
                        </thead>
                        <tbody ng-repeat="message in vm.rootMessageObj.messagesObj | filter: vm.rootMessageObj.searchMessage | pagination: vm.currentPage * vm.pageSize | limitTo: vm.pageSize" ng-class="{'tableTdColor': $index % 2 != 0}">
                            <td>
                                <input type="checkbox" ng-model="message.Selected" ng-change="vm.MessageSelectedChanged(message)">
                            </td>
                            <td>
                                {{message.id}}
                            </td>
                            <td>
                                {{message.name}}
                            </td>
                            <td>
                                {{message.message}}
                            </td>
                            <td>
                                <button class="btn btn-danger glyphicon glyphicon-trash" ng-click="vm.DeleteMessageByID(message)"></button>
                                <button class="btn btn-success glyphicon glyphicon-edit" ng-click="vm.EditMessageById(message)"></button>
                                <button class="btn btn-primary glyphicon glyphicon-eye-open" ng-click="vm.ViewMessageById(message)"></button>
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
                <button type="button" 
                        class="btn btn-primary"
                        ng-disabled="vm.currentPage >= vm.rootMessageObj.messagesObj.length/vm.pageSize - 1 || vm.rootMessageObj.messagesObj == 0"
                        ng-click="vm.CurrentPageChanged(true)">
                        Siguiente &gt;
                </button>
            </div>
            <div>
                <button class="btn btn-success" ng-click="vm.DeleteAllMessages()">Borrar todos</button>
                <button class="btn btn-success" ng-click="vm.DeleteMessageSelected()">Borrar Seleccionados</button>
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