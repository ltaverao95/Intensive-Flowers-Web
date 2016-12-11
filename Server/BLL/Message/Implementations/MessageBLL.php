<?php 

    class MessageBLL implements IMessageBLL
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
                $_messageDAL = new MessageDAL();

                $responseDTO = $_messageDAL->GetAllMessages();
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

        private function ValidateMessageDTO($messageDTO)
        {
            $actionResultDTO = new ActionResultDTO();

            if($messageDTO->Name == null)
            {
                $actionResultDTO->SetError("El campo Nombre no puede estar vacío");
                return $actionResultDTO;
            }

            if($messageDTO->Message == null)
            {
                $actionResultDTO->SetError("El campo Mensaje no puede estar vacío");
                return $actionResultDTO;
            }

            return $actionResultDTO;
        }
    }

?>