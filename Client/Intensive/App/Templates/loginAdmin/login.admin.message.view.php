<?php
	session_start();

	if(isset($_SESSION['user_auth']))
    {  
?>

<div class="row">
    <div class="box">
        <input type="text" class="form-control" placeholder="Buscar..." ng-model="vm.searchMessage">
        <br>
        <div class="clearfix">
            <div style="width: 100%; max-height:390px; overflow: auto;">
                <div class="table-responsive">
                    <table class="table table-bordered">
                        <thead>
                            <th ng-if="<?php echo $_SESSION['user_auth'][3] == 'admin'?>">
                                <input type="checkbox" ng-model="vm.messageModel.PaginatorModel.SelectAllItems" ng-click="vm.CheckAllMessages()">
                            </th>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Comentario</th>
                            <th>Acciones</th>
                        </thead>
                        <tbody ng-repeat="message in vm.messageModel.MessagesList  | pagination: vm.messageModel.PaginatorModel.CurrentPage * vm.messageModel.PaginatorModel.PageSize | limitTo: vm.messageModel.PaginatorModel.PageSize | filter: vm.searchMessage"> 
                            <td ng-if="<?php echo $_SESSION['user_auth'][3] == 'admin'?>">
                                <input type="checkbox" ng-model="message.Selected" ng-change="vm.MessageSelectedChanged(message)">
                            </td>
                            <td>
                                {{message.Id}}
                            </td>
                            <td>
                                {{message.Name}}
                            </td>
                            <td>
                                {{message.Message}}
                            </td>
                            <td>
                                <button class="btn btn-danger glyphicon glyphicon-trash" 
                                        ng-click="vm.DeleteMessageByID(message)"
                                        title="Borrar mensaje actual"
                                        ng-if="<?php echo $_SESSION['user_auth'][3] == 'admin'?>">
                                </button>
                                <button class="btn btn-success glyphicon glyphicon-edit" 
                                        ng-click="vm.EditMessageById(message)"
                                        title="Editar el mensaje actual"
                                        ng-if="<?php echo $_SESSION['user_auth'][3] != 'reader'?>">
                                </button>
                                <button class="btn btn-primary glyphicon glyphicon-eye-open" 
                                        ng-click="vm.ViewMessageById(message)"
                                        title="Visualizar el mensaje actual">
                                </button>
                            </td>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="pagination-controle pagination">
                <button type="button" 
                      class="btn btn-primary" 
                      ng-disabled="vm.messageModel.PaginatorModel.CurrentPage == 0" 
                      ng-click="vm.messageModel.PaginatorModel.CurrentPageChanged(false)"> 
                      &lt; Anterior
                </button>
                <span>Página {{vm.messageModel.PaginatorModel.CurrentPage + 1}} de {{ vm.messageModel.PaginatorModel.NumberOfPages(vm.messageModel.MessagesList) }}</span>
                <button type="button" class="btn btn-primary"
                      ng-disabled="vm.messageModel.PaginatorModel.CurrentPage >= vm.messageModel.MessagesList.length/vm.messageModel.PaginatorModel.PageSize - 1 || vm.messageModel.MessagesList == 0"
                      ng-click="vm.messageModel.PaginatorModel.CurrentPageChanged(true)">Siguiente &gt;
                </button>
            </div>
            <div ng-if="<?php echo $_SESSION['user_auth'][3] == 'admin'?>">
                <button class="btn btn-success" ng-click="vm.DeleteAllMessages()">Borrar todos</button>
                <button class="btn btn-success" ng-click="vm.DeleteMessagesSelected()">Borrar Seleccionados</button>
            </div>         
        </div>
    </div>
</div>
<?php
	}
	else 
    {
		header('location: ../../../../../index.php');
	}
?>