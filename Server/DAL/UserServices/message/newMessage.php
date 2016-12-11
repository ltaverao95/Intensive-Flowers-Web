<?php
	require('../../../DataBaseData/DbConnection/dataBaseInit.php');
	require('../../../DatabaseData/Headers/headers.php');
	require('../../../DTO/ResponseDTO.php');

	$jsonMessage = file_get_contents("php://input");
	$objMessage = json_decode($jsonMessage);
	$responseDTO = new ResponseDTO();
	
	try {

		$query = "INSERT INTO message (id, name, message) VALUES (:id, :name, :message)";

		$q = $con->prepare($query);
		$q->execute(array(':id' => NULL, 
						  ':name' =>$objMessage->name,
						  ':message' =>$objMessage->message)); 
		
		$responseDTO->Result = 0;
		$responseDTO->ResponseMessage = "Mensaje Enviado";

	} 
	catch (Exception $e) 
	{
		$responseDTO->Result = 1;
		$responseDTO->ResponseMessage = $e->getMessage();
	}

	echo json_encode($responseDTO);
	$con = null;
?>