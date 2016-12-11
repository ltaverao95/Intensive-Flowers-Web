<?php  
	
	require('../../../DataBaseData/DbConnection/dataBaseInit.php');
	require('../../../DatabaseData/Headers/headers.php');
	require('../../../DTO/ResponseDTO.php');

	$contactsToDeleteJson = file_get_contents("php://input");
	$contactsToDeleteObj = json_decode($contactsToDeleteJson);
	$responseDTO = new ResponseDTO();

	try {

		for ($i=0; $i < count($contactsToDeleteObj); $i++) {

			$query = "DELETE FROM contact WHERE id = :id";
			$q = $con->prepare($query);
			$q->execute(array(':id' => $contactsToDeleteObj[$i]->id));
		}

		$query = "SELECT * FROM contact ORDER BY id";
		$q = $con->prepare($query);
		$q->execute();
		
		$result = $q->fetchAll();	

		$arrayContact = array();
		while ($row = array_shift($result)) {
			$contactObj = new Contact();

			$contactObj->id = $row['id'];
			$contactObj->name = $row['name'];
			$contactObj->email = $row['email'];
			$contactObj->phone = $row['phone'];
			$contactObj->message = $row['message'];

			array_push($arrayContact, $contactObj);
		};

		if($arrayContact == NULL)
		{
			$query = "ALTER TABLE contact AUTO_INCREMENT = 1";
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