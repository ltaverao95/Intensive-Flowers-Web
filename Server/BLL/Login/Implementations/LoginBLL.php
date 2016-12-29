<?php 

    class LoginBLL implements IAdministrationServicesBLL, ICommonServicesBLL
    {
        //##### IAdministrationServicesBLL implementations #####

        public function SignIn($itemDTO)
        {
            $responseDTO = new ResponseDTO();
            $loginDAL = new LoginDAL();

            try
            {
                $responseDTO = $this->ValidateCurrentUser($itemDTO);
                if($responseDTO->HasError)
                {
                    return $responseDTO;
                }

                $responseDTO = $loginDAL->SignIn($itemDTO);
            }
            catch (Exception $e)
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema durante la verificación de los datos", $e->getMessage());
            }

            return $responseDTO;
        }

        public function SignOut()
        {
            $responseDTO = new ResponseDTO();

            try
            {
                session_start();
                session_destroy();

                $responseDTO->UIMessage = "Sesión Finalizada con éxito!";
            }
            catch (Exception $e)
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema durante la verificación de los datos", $e->getMessage());
            }

            return $responseDTO;
        }

        public function UpdateUserPassword($itemDTO)
        {
            $responseDTO = new ResponseDTO();
            $loginDAL = new LoginDAL();

            try
            {
                $responseDTO = $this->ValidatePassword($itemDTO);
                if($responseDTO->HasError)
                {
                    return $responseDTO;
                }

                $responseDTO = $loginDAL->UpdateUserPassword($itemDTO);
            }
            catch (Exception $e)
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema durante la verificación de los datos", $e->getMessage());
            }

            return $responseDTO;
        }

        public function ValidateUserIfExists($itemDTO)
        {
            $responseDTO = new ResponseDTO();
            $loginDAL = new LoginDAL();

            try
            {
                $responseDTO = $this->ValidateUserName($itemDTO);
                if($responseDTO->HasError)
                {
                    return $responseDTO;
                }

                $responseDTO = $loginDAL->ValidateUserIfExists($itemDTO);
            }
            catch (Exception $e)
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema durante la verificación de los datos", $e->getMessage());
            }

            return $responseDTO;
        }

        public function GetOrderByIdentityCard($itemDTO)
        {
            
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

        //##### ICommonServicesBLL implementations #####

        public function SaveItem($itemDTO)
        {
            $responseDTO = new ResponseDTO();
            $loginDAL = new LoginDAL();

            try
            {
                $responseDTO = $this->ValidateCompleteUser($itemDTO);
                if($responseDTO->HasError)
                {
                    return $responseDTO;
                }

                $responseDTO = $loginDAL->SaveItem($itemDTO);
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
                $loginDAL = new LoginDAL();

                $responseDTO = $loginDAL->GetAllItems();
            }
            catch (Exception $e)
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema durante el guardado de los datos", $e->getMessage());	
            }

            return $responseDTO;
        }

        public function GetItemByID($itemDTO)
        {
            $responseDTO = new ResponseDTO();
            $loginDAL = new LoginDAL();

            try
            {
                $responseDTO = $this->ValidateCurrentUserID($itemDTO);
                if($responseDTO->HasError)
                {
                    return $responseDTO;
                }

                $responseDTO = $loginDAL->GetItemByID($itemDTO);
            }
            catch (Exception $e)
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema durante la verificación de los datos", $e->getMessage());
            }

            return $responseDTO;
        }

        public function UpdateItemByID($itemDTO)
        {
            $responseDTO = new ResponseDTO();
            $loginDAL = new LoginDAL();

            try
            {
                $responseDTO = $this->ValidateLoginDTO($itemDTO);
                if($responseDTO->HasError)
                {
                    return $responseDTO;
                }

                $responseDTO = $loginDAL->UpdateItemByID($itemDTO);
            }
            catch (Exception $e)
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema durante la verificación de los datos", $e->getMessage());
            }

            return $responseDTO;
        }

        public function DeleteAllItems()
        {

        }

        public function DeleteItemByID($itemDTO)
        {
            $responseDTO = new ResponseDTO();

            try
            {
                $loginDAL = new LoginDAL();

                $responseDTO = $this->ValidateCurrentUserID($itemDTO);
                if($responseDTO->HasError)
                {
                    return $responseDTO;
                }

                $responseDTO = $loginDAL->DeleteItemByID($itemDTO);
            }
            catch (Exception $e)
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema mientras se eliminaban los datos", $e->getMessage());	
            }

            return $responseDTO;
        }

        public function DeleteItemsSelected($itemDTO)
        {
            
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

        private function ValidateCurrentUserID($itemDTO)
        {
            $responseDTO = new ResponseDTO();

            try
            {
                if($itemDTO->IDLoginUser == null)
                {
                    $responseDTO->SetError("El id no puede estar vacío");
                    return $responseDTO;
                }
            }
            catch (Exception $e)
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema mientras se validaban los datos", $e->getMessage());
            }

            return $responseDTO;
        }

        private function ValidateLoginDTO($itemDTO)
        {
            $responseDTO = new ResponseDTO();

            try
            {
                if($itemDTO->UserAdminModel->IdentityCard == null)
                {
                    $responseDTO->SetError("La cédula no puede estar vacía");
                    return $responseDTO;
                }

                if($itemDTO->UserAdminModel->Name == null)
                {
                    $responseDTO->SetError("El nombre de usuario no puede estar vacío");
                    return $responseDTO;
                }

                if($itemDTO->UserAdminModel->Surname == null)
                {
                    $responseDTO->SetError("El apellido no puede estar vacío");
                    return $responseDTO;
                }

                if($itemDTO->UserAdminModel->Phone == null)
                {
                    $responseDTO->SetError("El teléfono no puede estar vacío");
                    return $responseDTO;
                }

                if($itemDTO->UserAdminModel->Email == null)
                {
                    $responseDTO->SetError("El correo electrónico no puede estar vacío");
                    return $responseDTO;
                }
            }
            catch (Exception $e)
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema mientras se validaban los datos", $e->getMessage());
            }

            return $responseDTO;
        }

        private function ValidateCompleteUser($itemDTO)
        {
            try
            {
                $responseDTO = $this->ValidateCurrentUser($itemDTO);
                if($responseDTO->HasError)
                {
                    return $responseDTO;
                }

                if($itemDTO->UserRole == null)
                {
                    $responseDTO->SetError("No se ha definido el rol del usuario");
                    return $responseDTO;
                }

                $responseDTO = $this->ValidateLoginDTO($itemDTO);
                if($responseDTO->HasError)
                {
                    return $responseDTO;
                }
            }
            catch (Exception $e)
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema mientras se validaban los datos", $e->getMessage());
            }

            return $responseDTO;
        }

        private function ValidateUserName($itemDTO)
        {
            $responseDTO = new ResponseDTO();

            try
            {
                if($itemDTO->UserName == null)
                {
                    $responseDTO->SetError("El campo de usuario no puede estar vacío");
                    return $responseDTO;
                }
            }
            catch (Exception $e)
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema mientras se validaban los datos", $e->getMessage());
            }

            return $responseDTO;
        }

        private function ValidatePassword($itemDTO)
        {
            $responseDTO = new ResponseDTO();

            try
            {
                if($itemDTO->Password == null)
                {
                    $responseDTO->SetError("La contraseña no puede estar vacía");
                    return $responseDTO;
                }
            }
            catch (Exception $e)
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema mientras se validaban los datos", $e->getMessage());
            }

            return $responseDTO;
        }
    }

?>