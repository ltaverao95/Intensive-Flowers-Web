<?php  
	
	include_once("../../Utils/Libraries/CoreLibraries.php");
	include_once("../../Utils/Libraries/CrudLibraries.php");
	include_once("../../Utils/Libraries/MessageLibraries.php");

	$responseDTO = new ResponseDTO();
	
	try 
	{
		$messageBLL = new MessageBLL();

		$requestJson = file_get_contents("php://input");
	    $requestDTO = json_decode($requestJson);

		$responseDTO = $messageBLL->SaveItem($requestDTO);
	} 
	catch (Exception $e) 
	{
		$responseDTO->SetErrorAndStackTrace("Ocurrió un problema guardando los datos", $e->getMessage());		
	}

	echo json_encode($responseDTO);
?>