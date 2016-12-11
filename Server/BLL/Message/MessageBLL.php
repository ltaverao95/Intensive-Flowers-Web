<?php 

    include_once("IMessageBLL.php");
    include_once('../../DTO/ActionResultDTO/ActionResultDTO.php');

    class MessageBLL implements IMessageBLL
    {
        //##### Atributes Methods #####


        //##### Public Methods #####

        public function SaveMessage($messageDTO)
        {
            try
            {
                $actionResultDTO = $this->ValidateMessageDTO($messageDTO);
                if($actionResultDTO->HasError)
                {
                    return $actionResultDTO;
                }

                $actionResultDTO = 
            }
            catch (Exception $e)
            {
                $actionResultDTO->SetErrorAndStackTrace("Ocurrió un problema durante el guardado de los datos", $e->getMessage());	
            }
        }

        public function GetAllMessages()
        {

        }

        public function UpdateMessage()
        {

        }

        public function DeleteAllMessages()
        {

        }

        public function DeleteMessageByID()
        {

        }
        
        public function DeleteMessagesSelectedByID()
        {

        }

        //##### Private Methods #####

        private function ValidateMessageDTO($messageDTO)
        {
            $actionResultDTO = new ActionResultDTO();

            if($messageDTO->Name == undefined ||
               $messageDTO->Name == null)
            {
                $actionResultDTO->SetError("El campo Nombre no puede estar vacío");
                return $actionResultDTO;
            }

            if($messageDTO->Message == undefined ||
               $messageDTO->Message == null)
            {
                $actionResultDTO->SetError("El campo Mensaje no puede estar vacío");
                return $actionResultDTO;
            }

            return $actionResultDTO;
        }
    }

?>