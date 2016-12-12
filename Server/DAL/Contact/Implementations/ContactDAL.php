<?php 

    class ContactDAL implements ICommonServicesDAL
    {
        //##### Public Methods #####

        public function SaveItem($contactDTO)
        {
            $responseDTO = new ResponseDTO();

            try
            {
                $responseDTO = $this->SaveCurrentContact($contactDTO);
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
                $responseDTO = $this->GetContacts();   
            }
            catch (Exception $e)
            {
                $actionResultDTO->SetErrorAndStackTrace("Ocurrió un problema durante el guardado de los datos", $e->getMessage());	
            }

            return $responseDTO;
        }

        public function UpdateItemByID($contactDTO)
        {

        }

        public function DeleteAllItems($contactDTO)
        {

        }

        public function DeleteItemByID($contactDTO)
        {

        }
        
        public function DeleteItemsSelected($contactDTO)
        {

        }

        //##### Private Methods #####

        private function GetContacts()
        {
            try
            {
                $dataBaseServicesBLL = new DataBaseServicesBLL();

                $query = "SELECT * FROM contact ORDER BY id";
                $responseDTO = $dataBaseServicesBLL->ExecuteQuery($query);
                if($responseDTO->HasError)
                {
                    return $responseDTO;
                }

                //Recuperar los registros de la BD
                $result = $dataBaseServicesBLL->Q->fetchAll();	

                $contactsList = array();
                while ($row = array_shift($result)) 
                {
                    $contactDTO = new ContactDTO();

                    $contactDTO->Id = $row['id'];
                    $contactDTO->Name = $row['name'];
                    $contactDTO->Email = $row['email'];
                    $contactDTO->Phone = $row['phone'];
                    $contactDTO->Message = $row['message'];

                    array_push($contactsList, $contactDTO);
                };

                if($contactsList == null)
                {
                    $responseDTO->SetMessageError("No se encontraron registros para mostrar");
                    return $responseDTO;
                } 
                
                $responseDTO->ResponseData = $contactsList;

                $dataBaseServicesBLL->connection = null;
            }
            catch (Exception $e)
            {
                $actionResultDTO->SetErrorAndStackTrace("Ocurrió un problema durante la obtención de los datos", $e->getMessage());	
            }

            return $responseDTO;
        }

        private function SaveCurrentContact($contactDTO)
        {
            try
            {
                $dataBaseServicesBLL = new DataBaseServicesBLL();

                $query = "INSERT INTO contact (id, name, email, phone, message) VALUES (:id, :name, :email, :phone, :message)";
                $dataBaseServicesBLL->ArrayParameters = array(
                    ':id' => NULL, 
				    ':name' =>$contactDTO->Name,
				    ':email' =>$contactDTO->Email,
				    ':phone'=>$contactDTO->Phone,
				    ':message'=>$contactDTO->Message
                );

                $responseDTO = $dataBaseServicesBLL->ExecuteQuery($query);
                if($responseDTO->HasError)
                {
                    return $responseDTO;
                }

        		$responseDTO->UIMessage = "Mensaje enviado!";

                $dataBaseServicesBLL->connection = null;
            }
            catch (Exception $e)
            {
                $actionResultDTO->SetErrorAndStackTrace("Ocurrió un problema durante el guardado de los datos", $e->getMessage());	
            }

            return $responseDTO;
        }
    }

?>