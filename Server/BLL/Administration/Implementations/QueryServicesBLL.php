<?php 

    class QueryServicesBLL implements IAdministrationServicesBLL
    {
        //########## IAdministrationServicesBLL implementations

        public function SignIn($itemDTO)
        {
        }

        public function SignOut()
        {
        }

        public function GetUserLoggedInfoByID($itemDTO)
        {
            
        }

        public function UpdateUserLoggedInfoByID($itemDTO)
        {
            
        }

        public function GetOrderByIdentityCard($itemDTO)
        {
            $responseDTO = new ResponseDTO();
            $queryServicesDAL = new QueryServicesDAL();

            try
            {
                $responseDTO = $this->ValidateIdentityCard($itemDTO);
                if($responseDTO->HasError)
                {
                    return $responseDTO;
                }

                $responseDTO = $queryServicesDAL->GetOrderByIdentityCard($itemDTO);
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
                $responseDTO = $this->ValidateName($itemDTO);
                if($responseDTO->HasError)
                {
                    return $responseDTO;
                }

                $responseDTO = $queryServicesDAL->GetOrderByName($itemDTO);
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
            $queryServicesDAL = new QueryServicesDAL();

            try
            {
                $responseDTO = $this->ValidateDateAndStoreName($itemDTO);
                if($responseDTO->HasError)
                {
                    return $responseDTO;
                }

                $responseDTO = $queryServicesDAL->GetOrderByDateAndStoreName($itemDTO);
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
            $queryServicesDAL = new QueryServicesDAL();

            try
            {
                $responseDTO = $this->ValidateStoreName($itemDTO);
                if($responseDTO->HasError)
                {
                    return $responseDTO;
                }

                $responseDTO = $queryServicesDAL->GetOrderByStoreName($itemDTO);
            }
            catch (Exception $e)
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema tratando de obtener los datos", $e->getMessage());
            }

            return $responseDTO;
        }

        //##### Private Methods #####

        private function ValidateCurrentUser($itemDTO)
        {
            $responseDTO = new ResponseDTO();

            try
            {
                if($itemDTO->UserName == null)
                {
                    $responseDTO->SetError("El campo de usuario no puede estar vacío");
                    return $responseDTO;
                }

                if($itemDTO->Password == null)
                {
                    $responseDTO->SetError("El campo de contraseña no puede estar vacío");
                    return $responseDTO;
                }
            }
            catch (Exception $e)
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema mientras se validaban los datos", $e->getMessage());
            }

            return $responseDTO;
        }

        private function ValidateIdentityCard($itemDTO)
        {
            $responseDTO = new ResponseDTO();

            try
            {
                if($itemDTO->IdentityCard == null)
                {
                    $responseDTO->SetError("La cédula no puede estar vacía");
                    return $responseDTO;
                }   
            }
            catch (Exception $e)
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema tratando de obtener los datos", $e->getMessage());
            }

            return $responseDTO;
        }

        private function ValidateName($itemDTO)
        {
            $responseDTO = new ResponseDTO();

            try
            {
                if($itemDTO->Name == null)
                {
                    $responseDTO->SetError("El nombre no puede estar vacío");
                    return $responseDTO;
                }   
            }
            catch (Exception $e)
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema tratando de obtener los datos", $e->getMessage());
            }

            return $responseDTO;
        }

        private function ValidateDateAndStoreName($itemDTO)
        {
            $responseDTO = new ResponseDTO();

            try
            {
                if($itemDTO->DateOrder == null)
                {
                    $responseDTO->SetError("La fecha no puede estar vacía");
                    return $responseDTO;
                }

                if($itemDTO->Store == null)
                {
                    $responseDTO->SetError("La tienda no puede estar vacía");
                    return $responseDTO;
                }   
            }
            catch (Exception $e)
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema tratando de obtener los datos", $e->getMessage());
            }

            return $responseDTO;
        }

        private function ValidateStoreName($itemDTO)
        {
            $responseDTO = new ResponseDTO();

            try
            {
                if($itemDTO->Store === null)
                {
                    $responseDTO->SetError("La tienda no puede estar vacía");
                    return $responseDTO;
                }   
            }
            catch (Exception $e)
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema tratando de obtener los datos", $e->getMessage());
            }

            return $responseDTO;
        }
    }

?>