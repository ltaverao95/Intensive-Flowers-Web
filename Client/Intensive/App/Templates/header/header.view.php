<div class="brand">INTENSIVE FLOWERS</div>
    <div class="address-bar">Cadena de Floristerías <?php session_start(); if(isset($_SESSION['admin'])){ echo "- ". $_SESSION['admin']; } ?> </div>

    <!-- Navigation -->
    <nav class="navbar navbar-default" role="navigation">
        <div class="container">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <!-- navbar-brand is hidden on larger screens, but visible when the menu is collapsed -->
                <a class="navbar-brand" ui-sref="intensive.home">Inicio</a>
            </div>
            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                    <li>
                        <a ui-sref="intensive.home">Inicio</a>
                    </li>
                    <li>
                        <a ui-sref="intensive.store">Tiendas</a>
                    </li>
                    <li>
                        <a ui-sref="intensive.bouquet">Ramos</a>
                    </li>
                    <li>
                        <a ui-sref="intensive.contact">Contacto</a>
                    </li>
                    
                    <?php 

                        if(isset($_SESSION['admin']))
                        {
                    ?>
                        <li>
                            <a ui-sref="intensive.activities">Admin</a>
                        </li>
                        <li>
                            <a href="Server/DAL/UserServices/login/logout.php">Cerrar Sesión</a>
                        </li>

                    <?php  
                        } 
                        else 
                        {
                    ?>
                        <li>
                            <a ui-sref="intensive.loginuser">Login</a>
                        </li>
                    <?php 
                        }
                    ?>
                </ul>
            </div>
            <!-- /.navbar-collapse -->
        </div>
        <!-- /.container -->
    </nav>