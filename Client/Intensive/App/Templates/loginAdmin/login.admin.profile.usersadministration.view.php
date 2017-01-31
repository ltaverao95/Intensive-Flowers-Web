<div class="row">
  <div class="col-lg-12">
    <table class="table table-fixed">
      <thead>
        <tr>
          <th colspan="6" class="col-xs-12">
            <input type="text" class="form-control" placeholder="Buscar..." ng-model="vm.searchUser">
          </th>
        </tr>
        <tr>
          <th class="col-xs-1">
            <input type="checkbox"
                   ng-model="vm.loginModel.PaginatorModel.SelectAllItems" 
                   ng-click="vm.CheckAllUsers()">
          </th>
          <th class="col-xs-2">Nombre</th>
          <th class="col-xs-2">Apellido</th>
          <th class="col-xs-1">Teléfono</th>
          <th class="col-xs-4">Email</th>
          <th class="col-xs-2">Acciones</th>
        </tr>
      </thead>
      <tbody style="padding: 15px">
        <tr class="row" 
            ng-repeat="user in vm.loginModel.UsersList | pagination: vm.loginModel.PaginatorModel.CurrentPage * vm.loginModel.PaginatorModel.PageSize | limitTo: vm.loginModel.PaginatorModel.PageSize | filter: vm.searchUser"
            ng-class="{'tableTdColor': $index % 2 != 0}">
          <td class="col-xs-1">
            <input type="checkbox"
                   ng-model="user.Selected"
                   ng-change="vm.UserSelectedChanged(user)">
          </td>
          <td class="col-xs-2">
            {{user.UserAdminDTO.Name}}
          </td>
          <td class="col-xs-2">
            {{user.UserAdminDTO.Surname}}
          </td>
          <td class="col-xs-1">
            {{user.UserAdminDTO.Phone}}
          </td>
          <td class="col-xs-4">
            {{user.UserAdminDTO.Email | limitTo: 29}}
            <span ng-if="user.UserAdminDTO.Email.length > 29">...</span>
          </td>
          <td class="col-xs-2">
            <button class="btn btn-primary glyphicon glyphicon-eye-open" 
                    title="Visualizar usuario"
                    ng-click="vm.ViewUserByID(user)">
            </button>
            <button class="btn btn-success glyphicon glyphicon-edit" 
                    title="Editar usuario"
                    ng-click="vm.EditUserByID(user)">
            </button>
            
            <button class="btn btn-danger glyphicon glyphicon-trash" 
                    title="Eliminar usuario"
                    ng-click="vm.DeleteUserByID(user)">
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="pagination-control pagination">
        <button type="button" 
                class="btn btn-primary" 
                ng-disabled="vm.loginModel.PaginatorModel.CurrentPage == 0" 
                ng-click="vm.loginModel.PaginatorModel.CurrentPageChanged(false)"> 
              &lt; Anterior
        </button>
        <span>Página {{vm.loginModel.PaginatorModel.CurrentPage + 1}} de {{ vm.loginModel.PaginatorModel.NumberOfPages(vm.loginModel.UsersList) }}</span>
        <button type="button" class="btn btn-primary"
                ng-disabled="vm.loginModel.PaginatorModel.CurrentPage >= vm.loginModel.UsersList.length/vm.loginModel.PaginatorModel.PageSize - 1 || vm.loginModel.UsersList == 0"
                ng-click="vm.loginModel.PaginatorModel.CurrentPageChanged(true)">Siguiente &gt;
        </button>
      </div>
      
      <div>
          <button class="btn btn-success" ng-click="vm.DeleteAllUsers()">Borrar todos</button>
          <button class="btn btn-success" ng-click="vm.DeleteUsersSelected()">Borrar Seleccionados</button>
          <button class="btn btn-success" ng-click="vm.CreateUser()">Crear Usuario</button>
      </div>  
  </div>
</div>