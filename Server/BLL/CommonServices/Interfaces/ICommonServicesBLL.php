<?php 

    interface ICommonServicesBLL
    {
        public function SaveItem($itemDTO);
        public function GetAllItems();
        public function UpdateItemByID($itemDTO);
        public function DeleteAllItems($itemDTO);
        public function DeleteItemByID($itemDTO);
        public function DeleteItemsSelected($itemDTO);
    }

?>