<?php  
	
	include_once("../../Utils/Libraries/CoreLibraries.php");
	include_once("../../Utils/Libraries/CrudLibraries.php");
	include_once("../../Utils/Libraries/ContactLibraries.php");

	$responseDTO = new ResponseDTO();
	
	try 
	{
		$contactBLL = new ContactBLL();

        $requestJson = file_get_contents("php://input");
	    $requestDTO = json_decode($requestJson);

		$responseDTO = $contactBLL->DeleteItemsSelected($requestDTO);
	} 
	catch (Exception $e) 
	{
		$responseDTO->SetErrorAndStackTrace("Ocurrió un problema eliminando los datos", $e->getMessage());		
	}

	echo json_encode($responseDTO);
?>