<?php  

	require('../DataBaseData/Class/MessageClass.php');
	
	$user = 'postgres';
	$pass = 'felipe0025';

	try {
		$con = new PDO('pgsql:host=192.168.0.21;dbname=intensiveflowersdb', $user, $pass) or die ("Error de Conexión de la base de datos");	

		$query = "SELECT * FROM message ORDER BY id";
		$q = $con->prepare($query);
		$q->execute();
		
		$result = $q->fetchAll();	

		$arrayMessages = array();

		while ($row = array_shift($result)) {
			$objMessage = new Message();

			$objMessage->id = $row['id'];
			$objMessage->name = $row['name'];
			$objMessage->message = $row['message'];

			array_push($arrayMessages, $objMessage);
		};

		echo json_encode($arrayMessages);
	} 
	catch (Exception $e) {

		$array = array(
			'Result' => 1,
			'Message' =>  $e->getMessage()
		);

		echo json_encode($array);
	}

	$con = null;

?>