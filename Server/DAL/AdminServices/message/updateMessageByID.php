<?php  
	
	require('../../../DataBaseData/DbConnection/dataBaseInit.php');
	require('../../../DatabaseData/Headers/headers.php');
	require('../../../DTO/ResponseDTO.php');

	$jsonMessage = file_get_contents("php://input");
	$ogjMessage = json_decode($jsonMessage);
	$responseDTO = new ResponseDTO();

	try 
	{
		$query = "UPDATE message SET id = :id, name = :name, message = :message WHERE id = :id";
		$q = $con->prepare($query);
		$q->execute(
			array(':id' => $ogjMessage->id, 
				  ':name' =>$ogjMessage->name,
				  ':message'=>$ogjMessage->message)
		);

		$responseDTO->Result = 0;
		$responseDTO->ResponseMessage = "Mensaje Actualizado";
	} 
	catch (Exception $e) 
	{
		$responseDTO->Result = 1;
		$responseDTO->ResponseMessage = $e->getMessage();
	}

	echo json_encode($responseDTO);
	$con = null;
?>