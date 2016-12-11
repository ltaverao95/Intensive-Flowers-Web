<?php  
	
	require('../../../DataBaseData/DbConnection/dataBaseInit.php');
	require('../../../DatabaseData/Headers/headers.php');
	require('../../../DTO/ResponseDTO.php');

	$responseDTO = new ResponseDTO();

	try {

		$query = "DELETE FROM `order`";
		$q = $con->prepare($query);
		$q->execute();

		$query = "ALTER TABLE `order` AUTO_INCREMENT = 1";
		$q = $con->prepare($query);
		$q->execute();

		$responseDTO->Result = 0;
		$responseDTO->ResponseMessage = "Todos los registros fueron eliminados";
	} 
	catch (Exception $e) 
	{
		$responseDTO->Result = 1;
		$responseDTO->ResponseMessage = "Ha ocurrido un problema durante el proceso";
		$responseDTO->StackTrace = $e->getMessage();
	}

	echo json_encode($responseDTO);
	$con = null;
?>