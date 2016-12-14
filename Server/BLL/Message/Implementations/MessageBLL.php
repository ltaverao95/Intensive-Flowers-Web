<?php 

    class MessageBLL implements ICommonServicesBLL
    {
        //##### Public Methods #####

        public function SaveItem($messageDTO)
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

                $responseDTO = $_messageDAL->SaveItem($messageDTO);
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
                $_messageDAL = new MessageDAL();

                $responseDTO = $_messageDAL->GetAllItems();
            }
            catch (Exception $e)
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema durante el guardado de los datos", $e->getMessage());	
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