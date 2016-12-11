<?php  
	
	require('../../../DataBaseData/DbConnection/dataBaseInit.php');
	require('../../../DatabaseData/Headers/headers.php');
	require('../../../DTO/ResponseDTO.php');

	$jsonContact = file_get_contents("php://input");
	$objOrder = json_decode($jsonContact);
	$responseDTO = new ResponseDTO();

	try 
	{
		$query = "UPDATE `order` SET id = :id, name = :name, surname = :surname, addressToSend = :addressToSend, phone = :phone, email = :email, orderDescription = :orderDescription, store = :store, wayToPay = :wayToPay, dateOrder = :dateOrder, dateToSend = :dateToSend, timeToSend = :timeToSend WHERE id = :id";
		$q = $con->prepare($query);
		$q->execute(
			array(':id' => $objOrder->id, 
				  ':name' =>$objOrder->name,
				  ':surname'=>$objOrder->surname,
				  ':addressToSend'=>$objOrder->addressToSend,
				  ':phone'=>$objOrder->phone,
				  ':email' =>$objOrder->email,
				  ':orderDescription'=>$objOrder->orderDescription,
				  ':store' => $objOrder->store,
				  ':wayToPay' => $objOrder->wayToPay,
				  ':dateOrder' => $objOrder->dateOrder,
				  ':dateToSend' => $objOrder->dateToSend,
				  ':timeToSend' => $objOrder->timeToSend)
		);

		$responseDTO->Result = 0;
		$responseDTO->ResponseMessage = "Pedido Actualizado";
	} 
	catch (Exception $e) 
	{
		$responseDTO->Result = 1;
		$responseDTO->ResponseMessage = $e->getMessage();
	}

	echo json_encode($responseDTO);
	$con = null;
?>