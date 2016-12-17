(function(){

	'use strict';

	angular
		.module('Intensive.App')
		.config(IntensiveConfig);

	IntensiveConfig.$inject = [
		'$stateProvider',
		'$urlRouterProvider',
		'localStorageServiceProvider'
	];	

	function IntensiveConfig($stateProvider,
						   	 $urlRouterProvider,
							 localStorageServiceProvider)
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
				url: '/detail/:id',
				views: {
					'currentView@': {
						templateUrl: folderTemplatesPath + 'store/store.detail.view.html',
						controller: 'Intensive.App.StoreDetailController',
						controllerAs: 'vm'		
					}
				}
			})

			.state('intensive.store.order', {
				url: '/order/:id',
				views: {
					'currentView@': {
						templateUrl: folderTemplatesPath + 'store/store.order.view.html',
						controller: 'Intensive.App.StoreOrderController',
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
				url: '/detail/:id',
				views: {
					'currentView@': {
						templateUrl: folderTemplatesPath + 'bouquet/bouquet.detail.view.html',
						controller: 'Intensive.App.BouquetDetailController',
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

			.state('intensive.login', {
				views: {
					'currentView@': {
						templateUrl: folderTemplatesPath + 'login/login.user.home.view.html',
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
				url: '/order',
				templateUrl: folderTemplatesPath + 'loginAdmin/login.admin.order.view.php',
				controller: 'Intensive.App.LoginOrderAdminController',
				controllerAs: 'vm'					
			})

			.state('intensive.activities.messages', {
				url: '/message',
				templateUrl: folderTemplatesPath + 'loginAdmin/login.admin.message.view.php',
				controller: 'Intensive.App.LoginMessageAdminController',
				controllerAs: 'vm'					
			})

			.state('intensive.activities.contact', {
				url: '/contact',
				templateUrl: folderTemplatesPath + 'loginAdmin/login.admin.contact.view.php',
				controller: 'Intensive.App.LoginContactAdminController',
				controllerAs: 'vm'					
			})

			.state('intensive.activities.profile', {
				url: '/profile',
				templateUrl: folderTemplatesPath + 'loginAdmin/login.admin.profile.view.php',
				controller: 'Intensive.App.LoginProfileAdminController',
				controllerAs: 'vm'					
			})

			.state('intensive.activities.profile.update', {
				templateUrl: folderTemplatesPath + 'loginAdmin/login.admin.profile.update.view.php',
				controller: 'Intensive.App.LoginProfileUpdateAdminController',
				controllerAs: 'vm'					
			})

			.state('intensive.activities.profile.usersadministration', {
				templateUrl: folderTemplatesPath + 'loginAdmin/login.admin.profile.usersadministration.view.php',
				controller: 'Intensive.App.LoginProfileUsersAdminController',
				controllerAs: 'vm'					
			})

		$urlRouterProvider.otherwise('/');	

		localStorageServiceProvider.setPrefix('Intensive.App')
    							   .setStorageType('sessionStorage')
    							   .setNotify(true, true)
	};

})();