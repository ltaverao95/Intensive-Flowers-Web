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

        public function DeleteAllItems()
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
            $responseDTO = new ResponseDTO();

            try
            {
                $dataBaseServicesBLL = new DataBaseServicesBLL();
                $getDataServiceDAL = new GetDataServiceDAL();

                $query = "SELECT * FROM message ORDER BY id";
                $responseDTO = $dataBaseServicesBLL->ExecuteQuery($query);
                if($responseDTO->HasError)
                {
                    return $responseDTO;
                }

                //Recuperar los registros de la BD
                $result = $dataBaseServicesBLL->Q->fetchAll();	

                $responseDTO = $getDataServiceDAL->GetMessageItems($result);

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
            $responseDTO = new ResponseDTO();

            try
            {
                $dataBaseServicesBLL = new DataBaseServicesBLL();

                $query = "INSERT INTO message (id, name, message) VALUES (:id, :name, :message)";
                $dataBaseServicesBLL->ArrayParameters = array(
                    ':id' => NULL, 
				    ':name' => $messageDTO->Name,
					':message' => $messageDTO->Message);

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