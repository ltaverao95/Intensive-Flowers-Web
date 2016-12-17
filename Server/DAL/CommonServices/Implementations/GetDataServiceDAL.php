<?php 

    class GetDataServiceDAL implements IGetDataServiceDAL
    {
        //########## Public Methods

        public function GetMessageItems($itemDTO)
        {
            $responseDTO = new ResponseDTO();

            try
            {
                if($itemDTO == null)
                {
                    $responseDTO->SetError("No se encontraron resultados");
                    return $responseDTO;
                }

                $itemsList = array();
                while ($row = array_shift($itemDTO)) 
                {
                    $messageDTO = new MessageDTO();

                    $messageDTO->Id = $row['id'];
                    $messageDTO->Name = $row['name'];
                    $messageDTO->Message = $row['message'];

                    array_push($itemsList, $messageDTO);
                }

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

        public function GetOrderItems($itemDTO)
        {
            $responseDTO = new ResponseDTO();

            try
            {
                if($itemDTO == null)
                {
                    $responseDTO->SetError("No se encontraron resultados");
                    return $responseDTO;
                }

                $itemsList = array();
                while ($row = array_shift($itemDTO)) 
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
                }

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

        public function GetContactItems($itemDTO)
        {
            $responseDTO = new ResponseDTO();

            try
            {
                if($itemDTO == null)
                {
                    $responseDTO->SetError("No se encontraron resultados");
                    return $responseDTO;
                }

                $itemsList = array();
                while ($row = array_shift($itemDTO)) 
                {
                    $contactDTO = new ContactDTO();

                    $contactDTO->Id = $row['id'];
                    $contactDTO->Name = $row['name'];
                    $contactDTO->Email = $row['email'];
                    $contactDTO->Phone = $row['phone'];
                    $contactDTO->Message = $row['message'];

                    array_push($itemsList, $contactDTO);
                }

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

        public function GetLoggedUserItems($itemDTO)
        {
            $responseDTO = new ResponseDTO();

            try
            {
                if($itemDTO == null)
                {
                    $responseDTO->SetError("No se encontraron resultados");
                    return $responseDTO;
                }

                $itemsList = array();
                while ($row = array_shift($itemDTO)) 
                {
                    $loginDTO = new LoginDTO();
                    $loginDTO->UserAdminDTO = new UserAdminDTO();

                    $loginDTO->IDLoginUser = $row['id_login_user'];
                    $loginDTO->UserAdminDTO->IDLoginUser = $row['id_login_user'];
                    $loginDTO->UserAdminDTO->IdentityCard = $row['identity_card'];
                    $loginDTO->UserAdminDTO->Name = $row['name'];
                    $loginDTO->UserAdminDTO->Surname = $row['surname'];
                    $loginDTO->UserAdminDTO->Phone = $row['phone'];
                    $loginDTO->UserAdminDTO->Email = $row['email'];

                    array_push($itemsList, $loginDTO);
                }

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

        //######### Private Methods


    }
?>