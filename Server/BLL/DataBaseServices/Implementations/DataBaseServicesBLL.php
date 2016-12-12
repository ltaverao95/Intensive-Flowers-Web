<?php 

    class DataBaseServicesBLL implements IDataBaseServicesBLL
    {
        public $connection = null;
        public $Q = null;
        public $ArrayParameters = null;

        private $_userName = "root";
        private $_password = "felipe0025";
        private $_dataBaseName = "intensiveflowers";
        private $_host = "localhost";

        public function InitializeDataBaseConnection()
        {
            $responseDTO = new ResponseDTO();

            try 
			{
                $_connectionString = "mysql:host=". $this->_host . ";dbname=".  $this->_dataBaseName;
                
				$this->connection = new PDO($_connectionString, $this->_userName, $this->_password) or die ("Error to make the connection with the data base");
				if($this->connection)
				{
					$responseDTO->UIMessage = "Conexión exitosa";	
					return $responseDTO;
				}

				$responseDTO->SetError("Error de conexión con la base de datos");	
				
			} 
			catch (Exception $e)
			{
				$responseDTO->SetErrorAndStackTrace("Ocurrió un problema mientras se conectaba con la base de datos", $e->getMessage());
			}

			return $responseDTO;
        }

        public function ExecuteQuery($query)
        {
            $responseDTO = new ResponseDTO();

            try 
			{
                $responseDTO = $this->InitializeDataBaseConnection();
                if($responseDTO->HasError)
                {
                    return $responseDTO;
                }

                $this->Q = $this->connection->prepare($query);

                if($this->ArrayParameters == null)
                {   
                    $this->Q->execute();                 
                }
                else
                {
                    $this->Q->execute($this->ArrayParameters);
                    $this->ArrayParameters = null;
                }
			} 
			catch (Exception $e)
			{
				$responseDTO->SetErrorAndStackTrace("Ocurrió un problema mientras se ejecutaba el query en la base de datos", $e->getMessage());
			}

			return $responseDTO;
        }
    }
?>