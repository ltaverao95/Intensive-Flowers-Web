<?php  
	
	include_once('../../../BLL/MessageBLL.php');
	include_once('../../../DTO/ActionResultDTO/ActionResultDTO.php');

	$actionResultDTO = new ActionResultDTO();
	
	try 
	{
        $requestJson = file_get_contents("php://input");
	    $requestDTO = json_decode($requestJson);

		$messageBLL = new MessageBLL();

		$responseDTO = $messageBLL->SaveMessage($requestDTO);
	} 
	catch (Exception $e) 
	{
		$actionResultDTO->SetErrorAndStackTrace("Ocurrió un problema durante el guardado de los datos", $e->getMessage());		
	}

	echo json_encode($actionResultDTO);
?>