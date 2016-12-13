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
            $responseDTO = new ResponseDTO();
            
            try
            {
                   
            }
            catch (Exception $e)
            {
                $actionResultDTO->SetErrorAndStackTrace("Ocurrió un problema durante el guardado de los datos", $e->getMessage());	
            }

            return $responseDTO;
        }

        public function DeleteAllItems()
        {
            $responseDTO = new ResponseDTO();
            
            try
            {
                   $responseDTO = $this->DeleteCurrentItems();
            }
            catch (Exception $e)
            {
                $actionResultDTO->SetErrorAndStackTrace("Ocurrió un problema durante el guardado de los datos", $e->getMessage());	
            }

            return $responseDTO;
        }

        public function DeleteItemByID($orderDTO)
        {
            $responseDTO = new ResponseDTO();
            
            try
            {
                   
            }
            catch (Exception $e)
            {
                $actionResultDTO->SetErrorAndStackTrace("Ocurrió un problema durante el guardado de los datos", $e->getMessage());	
            }

            return $responseDTO;
        }
        
        public function DeleteItemsSelected($orderDTO)
        {
            $responseDTO = new ResponseDTO();
            
            try
            {
                   
            }
            catch (Exception $e)
            {
                $actionResultDTO->SetErrorAndStackTrace("Ocurrió un problema durante el guardado de los datos", $e->getMessage());	
            }

            return $responseDTO;
        }

        //##### Private Methods #####

        private function GetOrders()
        {
            $responseDTO = new ResponseDTO();

            try
            {
                $dataBaseServicesBLL = new DataBaseServicesBLL();
                $getDataServiceDAL = new GetDataServiceDAL();

                $query = "SELECT * FROM bouquet_order ORDER BY id";
                $responseDTO = $dataBaseServicesBLL->ExecuteQuery($query);
                if($responseDTO->HasError)
                {
                    return $responseDTO;
                }

                //Recuperar los registros de la BD
                $result = $dataBaseServicesBLL->Q->fetchAll();	

                $responseDTO = $getDataServiceDAL->GetOrderItems($result);

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
            $responseDTO = new ResponseDTO();
            
            try
            {
                $dataBaseServicesBLL = new DataBaseServicesBLL();

                $query = "INSERT INTO bouquet_order (id, identity_card, name, surname, addressToSend, phone, email, orderDescription, store, wayToPay, dateOrder, dateToSend, timeToSend) VALUES (:id, :identity_card, :name, :surname, :addressToSend, :phone, :email, :orderDescription, :store, :wayToPay, :dateOrder, :dateToSend, :timeToSend)";
                $dataBaseServicesBLL->ArrayParameters = array(
                    ':id' => NULL, 
                    ':identity_card' => $orderDTO->IdentityCard,
                    ':name' => $orderDTO->Name,
                    ':surname' => $orderDTO->Surname,
                    ':addressToSend' => $orderDTO->AddressToSend,
                    ':phone' => $orderDTO->Phone,
                    ':email' => $orderDTO->Email,
                    ':orderDescription' => $orderDTO->OrderDescription,
                    ':store' => $orderDTO->Store,
                    ':wayToPay' => $orderDTO->WayToPay,
                    ':dateOrder' => $orderDTO->DateOrder,
                    ':dateToSend' => $orderDTO->DateToSend,
                    ':timeToSend' => $orderDTO->TimeToSend
                );

                $responseDTO = $dataBaseServicesBLL->ExecuteQuery($query);
                if($responseDTO->HasError)
                {
                    return $responseDTO;
                }

        		$responseDTO->UIMessage = "Pedido enviado!";

                $dataBaseServicesBLL->connection = null;
            }
            catch (Exception $e)
            {
                $actionResultDTO->SetErrorAndStackTrace("Ocurrió un problema durante el guardado de los datos", $e->getMessage());	
            }

            return $responseDTO;
        }

        private function DeleteCurrentItems()
        {
            $responseDTO = new ResponseDTO();

            try
            {
                $dataBaseServicesBLL = new DataBaseServicesBLL();
                $getDataServiceDAL = new GetDataServiceDAL();

                $query = "Truncate table bouquet_order";
                $responseDTO = $dataBaseServicesBLL->ExecuteQuery($query);
                if($responseDTO->HasError)
                {
                    return $responseDTO;
                }

        		$responseDTO->UIMessage = "Registros eliminados!";

                $dataBaseServicesBLL->connection = null;
            }
            catch (Exception $e)
            {
                $actionResultDTO->SetErrorAndStackTrace("Ocurrió un problema durante la obtención de los datos", $e->getMessage());	
            }

            return $responseDTO;
        }
    }

?>