<?php  
	
	include_once("../../Utils/Libraries/CoreLibraries.php");
	include_once("../../Utils/Libraries/CrudLibraries.php");
	include_once("../../Utils/Libraries/AdministrationLibraries.php");
	include_once("../../Utils/Libraries/LoginLibraries.php");

	$responseDTO = new ResponseDTO();
	
	try 
	{
		$loginBLL = new LoginBLL();

		$requestJson = file_get_contents("php://input");
	    $requestDTO = json_decode($requestJson);

		$responseDTO = $loginBLL->ValidateUserIfExists($requestDTO);
	} 
	catch (Exception $e) 
	{
		$responseDTO->SetErrorAndStackTrace("Ocurrió un problema obteniendo los datos", $e->getMessage());		
	}

	echo json_encode($responseDTO);
?>