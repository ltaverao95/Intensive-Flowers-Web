<?php  
	
	include_once("../../Utils/Libraries/CoreLibraries.php");
	include_once("../../Utils/Libraries/AdministrationLibraries.php");
	include_once("../../Utils/Libraries/LoginLibraries.php");

	$responseDTO = new ResponseDTO();
	
	try 
	{
		$loginBLL = new LoginBLL();

		$requestJson = file_get_contents("php://input");
	    $requestDTO = json_decode($requestJson);

		$responseDTO = $loginBLL->UpdateUserLoggedInfoByID($requestDTO);
	} 
	catch (Exception $e) 
	{
		$responseDTO->SetErrorAndStackTrace("Ocurrió un problema actualizando los datos", $e->getMessage());		
	}

	echo json_encode($responseDTO);
?>