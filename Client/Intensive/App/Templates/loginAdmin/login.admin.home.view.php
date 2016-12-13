<?php
	session_start();

	if(isset($_SESSION['admin']))
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
            <li role="presentation"><a ui-sref="intensive.activities.querys" ui-sref-active="active">Consultas Tiendas</a></li>
            <li role="presentation"><a ui-sref="intensive.activities.orders" ui-sref-active="active">Pedidos</a></li>
            <li role="presentation"><a ui-sref="intensive.activities.messages" ui-sref-active="active">Mensajes</a></li>
            <li role="presentation"><a ui-sref="intensive.activities.contact" ui-sref-active="active">Contactos</a></li>
        </ul>
        <br>
        <div class="clearfix">
        </div>
        
        <div ui-view></div>

    </div>
</div>
<?php
	}
	else {
		header('location: index.php');
	}
?>