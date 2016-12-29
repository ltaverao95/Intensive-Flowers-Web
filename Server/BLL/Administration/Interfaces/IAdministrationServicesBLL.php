<?php 

    interface IAdministrationServicesBLL
    {
        public function SignIn($itemDTO);
        public function SignOut();
        public function ValidateUserIfExists($itemDTO);
        public function GetOrderByIdentityCard($itemDTO);
        public function GetOrderByName($itemDTO);
        public function GetOrderByDateAndStoreName($itemDTO);
        public function GetOrderByStoreName($itemDTO);
    }
?>