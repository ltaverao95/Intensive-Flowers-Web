<?php  
	require('../../../DataBaseData/DbConnection/dataBaseInit.php');
	require('../../../DatabaseData/Headers/headers.php');
	require('../../../DTO/ResponseDTO.php');

	$deleteMessage = file_get_contents("php://input");
	$objToDelete = json_decode($deleteMessage);
	$responseDTO = new ResponseDTO();

	try 
	{
		$query = "DELETE FROM message WHERE id = :id";
		$q = $con->prepare($query);
		$q->execute(array(':id' => $objToDelete->id));

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
		$responseDTO->ResponseMessage = "Mensaje Eliminado";	
	} 
	catch (Exception $e) 
	{
		$responseDTO->Result = 1;
		$responseDTO->ResponseMessage = $e->getMessage();
	}

	echo json_encode($responseDTO);
	$con = null;
?>