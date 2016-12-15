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
                   $responseDTO = $this->UpdateCurrentItem($orderDTO);
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
                   $responseDTO = $this->DeteleCurrentOrder($orderDTO);
                   if($responseDTO->HasError)
                {
                    return $responseDTO;
                }

                $responseDTO = $this->ValidateLastRecordToResetAutoIncement();
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
                $responseDTO = $this->DeleteCurrentItemsSelected($orderDTO);      
                if($responseDTO->HasError)
                {
                    return $responseDTO;
                }

                $responseDTO = $this->ValidateLastRecordToResetAutoIncement();
                if($responseDTO->HasError)
                {
                    return $responseDTO;
                }

                if(count($orderDTO) > 1)
                {
                    $responseDTO->UIMessage = "Registros eliminados!";
                }
                else
                {
                    $responseDTO->UIMessage = "Registro eliminado!";
                }
            }
            catch (Exception $e)
            {
                $actionResultDTO->SetErrorAndStackTrace("Ocurrió un problema mientras se eliminaban los datos", $e->getMessage());	
            }

            return $responseDTO;
        }

        public function ValidateLastRecordToResetAutoIncement()
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
                if($result == null)
                {
                    $query = "ALTER TABLE bouquet_order AUTO_INCREMENT = 1";

                    $responseDTO = $dataBaseServicesBLL->ExecuteQuery($query);
                    if($responseDTO->HasError)
                    {
                        return $responseDTO;
                    }
                } 
            }
            catch (Exception $e)
            {
                $responseDTO->SetMessageErrorAndStackTrace("Ocurrió un error tratando de validar los registros", $e->getMessage());
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

        private function DeleteCurrentItemsSelected($ordersDTO)
        {
            $responseDTO = new ResponseDTO();

            try
            {
                $dataBaseServicesBLL = new DataBaseServicesBLL();
                $getDataServiceDAL = new GetDataServiceDAL();

                for ($i=0; $i < count($ordersDTO); $i++) 
                {
                    $query = "DELETE FROM bouquet_order WHERE id = :id";
                    $dataBaseServicesBLL->ArrayParameters = array(
                        ':id' => $ordersDTO[$i]->Id
                    );

                    $responseDTO = $dataBaseServicesBLL->ExecuteQuery($query);
                    if($responseDTO->HasError)
                    {
                        return $responseDTO;
                    }
                }

                $dataBaseServicesBLL->connection = null;
            }
            catch (Exception $e)
            {
                $actionResultDTO->SetErrorAndStackTrace("Ocurrió un problema mientras se eliminaban los datos", $e->getMessage());	
            }

            return $responseDTO;
        }

        private function DeteleCurrentOrder($orderDTO)
        {
            $responseDTO = new ResponseDTO();

            try
            {
                $dataBaseServicesBLL = new DataBaseServicesBLL();
                $getDataServiceDAL = new GetDataServiceDAL();

                $query = "DELETE FROM bouquet_order WHERE id = :id";
                $dataBaseServicesBLL->ArrayParameters = array(
                    ':id' => $orderDTO->Id
                );

                $responseDTO = $dataBaseServicesBLL->ExecuteQuery($query);
                if($responseDTO->HasError)
                {
                    return $responseDTO;
                }

        		$responseDTO->UIMessage = "Registro eliminado!";

                $dataBaseServicesBLL->connection = null;
            }
            catch (Exception $e)
            {
                $actionResultDTO->SetErrorAndStackTrace("Ocurrió un problema mientras se eliminaban de los datos", $e->getMessage());
            }

            return $responseDTO;
        }

        private function UpdateCurrentItem($orderDTO)
        {
            $responseDTO = new ResponseDTO();

            try
            {
                $dataBaseServicesBLL = new DataBaseServicesBLL();
                $getDataServiceDAL = new GetDataServiceDAL();

                $query = "UPDATE bouquet_order SET id = :id, identity_card = :identity_card, name = :name, surname = :surname, addressToSend = :addressToSend, phone = :phone, email = :email, orderDescription = :orderDescription, store = :store, wayToPay = :wayToPay, dateOrder = :dateOrder, dateToSend = :dateToSend, timeToSend = :timeToSend WHERE id = :id";
                $dataBaseServicesBLL->ArrayParameters = array(
                    ':id' => $orderDTO->Id, 
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

                $responseDTO->UIMessage = "Registro actualizado!";

                $dataBaseServicesBLL->connection = null;
            }
            catch (Exception $e)
            {
                $actionResultDTO->SetErrorAndStackTrace("Ocurrió un problema mientras se eliminaban de los datos", $e->getMessage());
            }

            return $responseDTO;
        }
    }

?>