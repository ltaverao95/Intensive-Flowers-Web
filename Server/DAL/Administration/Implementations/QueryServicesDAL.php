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

        //######### Private Methods

        private function GetCurrentOrderByIdentityCard($itemDTO)
        {
            $responseDTO = new ResponseDTO();

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

                $itemsList = array();
                while ($row = array_shift($result)) 
                {
                    $storeDTO = new StoreDTO();

                    $storeDTO->Id = $row['id'];
                    $storeDTO->IdentityCard = $row['identity_card'];
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

                    array_push($itemsList, $storeDTO);
                };

                if($itemsList == null)
                {
                    $responseDTO->SetError("No se encontraron registros para mostrar");
                    return $responseDTO;
                } 
                
                $responseDTO->ResponseData = $itemsList;
            }
            catch (Exception $e)
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema tratando de obtener los datos", $e->getMessage());
            }

            return $responseDTO;
        }
    }
?>