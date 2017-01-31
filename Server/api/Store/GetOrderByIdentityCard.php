<?php  
	
	include_once("../../Utils/Libraries/CoreLibraries.php");
	include_once("../../Utils/Libraries/AdministrationLibraries.php");
	include_once("../../DTO/StoreDTO.php");

	$responseDTO = new ResponseDTO();
	
	try 
	{
		$queryServicesBLL = new QueryServicesBLL();

		$requestJson = file_get_contents("php://input");
	    $requestDTO = json_decode($requestJson);

		$responseDTO = $queryServicesBLL->GetOrderByIdentityCard($requestDTO);
	} 
	catch (Exception $e) 
	{
		$responseDTO->SetErrorAndStackTrace("Ocurrió un problema obteniendo los datos", $e->getMessage());		
	}

	echo json_encode($responseDTO);
?>