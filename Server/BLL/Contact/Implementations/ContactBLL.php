<?php 

    class ContactBLL implements ICommonServicesBLL
    {
        //##### Public Methods #####

        public function SaveItem($contactDTO)
        {
            $responseDTO = new ResponseDTO();
            $_contactDAL = new ContactDAL();

            try
            {
                $responseDTO = $this->ValidateContactDTO($contactDTO);
                if($responseDTO->HasError)
                {
                    return $responseDTO;
                }

                $responseDTO = $_contactDAL->SaveItem($contactDTO);
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
                $_contactDAL = new ContactDAL();

                $responseDTO = $_contactDAL->GetAllItems();
            }
            catch (Exception $e)
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema durante el guardado de los datos", $e->getMessage());	
            }

            return $responseDTO;
        }

        public function GetItemByID($itemDTO)
        {
            
        }

        public function UpdateItemByID($contactDTO)
        {
            $responseDTO = new ResponseDTO();

            try
            {
                $_contactDAL = new ContactDAL();

                $responseDTO = $this->ValidateContactDTO($contactDTO);
                if($responseDTO->HasError)
                {
                    return $responseDTO;
                }

                $responseDTO = $_contactDAL->UpdateItemByID($contactDTO);
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
                $_contactDAL = new ContactDAL();

                $responseDTO = $_contactDAL->DeleteAllItems();
            }
            catch (Exception $e)
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema mientras se eliminaban los datos", $e->getMessage());	
            }

            return $responseDTO;
        }

        public function DeleteItemByID($contactDTO)
        {
            $responseDTO = new ResponseDTO();

            try
            {
                $_contactDAL = new ContactDAL();

                $responseDTO = $this->ValidateContactDTO($contactDTO);
                if($responseDTO->HasError)
                {
                    return $responseDTO;
                }

                $responseDTO = $_contactDAL->DeleteItemByID($contactDTO);
            }
            catch (Exception $e)
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema mientras se eliminaban los datos", $e->getMessage());	
            }

            return $responseDTO;
        }
        
        public function DeleteItemsSelected($contactsDTO)
        {
            $responseDTO = new ResponseDTO();

            try
            {
                $_contactDAL = new ContactDAL();

                $responseDTO = $this->ValidateItemsSelected($contactsDTO);
                if($responseDTO->HasError)
                {
                    return $responseDTO;
                }

                $responseDTO = $_contactDAL->DeleteItemsSelected($contactsDTO);
            }
            catch (Exception $e)
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema mientras se eliminaban los datos", $e->getMessage());	
            }

            return $responseDTO;
        }

        //##### Private Methods #####

        private function ValidateContactDTO($contactDTO)
        {
            $responseDTO = new ResponseDTO();

            try
            {
                if($contactDTO->Name == null)
                {
                    $responseDTO->SetError("El campo Nombre no puede estar vacío");
                    return $responseDTO;
                }

                if($contactDTO->Email == null)
                {
                    $responseDTO->SetError("El campo Email no puede estar vacío");
                    return $responseDTO;
                }

                if($contactDTO->Phone == null)
                {
                    $responseDTO->SetError("El campo Teléfono no puede estar vacío");
                    return $responseDTO;
                }

                if($contactDTO->Message == null)
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

        private function ValidateItemsSelected($contactsDTO)
        {
            $responseDTO = new ResponseDTO();

            try
            {
                if(count($contactsDTO) == 0 ||
                   $contactsDTO == null)
                {
                    $responseDTO->SetError("No hay registros para eliminar");
                    return $responseDTO;
                }

                for ($i=0; $i < count($contactsDTO); $i++) 
                {
                    $responseDTO = $this->ValidateContactDTO($contactsDTO[$i]);
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