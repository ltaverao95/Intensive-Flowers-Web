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

        public function GetUserLoggedInfoByID($itemDTO)
        {
            $responseDTO = new ResponseDTO();

            try
            {
                $responseDTO = $this->GetCurrentLoggedUser($itemDTO);   
            }
            catch (Exception $e)
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema tratando de obtener los datos", $e->getMessage());
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
            
        }

        public function GetOrderByStoreName($itemDTO)
        {
            
        }

        //######### Private Methods

        private function ValidateCurrentUser($itemDTO)
        {
            $responseDTO = new ResponseDTO();

            try
            {
                $dataBaseServicesBLL = new DataBaseServicesBLL();

                $query = "SELECT * FROM login WHERE user_name = :user_name AND password = :password";
                $dataBaseServicesBLL->ArrayParameters = array(
                    ':user_name' => $itemDTO->UserName, 
					':password' =>$itemDTO->Password);

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
                $_SESSION['user_auth'] = $rowUser;

                $responseDTO->ResponseData = $rowUser[0];

                $dataBaseServicesBLL->connection = null;
            }
            catch (Exception $e)
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema durante la verificación de los datos", $e->getMessage());
            }

            return $responseDTO;
        }

        private function GetCurrentLoggedUser($itemDTO)
        {
            $responseDTO = new ResponseDTO();

            try
            {
                $dataBaseServicesBLL = new DataBaseServicesBLL();
                $getDataServiceDAL = new GetDataServiceDAL();

                $query = "SELECT user_logued_inf.*, login_user.* FROM user_logued_info user_logued_inf inner join login login_user on user_logued_inf.id_login_user = login_user.id_login_user WHERE login_user.id_login_user = :id_login_user";
                
                $dataBaseServicesBLL->ArrayParameters = array(
                    ':id_login_user' => $itemDTO->IDLoginUser);

                $responseDTO = $dataBaseServicesBLL->ExecuteQuery($query);
                if($responseDTO->HasError)
                {
                    return $responseDTO;
                }

        		//Recuperar los registros de la BD
                $result = $dataBaseServicesBLL->Q->fetchAll();	

                $responseDTO = $getDataServiceDAL->GetLoggedUserItems($result);

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