<?php  
	
	include_once("../../Utils/Libraries/CoreLibraries.php");
	include_once("../../Utils/Libraries/CrudLibraries.php");
	include_once("../../Utils/Libraries/StoreLibraries.php");

	$responseDTO = new ResponseDTO();
	
	try 
	{
		$storeBLL = new StoreBLL();

		$requestJson = file_get_contents("php://input");
	    $requestDTO = json_decode($requestJson);

		$responseDTO = $storeBLL->SaveItem($requestDTO);   
	} 
	catch (Exception $e) 
	{
		$responseDTO->SetErrorAndStackTrace("Ocurrió un problema guardando los datos", $e->getMessage());		
	}

	echo json_encode($responseDTO);
?>