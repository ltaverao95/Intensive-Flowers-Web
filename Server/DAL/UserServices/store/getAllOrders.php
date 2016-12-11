<?php  
	require('../../../DataBaseData/DbConnection/dataBaseInit.php');
	require('../../../DatabaseData/Headers/headers.php');
	require('../../../DataBaseData/Class/OrderClass.php');
	require('../../../DTO/ResponseDTO.php');

	$responseDTO = new ResponseDTO();

	try 
	{
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
			$responseDTO->Result = 1;
			$responseDTO->ResponseMessage = "No hay registros para mostrar";
		}
		else 
		{
			$responseDTO->Result = 0;
			$responseDTO->ObjData = $arrayOrders;
		}
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