<?php 

    class MessageBLL implements IMessageBLL
    {
        //##### Public Methods #####

        public function SaveMessage($messageDTO)
        {
            $responseDTO = new ResponseDTO();
            $_messageDAL = new MessageDAL();

            try
            {
                $responseDTO = $this->ValidateMessageDTO($messageDTO);
                if($responseDTO->HasError)
                {
                    return $responseDTO;
                }

                $responseDTO = $_messageDAL->SaveMessage($messageDTO);
            }
            catch (Exception $e)
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema durante el guardado de los datos", $e->getMessage());	
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
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema durante el guardado de los datos", $e->getMessage());	
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
            $responseDTO = new ResponseDTO();

            try
            {
                if($messageDTO->Name == null)
                {
                    $responseDTO->SetError("El campo Nombre no puede estar vacío");
                    return $responseDTO;
                }

                if($messageDTO->Message == null)
                {
                    $responseDTO->SetError("El campo Mensaje no puede estar vacío");
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