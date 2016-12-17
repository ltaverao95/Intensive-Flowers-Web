<div class="row">
    <div class="col-lg-12">
        <form name="order_detail_form">
            <div>
                <label for="order_detail_form_id">Id: </label>
                <input type="text" 
                        id="order_detail_form_id"
                        ng-model="vm.storeModel.Id" 
                        class="form-control"
                        name="id" 
                        readonly>
            </div>
            <div>
                <label for="order_detail_form_name">Nombre: </label>
                <input type="text" 
                        id="order_detail_form_name"
                        ng-model="vm.storeModel.Name" 
                        class="form-control" 
                        name="name"
                        ng-required="!vm.storeModel.IsReadOnlyMode"
                        ng-readonly="vm.storeModel.IsReadOnlyMode">
            </div>
            <div>
                <label for="order_detail_form_surname">Apellido: </label>
                <input type="text" 
                        id="order_detail_form_surname"
                        name="surname"
                        ng-model="vm.storeModel.Surname" 
                        class="form-control" 
                        ng-required="!vm.storeModel.IsReadOnlyMode"
                        ng-readonly="vm.storeModel.IsReadOnlyMode">
            </div>
            <div>
                <label for="order_detail_form_address_to_send">Dirección de Envío: </label>
                <input type="text" 
                        id="order_detail_form_address_to_send"
                        name="address_to_send"
                        ng-model="vm.storeModel.AddressToSend" 
                        class="form-control" 
                        ng-required="!vm.storeModel.IsReadOnlyMode"
                        ng-readonly="vm.storeModel.IsReadOnlyMode">
            </div>
            <div>
                <label for="order_detail_form_phone">Teléfono: </label>
                <input type="text" 
                        id="order_detail_form_phone"
                        name="phone"
                        ng-model="vm.storeModel.Phone" 
                        class="form-control" 
                        ng-required="!vm.storeModel.IsReadOnlyMode"
                        ng-readonly="vm.storeModel.IsReadOnlyMode">
            </div>
            <div>
                <label for="order_detail_form_email">Email: </label>
                <input type="email" 
                        id="order_detail_form_email"
                        name="email"
                        ng-model="vm.storeModel.Email" 
                        class="form-control"
                        ng-required="!vm.storeModel.IsReadOnlyMode"
                        ng-readonly="vm.storeModel.IsReadOnlyMode">
            </div>
            <div>
                <label for="order_detail_form_order_description">Descripción del Pedido: </label>
                <textarea name="order_description" 
                            id="order_detail_form_order_description" 
                            cols="30" 
                            rows="3"
                            style="resize: vertical"
                            class="form-control"
                            ng-model="vm.storeModel.OrderDescription"
                            ng-required="!vm.storeModel.IsReadOnlyMode"
                            ng-readonly="vm.storeModel.IsReadOnlyMode">
                </textarea>
            </div>
            <div>
                <label for="order_detail_form_store">Tienda: </label>
                <input type="text" 
                        id="order_detail_form_store"
                        name="store"
                        ng-model="vm.UtilsConstants.StoresList[vm.storeModel.Store].Name"
                        ng-if="vm.storeModel.IsReadOnlyMode" 
                        class="form-control" 
                        readonly>

                <select class="form-control"
                        id="order_detail_form_store"
                        name="store"
                        ng-model="vm.storeModel.Store" 
                        ng-if="!vm.storeModel.IsReadOnlyMode"
                        ng-options="store.Id as store.Name for store in vm.UtilsConstants.StoresList"
                        required>
                    <option value="">Seleccionar</option>
                </select>
            </div>

            <div>
                <label for="order_detail_form_way_to_pay">Forma de Pago: </label>
                <input type="text" 
                        id="order_detail_form_way_to_pay"
                        name="way_to_pay"
                        ng-model="vm.UtilsConstants.WayToPayList[vm.storeModel.WayToPay].Name" 
                        ng-if="vm.storeModel.IsReadOnlyMode" 
                        class="form-control" 
                        readonly>

                <select class="form-control"
                        id="order_detail_form_way_to_pay"
                        name="way_to_pay"
                        ng-model="vm.storeModel.WayToPay" 
                        ng-options="wayToPay.Id as wayToPay.Name for wayToPay in vm.UtilsConstants.WayToPayList"
                        ng-if="!vm.storeModel.IsReadOnlyMode"
                        required>
                    <option value="">Seleccionar</option>
                </select>       
            </div>
            <div>
                <label for="order_detail_form_date_order">Fecha del Pedido: </label>
                <input type="date" 
                        id="order_detail_form_date_order"
                        ng-model="vm.storeModel.DateOrder" 
                        class="form-control" 
                        ng-required="!vm.storeModel.IsReadOnlyMode"
                        ng-readonly="vm.storeModel.IsReadOnlyMode">
            </div>
            <div>
                <label for="order_detail_form_date_to_send">Fecha de Entrega: </label>
                <input type="date" 
                        id="order_detail_form_date_to_send"
                        name="date_to_send"
                        ng-model="vm.storeModel.DateToSend" 
                        class="form-control" 
                        ng-required="!vm.storeModel.IsReadOnlyMode"
                        ng-readonly="vm.storeModel.IsReadOnlyMode">
            </div>
            <div>
                <label for="order_detail_form_time_to_send">Hora de Entrega: </label>
                <input type="text" 
                        id="order_detail_form_time_to_send"
                        name="time_to_send"
                        ng-model="vm.storeModel.TimeToSend" 
                        class="form-control" 
                        ng-required="!vm.storeModel.IsReadOnlyMode"
                        ng-readonly="vm.storeModel.IsReadOnlyMode">
            </div>
        </form>
    </div>
</div>
<div class="row">
    <div class="col-lg-12">
        <div class="panel panel-warning">
            <div class="panel-heading">
                <h3 class="panel-title">Opciones de la Cuenta</h3>
            </div>
            <div class="panel-body">
                
            </div>
        </div>
    </div>
</div>