<?php 

    interface IAdministrationServicesBLL
    {
        public function SignIn($itemDTO);
        public function SignOut();
        public function GetOrderByIdentityCard($itemDTO);
        public function GetOrderByDateAndStoreName($itemDTO);
    }
?>