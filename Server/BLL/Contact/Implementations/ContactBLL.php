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
    }

?>