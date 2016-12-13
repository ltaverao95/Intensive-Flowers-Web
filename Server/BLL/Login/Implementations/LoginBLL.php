<?php 

    class LoginBLL implements IAdministrationServicesBLL
    {
        //##### Public Methods #####

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
    }

?>