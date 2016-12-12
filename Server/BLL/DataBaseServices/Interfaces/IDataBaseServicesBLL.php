<?php 

    interface IDataBaseServicesBLL
    {
        public function InitializeDataBaseConnection();
        public function ExecuteQuery($query);
    }

?>