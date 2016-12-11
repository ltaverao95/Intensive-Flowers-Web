<?php  
	
	class ActionResultDTO
	{
		public $Result = 1;
		public $ResultData = null;
		public $UIMessage = null;
		public $StackTrace = null;
		public $HasError = false;
		public $IsOk = true;

		public function SetAsOk($message)
		{
			$this->Result = 1;
			$this->IsOk = true;
			$this->HasError = false;
			$this->UIMessage = $message;
			return this;
		}

		public function SetError($errorMessage)
		{
			$this->Result = 0;
			$this->IsOk = false;
			$this->HasError = true;
			$this->UIMessage = $errorMessage;
			return $this;
		}

		public function SetErrorAndStackTrace($errorMessage, $stackTrace)
		{
			$this->StackTrace = $stackTrace;
            return $this->SetError($errorMessage);
		}
	}
?>