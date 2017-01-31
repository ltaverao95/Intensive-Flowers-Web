<?php  
	
	class ResponseDTO
	{
		public $Result = 1; //1: Success, 0: Error
		public $UIMessage = "";
		public $StackTrace = "";
		public $IsOk = true;
		public $HasError = false;
		public $ResponseData = null;

		public function SetAsOk()
		{
			$this->Result = 1;
			$this->IsOk = true;
			$this->HasError = false;
		}

		public function SetError($errorMessage)
		{
			$this->Result = 0;
			$this->UIMessage = $errorMessage;
			$this->IsOk = false;
			$this->HasError = true;

			return $this;		
		}

		public function SetErrorAndStackTrace($errorMessage, $stackTrace)
		{
			$this->StackTrace = $stackTrace;
			$this->SetError($errorMessage);

			return $this;		
		}
	}
?>