<?php  
	require('../../../DataBaseData/DbConnection/dataBaseInit.php');
	require('../../../DatabaseData/Headers/headers.php');
	require('../../../DTO/ResponseDTO.php');

	$deleteOrder = file_get_contents("php://input");
	$objToDelete = json_decode($deleteOrder);
	$responseDTO = new ResponseDTO();

	try 
	{
		$query = "DELETE FROM `order` WHERE id = :id";
		$q = $con->prepare($query);
		$q->execute(array(':id' => $objToDelete->id));

		$query = "SELECT * FROM `order` ORDER BY id";
		$q = $con->prepare($query);
		$q->execute();
		
		$result = $q->fetchAll();	

		$arrayOrders = array();
		while ($row = array_shift($result)) {
			$orderObj = new Order();

			$orderObj->id = $row['id'];
			$orderObj->name = $row['name'];
			$orderObj->surname = $row['surname'];
			$orderObj->addressToSend = $row['addressToSend'];
			$orderObj->phone = $row['phone'];
			$orderObj->email = $row['email'];
			$orderObj->orderDescription = $row['orderDescription'];
			$orderObj->store = $row['store'];
			$orderObj->wayToPay = $row['wayToPay'];
			$orderObj->dateOrder = $row['dateOrder'];
			$orderObj->dateToSend = $row['dateToSend'];
			$orderObj->timeToSend = $row['timeToSend'];

			array_push($arrayOrders, $orderObj);
		};

		if($arrayOrders == NULL)
		{
			$query = "ALTER TABLE `order` AUTO_INCREMENT = 1";
			$q = $con->prepare($query);
			$q->execute();
		}

		$responseDTO->Result = 0;
		$responseDTO->ResponseMessage = "Pedido Eliminado";	
	} 
	catch (Exception $e) 
	{
		$responseDTO->Result = 1;
		$responseDTO->ResponseMessage = $e->getMessage();
	}

	echo json_encode($responseDTO);
	$con = null;
?>