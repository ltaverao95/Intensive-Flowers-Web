<!DOCTYPE html>
<html lang="en">
<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="Luis Felipe Tavera Orozco">
    <link rel="icon" type="image/jpg" href="Client/Intensive/App/images/logoP.jpg">

    <title>Intensive Flowers</title>

    <!--Angular Libraries-->
    <script src="Client/Intensive/App/lib/angular/angular.min.js"></script>
    <script src="Client/Intensive/App/lib/angular-local-storage/dist/angular-local-storage.min.js"></script>
    <script src="Client/Intensive/App/lib/angular-ui-router/release/angular-ui-router.js"></script>   
    <script src="Client/Intensive/App/lib/angular-animate/angular-animate.js"></script>
    <script src="Client/Intensive/App/lib/angular-bootstrap/ui-bootstrap-tpls.js"></script>
    <script src="Client/Intensive/App/lib/AngularJS-Toaster/toaster.min.js"></script>

    <!-- jQuery -->
    <script src="Client/Intensive/App/lib/jquery/dist/jquery.js"></script>

    <!-- Bootstrap Core CSS -->
    <link href="Client/Intensive/App/lib/bootstrap/dist/css/bootstrap.css" rel="stylesheet" type="text/css">

    <!-- Custom CSS -->
    <link href="Client/Intensive/App/css/business-casual.css" rel="stylesheet">

    <!-- Project CSS -->
    <link rel="stylesheet" href="Client/Intensive/App/css/intensiveFlowersWebStyles.css">
    <link rel="stylesheet" href="Client/Intensive/App/lib/AngularJS-Toaster/toaster.min.css">

    <!-- Fonts -->
    <link href="http://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800" rel="stylesheet" type="text/css">
    <link href="http://fonts.googleapis.com/css?family=Josefin+Slab:100,300,400,600,700,100italic,300italic,400italic,600italic,700italic" rel="stylesheet" type="text/css">

    <!-- Bootstrap Core JavaScript -->
    <script src="Client/Intensive/App/lib/bootstrap/dist/js/bootstrap.js"></script>

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

</head>

<body ng-app="Intensive.App" class="ng-cloak">

    <toaster-container toaster-options="{'time-out': 4000, 'close-button': true}"></toaster-container>

    <!-- Modal start here-->
    <div class="modal fade " id="pleaseWaitMessage" tabindex="-1"
        role="dialog" aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">
                        <span class="glyphicon glyphicon-time"> 
                        </span>Please Wait
                     </h4>
                </div>
                <div class="modal-body">
                    <div class="progress">
                        <div class="progress-bar progress-bar-info
                        progress-bar-striped active"
                        style="width: 100%">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal ends here -->
    
    <div ui-view="header">Cargando...</div>

    <div class="container" ui-view="currentView">Cargando...</div>

    <div ui-view="footer">Cargando...</div>

    <!-- Dependencies -->

    <!-- App Modules -->
    <script src="Client/Intensive/App/app.module.js"></script>

    <!-- App Configuration -->
    <script src="Client/Intensive/App/app.config.js"></script>

    <!-- App Run -->
    <script src="Client/Intensive/App/app.run.js"></script>
    
    <!-- Blocks/Log Dependencies -->
    <script src="Client/Blocks/Log/module.js"></script>
    <script src="Client/Blocks/Log/Services/LogFactory.js"></script>

    <!-- Blocks/UserMessages Dependencies -->
    <script src="Client/Blocks/UserMessages/module.js"></script>
    <script src="Client/Blocks/UserMessages/Services/UserMessagesFactory.js"></script>

    <!-- Blocks/Utils Dependencies -->
    <script src="Client/Blocks/Utils/module.js"></script>
    <script src="Client/Blocks/Utils/constants.js"></script>
    <script src="Client/Blocks/Utils/Services/ActionResultModel.js"></script>
    <script src="Client/Blocks/Utils/Services/UtilitiesFactory.js"></script>
    
    <!-- App/Core Dependencies -->
    <script src="Client/Intensive/Core/module.js"></script>
    <script src="Client/Intensive/Core/constants.js"></script>

    <!-- App/Components Controllers-->
    <script src="Client/Intensive/App/Templates/header/header.controller.js"></script>
    <script src="Client/Intensive/App/Templates/home/home.controller.js"></script>
    <script src="Client/Intensive/App/Templates/store/store.controller.js"></script>
    <script src="Client/Intensive/App/Templates/store/store.detail.controller.js"></script>
    <script src="Client/Intensive/App/Templates/store/store.order.controller.js"></script>
    <script src="Client/Intensive/App/Templates/bouquet/bouquet.controller.js"></script>
    <script src="Client/Intensive/App/Templates/bouquet/bouquet.detail.controller.js"></script>
    <script src="Client/Intensive/App/Templates/contact/contact.controller.js"></script>
    <script src="Client/Intensive/App/Templates/login/login.user.controller.js"></script>

    <!-- App/Components/loginAdmin Controllers -->
    <script src="Client/Intensive/App/Templates/loginAdmin/login.admin.home.controller.js"></script>
    <script src="Client/Intensive/App/Templates/loginAdmin/login.admin.query.controller.js"></script>
    <script src="Client/Intensive/App/Templates/loginAdmin/login.admin.order.controller.js"></script>
    <script src="Client/Intensive/App/Templates/loginAdmin/login.admin.order.modal.controller.js"></script>
    <script src="Client/Intensive/App/Templates/loginAdmin/login.admin.message.controller.js"></script>
    <script src="Client/Intensive/App/Templates/loginAdmin/login.admin.message.modal.controller.js"></script>
    <script src="Client/Intensive/App/Templates/loginAdmin/login.admin.contact.controller.js"></script>
    <script src="Client/Intensive/App/Templates/loginAdmin/login.admin.contact.modal.controller.js"></script>
    <script src="Client/Intensive/App/Templates/loginAdmin/login.admin.profile.controller.js"></script>
    <script src="Client/Intensive/App/Templates/loginAdmin/login.admin.profile.update.controller.js"></script>
    <script src="Client/Intensive/App/Templates/loginAdmin/login.admin.profile.usersadministration.controller.js"></script>

    <!-- App/Components Models-->
    <script src="Client/Intensive/Core/Services/Models/OperationsModel.js"></script>
    <script src="Client/Intensive/Core/Services/Models/PaginatorModel.js"></script>
    <script src="Client/Intensive/Core/Services/Models/MessageModel.js"></script>
    <script src="Client/Intensive/Core/Services/Models/StoreModel.js"></script>
    <script src="Client/Intensive/Core/Services/Models/BouquetModel.js"></script>
    <script src="Client/Intensive/Core/Services/Models/ContactModel.js"></script>
    <script src="Client/Intensive/Core/Services/Models/LoginModel.js"></script>
    <script src="Client/Intensive/Core/Services/Models/UserAdminModel.js"></script>
    <script src="Client/Intensive/Core/Services/Models/QueryDataModel.js"></script>

    <!-- App/Components/loginAdmin Services -->

    <!-- Filters -->
    <script src="Client/Intensive/Core/Filters/paginator.filter.js"></script>
</body>

</html>