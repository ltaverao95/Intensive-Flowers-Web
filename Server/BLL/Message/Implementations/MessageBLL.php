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
            $responseDTO = new ResponseDTO();

            try
            {
                $_messageDAL = new MessageDAL();

                $responseDTO = $this->ValidateMessageDTO($messageDTO);
                if($responseDTO->HasError)
                {
                    return $responseDTO;
                }

                $responseDTO = $_messageDAL->UpdateItemByID($messageDTO);
            }
            catch (Exception $e)
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema mientras se actualizaban los datos", $e->getMessage());	
            }

            return $responseDTO;
        }

        public function DeleteAllItems()
        {
            $responseDTO = new ResponseDTO();

            try
            {
                $_messageDAL = new MessageDAL();

                $responseDTO = $_messageDAL->DeleteAllItems();
            }
            catch (Exception $e)
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema mientras se eliminaban los datos", $e->getMessage());	
            }

            return $responseDTO;
        }

        public function DeleteItemByID($messageDTO)
        {
            $responseDTO = new ResponseDTO();

            try
            {
                $_messageDAL = new MessageDAL();

                $responseDTO = $this->ValidateMessageDTO($messageDTO);
                if($responseDTO->HasError)
                {
                    return $responseDTO;
                }

                $responseDTO = $_messageDAL->DeleteItemByID($messageDTO);
            }
            catch (Exception $e)
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema mientras se eliminaban los datos", $e->getMessage());	
            }

            return $responseDTO;
        }
        
        public function DeleteItemsSelected($messagesDTO)
        {
            $responseDTO = new ResponseDTO();

            try
            {
                $_messageDAL = new MessageDAL();

                $responseDTO = $this->ValidateItemsSelected($messagesDTO);
                if($responseDTO->HasError)
                {
                    return $responseDTO;
                }

                $responseDTO = $_messageDAL->DeleteItemsSelected($messagesDTO);
            }
            catch (Exception $e)
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema mientras se eliminaban los datos", $e->getMessage());	
            }

            return $responseDTO;
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

        private function ValidateItemsSelected($messagesDTO)
        {
            $responseDTO = new ResponseDTO();

            try
            {
                for ($i=0; $i < count($messagesDTO); $i++) 
                {
                    $responseDTO = $this->ValidateMessageDTO($messagesDTO[$i]);
                    if($responseDTO->HasError)
                    {
                        return $responseDTO;
                    }
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