<?php 

    interface IAdministrationServicesDAL
    {
        public function SignIn($itemDTO);
        public function UpdateUserPassword($itemDTO);
        public function ValidateUserIfExists($itemDTO);
        public function GetOrderByIdentityCard($itemDTO);
        public function GetOrderByName($itemDTO);
        public function GetOrderByDateAndStoreName($itemDTO);
        public function GetOrderByStoreName($itemDTO);
    }

?>