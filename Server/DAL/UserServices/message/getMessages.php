<?php
	require('../../../DataBaseData/DbConnection/dataBaseInit.php');
	require('../../../DatabaseData/Headers/headers.php');
	require('../../../DatabaseData/Class/MessageClass.php');
	require('../../../DTO/ResponseDTO.php');

	$responseDTO = new ResponseDTO();

	try {
		
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

		if($arrayMessages == NULL)
		{
			$responseDTO->Result = 1;
			$responseDTO->ResponseMessage = "No hay registros para mostrar";
		}
		else 
		{
			$responseDTO->Result = 0;
			$responseDTO->ObjData = $arrayMessages;
		}

	} 
	catch (Exception $e) 
	{	
		$responseDTO->Result = 1;
		$responseDTO->ResponseMessage = "A ocurrido un problema durante el proceso";
		$responseDTO->$StackTrace = $e->getMessage();			
	}

	echo json_encode($responseDTO);
	$con = null;
?>