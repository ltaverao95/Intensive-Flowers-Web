(function(){

	'use strict';

	angular
		.module('Intensive.App')
		.config(IntensiveConfig);

	IntensiveConfig.$inject = [
		'$stateProvider',
		'$urlRouterProvider'
	];	

	function IntensiveConfig($stateProvider,
						   	 $urlRouterProvider)
	{
		var folderTemplatesPath = "Client/Intensive/App/Templates/";

		$stateProvider

			.state('intensive', {
				url: '/',
				views: {
					'header': {
						templateUrl: folderTemplatesPath + 'header/header.view.php',
						controller: 'Intensive.App.HeaderController',
						controllerAs: 'vm'
					},
					'currentView': {
						templateUrl: folderTemplatesPath + 'home/home.view.html',
						controller: 'Intensive.App.HomeController',
						controllerAs: 'vm'
					},
					'footer': {
						templateUrl: folderTemplatesPath + 'footer/footer.view.html'
					}
				}
			})

			.state('intensive.home', {
				url: 'home',
				views: {
					'currentView@': {
						templateUrl: folderTemplatesPath + 'home/home.view.html',
						controller: 'Intensive.App.HomeController',
						controllerAs: 'vm'
					}
				}
			})

			.state('intensive.store', {
				url: 'store',
				views: {
					'currentView@': {
						templateUrl: folderTemplatesPath + 'store/store.home.view.html',
						controller: 'Intensive.App.StoreController',
						controllerAs: 'vm'
					}
				}
			})

			.state('intensive.store.detail', {
				url: 'store/detail/:id',
				views: {
					'currentView@': {
						templateUrl: folderTemplatesPath + 'store/store.detail.view.html',
						controller: 'Intensive.App.StoreController',
						controllerAs: 'vm'		
					}
				}
			})

			.state('intensive.store.order', {
				url: 'store/order/:id',
				views: {
					'currentView@': {
						templateUrl: folderTemplatesPath + 'store/store.order.view.html',
						controller: 'Intensive.App.StoreController',
						controllerAs: 'vm'
					}
				}	
			})

			.state('intensive.bouquet', {
				url: 'bouquet',
				views: {
					'currentView@': {
						templateUrl: folderTemplatesPath + 'bouquet/bouquet.home.view.html',
						controller: 'Intensive.App.BouquetController',
						controllerAs: 'vm'
					}
				}
			})

			.state('intensive.bouquet.detail', {
				url: 'bouquet/detail/:id',
				views: {
					'currentView@': {
						templateUrl: folderTemplatesPath + 'bouquet/bouquet.detail.view.html',
						controller: 'Intensive.App.BouquetController',
						controllerAs: 'vm'
					}
				}
			})

			.state('intensive.contact', {
				url: 'contact',
				views: {
					'currentView@': {
						templateUrl: folderTemplatesPath + 'contact/contact.home.view.html',
						controller: 'Intensive.App.ContactController',
						controllerAs: 'vm'		
					}
				}						
			})

			.state('intensive.loginuser', {
				views: {
					'currentView@': {
						templateUrl: folderTemplatesPath + 'loginUser/login.user.home.view.html',
						controller: 'Intensive.App.LoginUserController',
						controllerAs: 'vm'		
					}
				}				
			})

			.state('intensive.activities', {
				url: 'activities/home',
				views: {
					'currentView@': {
						templateUrl: folderTemplatesPath + 'loginAdmin/login.admin.home.view.php',
						controller: 'Intensive.App.LoginHomeAdminController',
						controllerAs: 'vm'		
					}
				}
			})

			.state('intensive.activities.querys', {
				templateUrl: folderTemplatesPath + 'loginAdmin/login.admin.query.view.php',
				controller: 'Intensive.App.LoginQueryAdminController',
				controllerAs: 'vm'					
			})
			
			.state('intensive.activities.orders', {
				templateUrl: folderTemplatesPath + 'loginAdmin/login.admin.order.view.php',
				controller: 'Intensive.App.LoginOrderAdminController',
				controllerAs: 'vm'					
			})

			.state('intensive.activities.messages', {
				templateUrl: folderTemplatesPath + 'loginAdmin/login.admin.message.view.php',
				controller: 'Intensive.App.LoginMessageAdminController',
				controllerAs: 'vm'					
			})

			.state('intensive.activities.contact', {
				templateUrl: folderTemplatesPath + 'loginAdmin/login.admin.contact.view.php',
				controller: 'Intensive.App.LoginContactAdminController',
				controllerAs: 'vm'					
			})

		$urlRouterProvider.otherwise('/');	
	};

})();