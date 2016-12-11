<?php 

    class DataBaseUtilitiesBLL implements IDataBaseUtilitiesBLL
    {
        public $connection = null;
		private $_username = "root";
		private $_password = "felipe0025";

		public function InitConnectionToDataBase()
		{
			$actionResultDTO = new ActionResultDTO();

			try 
			{
				$this->connection = new PDO('mysql:host=localhost;dbname=intensiveflowers', $this->_username, $this->_password) or die ("Error de conexión con la base de datos");
				if($this->connection)
				{
					$actionResultDTO->Message = "Conexión Exitosa";	
					return $actionResultDTO;
				}

				$actionResultDTO->SetError("Error de conexión con la base de datos");	
				
			} 
			catch (Exception $e)
			{
				$actionResultDTO->SetErrorAndStackTrace("Ocurrió un problema mientras se conectaba con la base de datos", $e->getMessage());
			}

			return $actionResultDTO;
		}
    }
?>