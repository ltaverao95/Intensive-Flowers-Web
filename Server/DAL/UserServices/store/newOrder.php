<?php
	require('../../../DataBaseData/DbConnection/dataBaseInit.php');
	require('../../../DatabaseData/Headers/headers.php');
	require('../../../DTO/ResponseDTO.php');

	$jsonOrder = file_get_contents("php://input");
	$objOrder = json_decode($jsonOrder);
	$responseDTO = new ResponseDTO();

	try 
	{
		$query = "INSERT INTO `order` (id, name, surname, addressToSend, phone, email, orderDescription, store, wayToPay, dateOrder, dateToSend, timeToSend) VALUES (:id, :name, :surname, :addressToSend, :phone, :email, :orderDescription, :store, :wayToPay, :dateOrder, :dateToSend, :timeToSend);";

		$q = $con->prepare($query);
		$q->execute(array(':id' => NULL, 
				  		  ':name' =>$objOrder->name,
				  		  ':surname' =>$objOrder->surname,
				  		  ':addressToSend' =>$objOrder->addressToSend,
				  		  ':phone' =>$objOrder->phone,
				  		  ':email' =>$objOrder->email,
				  		  ':orderDescription' =>$objOrder->orderDescription,
				  		  ':store' =>$objOrder->store,
				  		  ':wayToPay' =>$objOrder->wayToPay,
				  		  ':dateOrder' =>$objOrder->dateOrder,
				  		  ':dateToSend' =>$objOrder->dateToSend,
				  		  ':timeToSend' =>$objOrder->timeToSend));

		/*$to = $objOrder->email;
		$subject = "Pedidos INTENSIVE FLOWERS";

		$message = "Hola ". $objOrder->name . ", hemos recibido tu solicitud, en poco tiempo nos estaremos contactando contigo para finalizar la compra de tu pedido.";
		$header = "From: Intensive Flowers <intensiveflowers@intensiveflowers.com>";
		mail($to, $subject, $message, $header);*/

		$responseDTO->Result = 0;
		$responseDTO->ResponseMessage = "Pedido Enviado";
	} 
	catch (Exception $e) 
	{
		$responseDTO->Result = 1;
		$responseDTO->ResponseMessage = "A ocurrido un problema durante el proceso";
		$responseDTO->$StackTrace = $e->getMessage();
	}

	echo json_encode($responseDTO);
	$con = null;
?>