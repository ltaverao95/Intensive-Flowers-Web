<?php 

    interface IMessageBLL
    {
        public function SaveMessage($messageDTO);
        public function GetAllMessages();
        public function UpdateMessageByID($messageDTO);
        public function DeleteAllMessages($messageDTO);
        public function DeleteMessageByID($messageDTO);
        public function DeleteMessagesSelected($messageDTO);
    }

?>