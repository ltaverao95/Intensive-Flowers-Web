<?php 

	//Interfaces
    include_once("../../BLL/DataBaseServices/Interfaces/IDataBaseServicesBLL.php");
	include_once("../../BLL/Message/Interfaces/IMessageBLL.php");
	include_once("../../DAL/Message/Interfaces/IMessageDAL.php");

	//Implementations
	include_once("../../BLL/DataBaseServices/Implementations/DataBaseServicesBLL.php");
	include_once("../../BLL/Message/Implementations/MessageBLL.php");
	include_once("../../DAL/Message/Implementations/MessageDAL.php");

	//Utilities
	include_once("../../Utils/ResponseDTO/ResponseDTO.php");

	//DTO's
	include_once("../../DTO/MessageDTO.php");

?>