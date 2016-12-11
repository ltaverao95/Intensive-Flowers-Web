<?php 

    class MessageDAL implements ICommonServicesDAL
    {
        //##### Public Methods #####

        public function SaveItem($messageDTO)
        {
            $responseDTO = new ResponseDTO();

            try
            {
                $responseDTO = $this->SaveCurrentMessage($messageDTO);
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
                $responseDTO = $this->GetMessages();   
            }
            catch (Exception $e)
            {
                $actionResultDTO->SetErrorAndStackTrace("Ocurrió un problema durante el guardado de los datos", $e->getMessage());	
            }

            return $responseDTO;
        }

        public function UpdateItemByID($messageDTO)
        {

        }

        public function DeleteAllItems($messageDTO)
        {

        }

        public function DeleteItemByID($messageDTO)
        {

        }
        
        public function DeleteItemsSelected($messageDTO)
        {

        }

        //##### Private Methods #####

        private function GetMessages()
        {
            try
            {
                $dataBaseServicesBLL = new DataBaseServicesBLL();

                $responseDTO = $dataBaseServicesBLL->InitializeDataBaseConnection();
                if($responseDTO->HasError)
                {
                    return $responseDTO;
                }

                $query = "SELECT * FROM message ORDER BY id";
                $q = $dataBaseServicesBLL->connection->prepare($query);
                $q->execute();

                //Recuperar los registros de la BD
                $result = $q->fetchAll();	

                $messagesList = array();
                while ($row = array_shift($result)) 
                {
                    $message = new MessageDTO();

                    $message->Id = $row['id'];
                    $message->Name = $row['name'];
                    $message->Message = $row['message'];

                    array_push($messagesList, $message);
                };

                if($messagesList == null)
                {
                    $responseDTO->SetMessageError("No se encontraron registros para mostrar");
                    return $responseDTO;
                } 
                
                $responseDTO->ResponseData = $messagesList;

                $dataBaseServicesBLL->connection = null;
            }
            catch (Exception $e)
            {
                $actionResultDTO->SetErrorAndStackTrace("Ocurrió un problema durante la obtención de los datos", $e->getMessage());	
            }

            return $responseDTO;
        }

        private function SaveCurrentMessage($messageDTO)
        {
            try
            {
                $dataBaseServicesBLL = new DataBaseServicesBLL();

                $responseDTO = $dataBaseServicesBLL->InitializeDataBaseConnection();
                if($responseDTO->HasError)
                {
                    return $responseDTO;
                }

                $query = "INSERT INTO message (id, name, message) VALUES (:id, :name, :message)";
		        $q = $dataBaseServicesBLL->connection->prepare($query);
		        $q->execute(array(':id' => NULL, 
				        		  ':name' => $messageDTO->Name,
						          ':message' => $messageDTO->Message));

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