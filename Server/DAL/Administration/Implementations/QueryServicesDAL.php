<?php 

    class QueryServicesDAL implements IAdministrationServicesDAL
    {
        //########## Public Methods

        public function SignIn($itemDTO)
        {
        }

        public function GetUserLoggedInfoByID($itemDTO)
        {
           
        }

        public function GetOrderByIdentityCard($itemDTO)
        {
            $responseDTO = new ResponseDTO();

            try
            {
                $responseDTO = $this->GetCurrentOrderByIdentityCard($itemDTO);
            }
            catch (Exception $e)
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema tratando de obtener los datos", $e->getMessage());
            }

            return $responseDTO;
        }

        public function GetOrderByName($itemDTO)
        {
            $responseDTO = new ResponseDTO();
            $queryServicesDAL = new QueryServicesDAL();

            try
            {
                $responseDTO = $this->GetCurrentOrderByName($itemDTO);
            }
            catch (Exception $e)
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema tratando de obtener los datos", $e->getMessage());
            }

            return $responseDTO;
        }

        public function GetOrderByDateAndStoreName($itemDTO)
        {
            $responseDTO = new ResponseDTO();

            try
            {
                $responseDTO = $this->GetCurrentOrderByDateAndStoreName($itemDTO);
            }
            catch (Exception $e)
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema tratando de obtener los datos", $e->getMessage());
            }

            return $responseDTO;
        }

        public function GetOrderByStoreName($itemDTO)
        {
            $responseDTO = new ResponseDTO();

            try
            {
                $responseDTO = $this->GetCurrentOrderByStoreName($itemDTO);
            }
            catch (Exception $e)
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema tratando de obtener los datos", $e->getMessage());
            }

            return $responseDTO;
        }

        //######### Private Methods

        private function GetCurrentOrderByIdentityCard($itemDTO)
        {
            $responseDTO = new ResponseDTO();
            $getDataServiceDAL = new GetDataServiceDAL();

            try
            {
                $dataBaseServicesBLL = new DataBaseServicesBLL();

                $query = "SELECT * FROM bouquet_order WHERE identity_card = :identity_card";
                $dataBaseServicesBLL->ArrayParameters = array(
                    ':identity_card' =>$itemDTO->IdentityCard
                );
                
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
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema tratando de obtener los datos", $e->getMessage());
            }

            return $responseDTO;
        }

        private function GetCurrentOrderByName($itemDTO)
        {
            $responseDTO = new ResponseDTO();
            $getDataServiceDAL = new GetDataServiceDAL();

            try
            {
                $dataBaseServicesBLL = new DataBaseServicesBLL();

                $query = "SELECT * FROM bouquet_order WHERE name = :name";
                $dataBaseServicesBLL->ArrayParameters = array(
                    ':name' =>$itemDTO->Name
                );
                
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
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema tratando de obtener los datos", $e->getMessage());
            }

            return $responseDTO;
        }

        private function GetCurrentOrderByDateAndStoreName($itemDTO)
        {
            $responseDTO = new ResponseDTO();
            $getDataServiceDAL = new GetDataServiceDAL();

            try
            {
                $dataBaseServicesBLL = new DataBaseServicesBLL();

                $query = "SELECT * FROM bouquet_order WHERE store = :store AND dateOrder = :dateOrder";
                $dataBaseServicesBLL->ArrayParameters = array(
                    ':store' => $itemDTO->Store,
                    ':dateOrder' => $itemDTO->DateOrder
                );
                
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
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema tratando de obtener los datos", $e->getMessage());
            }

            return $responseDTO;
        }

        private function GetCurrentOrderByStoreName($itemDTO)
        {
            $responseDTO = new ResponseDTO();
            $getDataServiceDAL = new GetDataServiceDAL();

            try
            {
                $dataBaseServicesBLL = new DataBaseServicesBLL();

                $query = "SELECT * FROM bouquet_order WHERE store = :store";
                $dataBaseServicesBLL->ArrayParameters = array(
                    ':store' => $itemDTO->Store
                );
                
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
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema tratando de obtener los datos", $e->getMessage());
            }

            return $responseDTO;
        }
    }
?>