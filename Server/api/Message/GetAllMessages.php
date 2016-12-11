<?php  
	
	include_once("../../BLL/DataBaseServices/Interfaces/IDataBaseServicesBLL.php");
	include_once("../../BLL/Message/Interfaces/IMessageBLL.php");
	include_once("../../DAL/Message/Interfaces/IMessageDAL.php");
	include_once("../../BLL/DataBaseServices/Implementations/DataBaseServicesBLL.php");
	include_once("../../BLL/Message/Implementations/MessageBLL.php");
	include_once("../../DAL/Message/Implementations/MessageDAL.php");

	include_once("../../Utils/ResponseDTO/ResponseDTO.php");
	include_once("../../DTO/MessageDTO.php");

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