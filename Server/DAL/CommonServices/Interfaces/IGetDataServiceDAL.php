<?php 

    interface IGetDataServiceDAL
    {
        public function GetMessageItems($itemDTO);
        public function GetOrderItems($itemDTO);
        public function GetContactItems($itemDTO);
        public function GetLoggedUserItems($itemDTO);
    }
?>