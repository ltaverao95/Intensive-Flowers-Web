<?php

	require('../../../DataBaseData/DbConnection/dataBaseInit.php');
	require('../../../DatabaseData/Headers/headers.php');
	require('../../../DTO/ResponseDTO.php');

	session_start();

	$loginDataJson = file_get_contents("php://input");
	$objloginData = json_decode($loginDataJson);
	$responseDTO = new ResponseDTO();

	try {

		$query = "SELECT * FROM login WHERE user = :user AND pass = :pass";
		$q = $con->prepare($query);
		$q->execute(array(':user' => $objloginData->user, 
						  ':pass' =>$objloginData->pass));

		$rowUser = $q->fetch();
		
		if($rowUser == NULL)
		{
			$responseDTO->Result = 1;
			$responseDTO->ResponseMessage = "Usuario y/o contraseña inválidos, intente de nuevo.";

			echo json_encode($responseDTO);
		}
		else 
		{
			$_SESSION['admin'] = $objloginData->user;
		}
	} 
	catch (Exception $e) 
	{
		$responseDTO->Result = 1;
		$responseDTO->ResponseMessage = "Ha ocurrido un problema durante el proceso";
		$responseDTO->StackTrace = $e->getMessage();
		
		echo json_encode($responseDTO);
	}

	$con = null;

?>