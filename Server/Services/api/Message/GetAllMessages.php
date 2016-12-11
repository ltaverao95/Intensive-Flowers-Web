<?php  
	
	include_once('../../../BLL/MessageBLL.php');
	include_once('../../../DTO/ActionResultDTO/ActionResultDTO.php');

	$actionResultDTO = new ActionResultDTO();
	
	try 
	{
		$messageBLL = new MessageBLL();

		$responseDTO = $messageBLL->GetAllMessages();
	} 
	catch (Exception $e) 
	{
		$actionResultDTO->SetErrorAndStackTrace("Ocurrió un problema durante el guardado de los datos", $e->getMessage());		
	}

	echo json_encode($actionResultDTO);
?>