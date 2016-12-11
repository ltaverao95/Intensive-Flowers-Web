<?php

	$user = 'root';
	$pass = 'felipe0025';

	try {
		$con = new PDO('mysql:host=localhost;dbname=intensiveflowers', $user, $pass) or die ("Error de Conexión de la base de datos");	
	} 
	catch (Exception $e) {

		$array = array(
			'Result' => 1,
			'Message' =>  $e->getMessage()
		);

		echo json_encode($array);
	}
?>