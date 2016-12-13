<?php 

    interface ICommonServicesDAL
    {
        public function SaveItem($itemDTO);
        public function GetAllItems();
        public function UpdateItemByID($itemDTO);
        public function DeleteAllItems();
        public function DeleteItemByID($itemDTO);
        public function DeleteItemsSelected($itemDTO);
    }

?>