<?php 

    class MessageDAL implements IMessageDAL
    {
        //##### Public Methods #####

        public function SaveMessage($messageDTO)
        {
            $responseDTO = new ResponseDTO();

            try
            {
                
            }
            catch (Exception $e)
            {
                $actionResultDTO->SetErrorAndStackTrace("Ocurrió un problema durante el guardado de los datos", $e->getMessage());	
            }

            return $responseDTO;
        }

        public function GetAllMessages()
        {
            $responseDTO = new ResponseDTO();
            
            try
            {
                
            }
            catch (Exception $e)
            {
                $actionResultDTO->SetErrorAndStackTrace("Ocurrió un problema durante el guardado de los datos", $e->getMessage());	
            }

            return $responseDTO;
        }

        public function UpdateMessageByID($messageDTO)
        {

        }

        public function DeleteAllMessages($messageDTO)
        {

        }

        public function DeleteMessageByID($messageDTO)
        {

        }
        
        public function DeleteMessagesSelected($messageDTO)
        {

        }

        //##### Private Methods #####

    }

?>