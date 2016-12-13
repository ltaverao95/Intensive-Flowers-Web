<?php 

    class QueryServicesDAL implements IAdministrationServicesDAL
    {
        //########## Public Methods

        public function SignIn($itemDTO)
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

        }

        public function GetOrderByDateAndStoreName($itemDTO)
        {
            $responseDTO = new ResponseDTO();

            try
            {
                
            }
            catch (Exception $e)
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema tratando de obtener los datos", $e->getMessage());
            }

            return $responseDTO;
        }

        public function GetOrderByStoreName($itemDTO)
        {

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

    }
?>