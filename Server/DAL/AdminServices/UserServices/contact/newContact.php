<?php
	require('../../../DataBaseData/DbConnection/dataBaseInit.php');
	require('../../../DatabaseData/Headers/headers.php');
	require('../../../DTO/ResponseDTO.php');

	$jsonContact = file_get_contents("php://input");
	$objcontact = json_decode($jsonContact);
	$responseDTO = new ResponseDTO();

	try 
	{
		$query = "INSERT INTO contact (id, name, email, phone, message) VALUES (:id, :name, :email, :phone, :message)";
		$q = $con->prepare($query);
		$q->execute(
			array(':id' => NULL, 
				  ':name' =>$objcontact->name,
				  ':email' =>$objcontact->email,
				  ':phone'=>$objcontact->phone,
				  ':message'=>$objcontact->message)
		);

		/*$from = "lftavera@hotmail.com";
		$subject = "Contacto INTENSIVE FLOWERS";

		$message = "
			Nombre: ".$objcontact->name."
			Email: ".$objcontact->email."
			Celular: ".$objcontact->phone."
			Mensaje: ".$objcontact->message."
		";
		$header = "From: Intensive Flowers <intensiveflowers@intensiveflowers.com>";
		mail($from, $subject, $message, $header);*/

		$responseDTO->Result = 0;
		$responseDTO->ResponseMessage = "Contacto Enviado";
	} 
	catch (Exception $e) 
	{
		$responseDTO->Result = 1;
		$responseDTO->ResponseMessage = $e->getMessage();
	}

	echo json_encode($responseDTO);
	$con = null;
	
?>