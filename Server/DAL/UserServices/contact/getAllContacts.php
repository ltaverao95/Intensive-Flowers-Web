<?php  
	require('../../../DataBaseData/DbConnection/dataBaseInit.php');
	require('../../../DatabaseData/Headers/headers.php');
	require('../../../DataBaseData/Class/ContactClass.php');
	require('../../../DTO/ResponseDTO.php');

	$responseDTO = new ResponseDTO();

	try 
	{
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
			$responseDTO->Result = 1;
			$responseDTO->ResponseMessage = "No hay registros para mostrar";
		}
		else 
		{
			$responseDTO->Result = 0;
			$responseDTO->ObjData = $arrayContact;
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