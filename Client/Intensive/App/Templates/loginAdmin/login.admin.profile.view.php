<?php
	session_start();

	if(isset($_SESSION['user_auth']))
    {  
?>

<div class="row">
    <div class="box">
        <div class="row">
			<div class="col-lg-3">
				<div class="panel panel-default">
					<div class="panel-heading">
						<h3 class="panel-title">Opciones del perfil</h3>
					</div>
					<div class="panel-body" style="padding: 0px;">
						<ul class="nav nav-pills nav-stacked">
							<li role="presentation" ui-sref="intensive.activities.profile.update" ui-sref-active="active" class="active">
								<a>Información Personal</a>
							</li>
							<li role="presentation" 
								ui-sref="intensive.activities.profile.usersadministration" 
								ui-sref-active="active"
								ng-if="<?php $_SESSION['user_auth'][2] == 'admin'?>">
								<a>Listado de Usuarios</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="col-lg-9">
				<div class="panel panel-default">
					<div class="panel-body">
						<div ui-view></div>
					</div>
				</div>
			</div>
		</div>      
    </div>
</div>
<?php
	}
	else {
		header('location: ../../../../../index.php');
	}
?>