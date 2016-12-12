<?php 

    class LoginDAL implements IAdministrationServicesDAL
    {
        //########## Public Methods

        public function SignIn($itemDTO)
        {
            $responseDTO = new ResponseDTO();

            try
            {
                $responseDTO = $this->ValidateCurrentUser($itemDTO);
            }
            catch (Exception $e)
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema durante la verificación de los datos", $e->getMessage());
            }

            return $responseDTO;
        }

        //######### Private Methods

        private function ValidateCurrentUser($itemDTO)
        {
            $responseDTO = new ResponseDTO();

            try
            {
                $dataBaseServicesBLL = new DataBaseServicesBLL();

                $query = "SELECT * FROM login WHERE user = :user AND pass = :pass";
                $dataBaseServicesBLL->ArrayParameters = array(
                    ':user' => $itemDTO->UserName, 
					':pass' =>$itemDTO->Password);

                $responseDTO = $dataBaseServicesBLL->ExecuteQuery($query);
                if($responseDTO->HasError)
                {
                    return $responseDTO;
                }

        		$rowUser = $dataBaseServicesBLL->Q->fetch();
		
                if($rowUser == NULL)
                {
                    $responseDTO->SetError("Usuario y/o contraseña inválidos, intente de nuevo.");
                    return $responseDTO;
                }
                
                session_start();
                $_SESSION['admin'] = $itemDTO->UserName;

                $dataBaseServicesBLL->connection = null;
            }
            catch (Exception $e)
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema durante la verificación de los datos", $e->getMessage());
            }

            return $responseDTO;
        }
    }
?>