<?php
	session_start();

	if(isset($_SESSION['admin']))
    {  
?>

<div class="row">
    <div class="box">
        <div class="clearfix">
            
        </div>        
    </div>
</div>
<?php
	}
	else {
		header('location: ../../../../../index.php');
	}
?>