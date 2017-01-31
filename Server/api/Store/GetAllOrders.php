<?php  
	
	include_once("../../Utils/Libraries/CoreLibraries.php");
	include_once("../../Utils/Libraries/CrudLibraries.php");
	include_once("../../Utils/Libraries/StoreLibraries.php");

	$responseDTO = new ResponseDTO();
	
	try 
	{
		$storeBLL = new StoreBLL();

		$responseDTO = $storeBLL->GetAllItems();
	} 
	catch (Exception $e) 
	{
		$responseDTO->SetErrorAndStackTrace("Ocurrió un problema obteniendo los datos", $e->getMessage());		
	}

	echo json_encode($responseDTO);
?>