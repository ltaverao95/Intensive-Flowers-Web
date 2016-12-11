<?php 

    interface IAdministrationBLL
    {
        public function SaveMessage();
        public function GetAllMessages();
        public function UpdateMessage();
        public function DeleteAllMessages();
        public function DeleteMessageByID();
        public function DeleteMessagesSelectedByID();
    }

?>