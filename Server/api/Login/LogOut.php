<?php  
	
	include_once("../../Utils/Libraries/CoreLibraries.php");
	include_once("../../Utils/Libraries/AdministrationLibraries.php");
	include_once("../../Utils/Libraries/LoginLibraries.php");

	$responseDTO = new ResponseDTO();
	
	try 
	{
		$loginBLL = new LoginBLL();

		$responseDTO = $loginBLL->SignOut();
	} 
	catch (Exception $e) 
	{
		$responseDTO->SetErrorAndStackTrace("Ocurrió un problema obteniendo los datos", $e->getMessage());		
	}

	echo json_encode($responseDTO);
?>