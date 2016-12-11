<?php 

    interface IMessageBLL
    {
        public function SaveMessage($messageDTO);
        public function GetAllMessages();
        public function UpdateMessage();
        public function DeleteAllMessages();
        public function DeleteMessageByID();
        public function DeleteMessagesSelectedByID();
    }

?>