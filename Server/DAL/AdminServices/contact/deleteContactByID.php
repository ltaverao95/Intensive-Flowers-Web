<?php  
	require('../../../DataBaseData/DbConnection/dataBaseInit.php');
	require('../../../DatabaseData/Headers/headers.php');
	require('../../../DTO/ResponseDTO.php');

	$deleteContact = file_get_contents("php://input");
	$objToDelete = json_decode($deleteContact);
	$responseDTO = new ResponseDTO();

	try 
	{
		$query = "DELETE FROM contact WHERE id = :id";
		$q = $con->prepare($query);
		$q->execute(array(':id' => $objToDelete->id));

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
		$responseDTO->ResponseMessage = "Contacto Eliminado";	
	} 
	catch (Exception $e) 
	{
		$responseDTO->Result = 1;
		$responseDTO->ResponseMessage = $e->getMessage();
	}

	echo json_encode($responseDTO);
	$con = null;
?>