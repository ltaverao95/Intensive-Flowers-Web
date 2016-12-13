<?php 

    interface IAdministrationServicesDAL
    {
        public function SignIn($itemDTO);
        public function GetOrderByIdentityCard($itemDTO);
        public function GetOrderByDateAndStoreName($itemDTO);
    }

?>