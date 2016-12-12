<?php  
	
	include_once("../../Utils/Libraries/CoreLibraries.php");
	include_once("../../Utils/Libraries/ContactLibraries.php");

	$responseDTO = new ResponseDTO();
	
	try 
	{
		$contactBLL = new ContactBLL();

		$responseDTO = $contactBLL->GetAllItems();
	} 
	catch (Exception $e) 
	{
		$responseDTO->SetErrorAndStackTrace("Ocurrió un problema obteniendo los datos", $e->getMessage());		
	}

	echo json_encode($responseDTO);
?>