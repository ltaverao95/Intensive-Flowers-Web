<?php  
	
	include_once("../../Utils/Libraries/CoreLibraries.php");

	$responseDTO = new ResponseDTO();
	
	try 
	{
		$messageBLL = new MessageBLL();

		$responseDTO = $messageBLL->GetAllMessages();
	} 
	catch (Exception $e) 
	{
		$responseDTO->SetErrorAndStackTrace("Ocurrió un problema obteniendo los datos", $e->getMessage());		
	}

	echo json_encode($responseDTO);
?>