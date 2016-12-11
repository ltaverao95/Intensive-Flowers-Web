<?php  
	
	require('../../../DataBaseData/DbConnection/dataBaseInit.php');
	require('../../../DatabaseData/Headers/headers.php');
	require('../../../DTO/ResponseDTO.php');

	$jsonContact = file_get_contents("php://input");
	$objcontact = json_decode($jsonContact);
	$responseDTO = new ResponseDTO();

	try 
	{
		$query = "UPDATE contact SET id = :id, name = :name, email = :email, phone = :phone, message = :message WHERE id = :id";
		$q = $con->prepare($query);
		$q->execute(
			array(':id' => $objcontact->id, 
				  ':name' =>$objcontact->name,
				  ':email' =>$objcontact->email,
				  ':phone'=>$objcontact->phone,
				  ':message'=>$objcontact->message)
		);

		$responseDTO->Result = 0;
		$responseDTO->ResponseMessage = "Contacto Actualizado";
	} 
	catch (Exception $e) 
	{
		$responseDTO->Result = 1;
		$responseDTO->ResponseMessage = $e->getMessage();
	}

	echo json_encode($responseDTO);
	$con = null;
?>