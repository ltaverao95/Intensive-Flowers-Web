<?php  
	
	require('../../../DataBaseData/DbConnection/dataBaseInit.php');
	require('../../../DatabaseData/Headers/headers.php');
	require('../../../DTO/ResponseDTO.php');

	$messageToDeleteJson = file_get_contents("php://input");
	$messageToDelete = json_decode($messageToDeleteJson);
	$responseDTO = new ResponseDTO();

	try {

		for ($i=0; $i < count($messageToDelete); $i++) {

			$query = "DELETE FROM message WHERE id = :id";
			$q = $con->prepare($query);
			$q->execute(array(':id' => $messageToDelete[$i]->id));
		}

		$query = "SELECT * FROM message";
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
			$query = "ALTER TABLE message AUTO_INCREMENT = 1";
			$q = $con->prepare($query);
			$q->execute();
		}

		$responseDTO->Result = 0;
		$responseDTO->ResponseMessage = "Registros Eliminados";
	} 
	catch (Exception $e) 
	{
		$responseDTO->Result = 1;
		$responseDTO->ResponseMessage = "Ha ocurrido un problema durante el proceso";
		$responseDTO->StackTrace = $e->getMessage();
	}

	echo json_encode($responseDTO);
	$con = null;

?>