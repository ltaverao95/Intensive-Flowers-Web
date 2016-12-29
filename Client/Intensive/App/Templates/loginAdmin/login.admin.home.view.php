<?php
	session_start();

	if(isset($_SESSION['user_auth']))
    {
?>
<div class="row">
    <div class="box">
        <div class="col-lg-12">
            <hr>
            <h2 class="intro-text text-center">
                <strong>Actividades</strong>
            </h2>
            <hr>
        </div>
        <div class="col-md-12">
            <p>
                Panel de administrador para controlar el estado de los pedidos, consultarlos por: Nombre, Nombre y Fecha de Env&iacute;o
                y por Cadena. Tambi&eacute;n revisar los mensajes y eliminarlos llegado el caso de que estos sean ofensivos.
            </p>
        </div>
        <div class="col-md-6">
            <br>
            
        </div>
        <div class="clearfix"></div>
    </div>
</div>

<div class="row">
    <div class="box">
        <ul class="nav nav-tabs">
            <li role="presentation"><a ui-sref="intensive.activities">Home</a></li>
            <li role="presentation" ng-class="{active: vm.$state.includes('intensive.activities.querys')}"><a ui-sref="intensive.activities.querys">Consultas Tiendas</a></li>
            <li role="presentation" ng-class="{active: vm.$state.includes('intensive.activities.orders')}"><a ui-sref="intensive.activities.orders">Pedidos</a></li>
            <li role="presentation" ng-class="{active: vm.$state.includes('intensive.activities.messages')}"><a ui-sref="intensive.activities.messages">Mensajes</a></li>
            <li role="presentation" ng-class="{active: vm.$state.includes('intensive.activities.contact')}"><a ui-sref="intensive.activities.contact">Contactos</a></li>
            <li role="presentation" ng-class="{active: vm.$state.includes('intensive.activities.profile')}"><a ui-sref="intensive.activities.profile">Perfil</a></li>
        </ul>
        <br>
        <div class="clearfix">
        </div>
        
        <div ui-view> 

            <div >
                <div class="jumbotron" style="text-align: center; width: 35%">
                    <h3>
                        Home principal de la administración
                    </h3>
                    <ul>
                        <li>
                            Realizar consultas de los pedidos hechos por los usuarios.
                        </li>
                        <li>
                            Aministrar los pedidos realizados.
                        </li>
                        <li>
                            Administrar los mensajes enviados por los usuarios.
                        </li>
                        <li>
                            Administrar los mensajes de contacto enviados por los usuarios
                        </li>
                        <li>
                            Administrar tu perfil, actualizar tus datos de contacto entre otras.
                        </li>
                    </ul>
                </div>
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