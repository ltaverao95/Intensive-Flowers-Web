<?php 

    class StoreBLL implements ICommonServicesBLL
    {
        //##### Public Methods #####

        public function SaveItem($storeDTO)
        {
            $responseDTO = new ResponseDTO();
            $_storeDAL = new StoreDAL();

            try
            {
                $responseDTO = $this->ValidateStoreDTO($storeDTO);
                if($responseDTO->HasError)
                {
                    return $responseDTO;
                }

                $responseDTO = $_storeDAL->SaveItem($storeDTO);
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
                $_storeDAL = new StoreDAL();

                $responseDTO = $_storeDAL->GetAllItems();
            }
            catch (Exception $e)
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema durante el guardado de los datos", $e->getMessage());	
            }

            return $responseDTO;
        }

        public function UpdateItemByID($storeDTO)
        {
            $responseDTO = new ResponseDTO();

            try
            {
                $_storeDAL = new StoreDAL();

                $responseDTO = $this->ValidateStoreDTO($storeDTO);
                if($responseDTO->HasError)
                {
                    return $responseDTO;
                }

                $responseDTO = $_storeDAL->UpdateItemByID($storeDTO);
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
                $_storeDAL = new StoreDAL();

                $responseDTO = $_storeDAL->DeleteAllItems();
            }
            catch (Exception $e)
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema mientras se eliminaban los datos", $e->getMessage());	
            }

            return $responseDTO;
        }

        public function DeleteItemByID($storeDTO)
        {
            $responseDTO = new ResponseDTO();

            try
            {
                $_storeDAL = new StoreDAL();

                $responseDTO = $this->ValidateStoreDTO($storeDTO);
                if($responseDTO->HasError)
                {
                    return $responseDTO;
                }

                $responseDTO = $_storeDAL->DeleteItemByID($storeDTO);
            }
            catch (Exception $e)
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema mientras se eliminaban los datos", $e->getMessage());	
            }

            return $responseDTO;
        }
        
        public function DeleteItemsSelected($storeDTO)
        {
            $responseDTO = new ResponseDTO();

            try
            {
                $_storeDAL = new StoreDAL();

                $responseDTO = $this->ValidateItemsSelected($storeDTO);
                if($responseDTO->HasError)
                {
                    return $responseDTO;
                }

                $responseDTO = $_storeDAL->DeleteItemsSelected($storeDTO);
            }
            catch (Exception $e)
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema mientras se eliminaban los datos", $e->getMessage());	
            }

            return $responseDTO;
        }

        //##### Private Methods #####

        private function ValidateStoreDTO($storeDTO)
        {
            $responseDTO = new ResponseDTO();

            try
            {
                if($storeDTO->IdentityCard == null)
                {
                    $responseDTO->SetError("La cédula no puede estar vacía");
                    return $responseDTO;
                }

                if($storeDTO->Name == null)
                {
                    $responseDTO->SetError("El campo Nombre no puede estar vacío");
                    return $responseDTO;
                }

                if($storeDTO->Surname == null)
                {
                    $responseDTO->SetError("El apellido no puede estar vacío");
                    return $responseDTO;
                }

                if($storeDTO->AddressToSend == null)
                {
                    $responseDTO->SetError("La dirección de envío no puede estar vacía");
                    return $responseDTO;
                }

                if($storeDTO->Phone == null)
                {
                    $responseDTO->SetError("El teléfono no puede estar vacío");
                    return $responseDTO;
                }

                if($storeDTO->Email == null)
                {
                    $responseDTO->SetError("El correo electrónico no puede estar vacío");
                    return $responseDTO;
                }

                if($storeDTO->OrderDescription == null)
                {
                    $responseDTO->SetError("La descripción del pedido no puede estar vacía");
                    return $responseDTO;
                }

                if($storeDTO->Store == null)
                {
                    $responseDTO->SetError("Debes seleccionar una tienda");
                    return $responseDTO;
                }

                if($storeDTO->WayToPay === null)
                {
                    $responseDTO->SetError("Debes seleccionar Una forma de pago");
                    return $responseDTO;
                }

                if($storeDTO->DateOrder == null)
                {
                    $responseDTO->SetError("La fecha de envío no puede estar vacía");
                    return $responseDTO;
                }

                if($storeDTO->DateToSend == null)
                {
                    $responseDTO->SetError("La fecha de envío no puede estar vacía");
                    return $responseDTO;
                }

                if($storeDTO->TimeToSend == null)
                {
                    $responseDTO->SetError("La hora de envío no puede estar vacía");
                    return $responseDTO;
                }
            }
            catch (Exception $e)
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema mientras se validaban los datos", $e->getMessage());
            }

            return $responseDTO;
        }

        private function ValidateItemsSelected($storeDTO)
        {
            $responseDTO = new ResponseDTO();

            try
            {
                if(count($storeDTO) == 0 ||
                   $storeDTO == null)
                {
                    $responseDTO->SetError("No hay registros para eliminar");
                    return $responseDTO;
                }

                for ($i=0; $i < count($storeDTO); $i++) 
                {
                    $responseDTO = $this->ValidateStoreDTO($storeDTO[$i]);
                    if($responseDTO->HasError)
                    {
                        return $responseDTO;
                    }
                }
            }
            catch (Exception $e)
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema mientras se eliminaban los datos", $e->getMessage());	
            }

            return $responseDTO;
        }
    }

?>