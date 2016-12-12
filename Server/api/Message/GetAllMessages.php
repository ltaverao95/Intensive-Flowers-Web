<?php  
	
	include_once("../../Utils/Libraries/CoreLibraries.php");
	include_once("../../Utils/Libraries/CrudLibraries.php");
	include_once("../../Utils/Libraries/MessageLibraries.php");

	$responseDTO = new ResponseDTO();
	
	try 
	{
		$messageBLL = new MessageBLL();

		$responseDTO = $messageBLL->GetAllItems();
	} 
	catch (Exception $e) 
	{
		$responseDTO->SetErrorAndStackTrace("Ocurrió un problema obteniendo los datos", $e->getMessage());		
	}

	echo json_encode($responseDTO);
?>