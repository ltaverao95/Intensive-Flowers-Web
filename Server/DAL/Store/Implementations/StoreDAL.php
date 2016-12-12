<?php 

    class StoreDAL implements ICommonServicesDAL
    {
        //##### Public Methods #####

        public function SaveItem($orderDTO)
        {
            $responseDTO = new ResponseDTO();

            try
            {
                $responseDTO = $this->SaveCurrentOrder($orderDTO);
            }
            catch (Exception $e)
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema durante el guardado de los datos", $e->getMessage());	
            }

            return $responseDTO;
        }

        public function GetAllItems()
        {
            $responseDTO = new ResponseDTO();
            
            try
            {
                $responseDTO = $this->GetOrders();   
            }
            catch (Exception $e)
            {
                $actionResultDTO->SetErrorAndStackTrace("Ocurrió un problema durante el guardado de los datos", $e->getMessage());	
            }

            return $responseDTO;
        }

        public function UpdateItemByID($orderDTO)
        {

        }

        public function DeleteAllItems($orderDTO)
        {

        }

        public function DeleteItemByID($orderDTO)
        {

        }
        
        public function DeleteItemsSelected($orderDTO)
        {

        }

        //##### Private Methods #####

        private function GetOrders()
        {
            try
            {
                $dataBaseServicesBLL = new DataBaseServicesBLL();

                $responseDTO = $dataBaseServicesBLL->InitializeDataBaseConnection();
                if($responseDTO->HasError)
                {
                    return $responseDTO;
                }

                $query = "SELECT * FROM bouquet_order ORDER BY id";
                $q = $dataBaseServicesBLL->connection->prepare($query);
                $q->execute();

                //Recuperar los registros de la BD
                $result = $q->fetchAll();	

                $ordersList = array();
                while ($row = array_shift($result)) 
                {
                    $storeDTO = new StoreDTO();

                    $storeDTO->Id = $row['id'];
                    $storeDTO->Name = $row['name'];
                    $storeDTO->Surname = $row['surname'];
                    $storeDTO->AddressToSend = $row['addressToSend'];
                    $storeDTO->Phone = $row['phone'];
                    $storeDTO->Email = $row['email'];
                    $storeDTO->OrderDescription = $row['orderDescription'];
                    $storeDTO->Store = $row['store'];
                    $storeDTO->WayToPay = $row['wayToPay'];
                    $storeDTO->DateOrder = $row['dateOrder'];
                    $storeDTO->DateToSend = $row['dateToSend'];
                    $storeDTO->TimeToSend = $row['timeToSend'];

                    array_push($ordersList, $storeDTO);
                };

                if($ordersList == null)
                {
                    $responseDTO->SetMessageError("No se encontraron registros para mostrar");
                    return $responseDTO;
                } 
                
                $responseDTO->ResponseData = $ordersList;

                $dataBaseServicesBLL->connection = null;
            }
            catch (Exception $e)
            {
                $actionResultDTO->SetErrorAndStackTrace("Ocurrió un problema durante la obtención de los datos", $e->getMessage());	
            }

            return $responseDTO;
        }

        private function SaveCurrentOrder($orderDTO)
        {
            try
            {
                $dataBaseServicesBLL = new DataBaseServicesBLL();

                $responseDTO = $dataBaseServicesBLL->InitializeDataBaseConnection();
                if($responseDTO->HasError)
                {
                    return $responseDTO;
                }

                $query = "INSERT INTO bouquet_order (id, name, surname, addressToSend, phone, email, orderDescription, store, wayToPay, dateOrder, dateToSend, timeToSend) VALUES (:id, :name, :surname, :addressToSend, :phone, :email, :orderDescription, :store, :wayToPay, :dateOrder, :dateToSend, :timeToSend)";
		        $q = $dataBaseServicesBLL->connection->prepare($query);
		        $q->execute(
                    array(':id' => NULL, 
				  		  ':name' =>$orderDTO->Name,
				  		  ':surname' =>$orderDTO->Surname,
				  		  ':addressToSend' =>$orderDTO->AddressToSend,
				  		  ':phone' =>$orderDTO->Phone,
				  		  ':email' =>$orderDTO->Email,
				  		  ':orderDescription' =>$orderDTO->OrderDescription,
				  		  ':store' =>$orderDTO->Store,
				  		  ':wayToPay' =>$orderDTO->WayToPay,
				  		  ':dateOrder' =>$orderDTO->DateOrder,
				  		  ':dateToSend' =>$orderDTO->DateToSend,
				  		  ':timeToSend' =>$orderDTO->TimeToSend));

        		$responseDTO->UIMessage = "Pedido enviado!";

                $dataBaseServicesBLL->connection = null;
            }
            catch (Exception $e)
            {
                $actionResultDTO->SetErrorAndStackTrace("Ocurrió un problema durante el guardado de los datos", $e->getMessage());	
            }

            return $responseDTO;
        }
    }

?>