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
		var folderComponentsPath = "Client/Intensive/App/Components/";

		$stateProvider

			.state('intensive', {
				url: '/',
				views: {
					'header': {
						templateUrl: folderComponentsPath + 'header/header.view.php',
						controller: 'Intensive.App.HeaderController',
						controllerAs: 'vm'
					},
					'currentView': {
						templateUrl: folderComponentsPath + 'home/home.view.html',
						controller: 'Intensive.App.HomeController',
						controllerAs: 'vm',
						resolve: {
							GetAllMessages: GetAllMessages
						}
					},
					'footer': {
						templateUrl: folderComponentsPath + 'footer/footer.view.html'
					}
				}
			})

			.state('intensive.home', {
				url: 'home',
				views: {
					'currentView@': {
						templateUrl: folderComponentsPath + 'home/home.view.html',
						controller: 'Intensive.App.HomeController',
						controllerAs: 'vm',
						resolve: {
							GetAllMessages: GetAllMessages
						}
					}
				}
			})

			.state('intensive.store', {
				url: 'store',
				views: {
					'currentView@': {
						templateUrl: folderComponentsPath + 'store/store.home.view.html',
						controller: 'Intensive.App.StoreController',
						controllerAs: 'vm',
						resolve: 
						{
							GetStoresInfo : GetStoresInfo
						}
					}
				}
			})

			.state('intensive.store.detail', {
				url: 'store/detail/:id',
				views: {
					'currentView@': {
						templateUrl: folderComponentsPath + 'store/store.detail.view.html',
						controller: 'Intensive.App.StoreController',
						controllerAs: 'vm',
						resolve: {
							GetStoresInfo : GetStoresInfo
						}		
					}
				}
			})

			.state('intensive.store.order', {
				url: 'store/order/:id',
				views: {
					'currentView@': {
						templateUrl: folderComponentsPath + 'store/store.order.view.html',
						controller: 'Intensive.App.StoreController',
						controllerAs: 'vm',
						resolve: {
							GetStoresInfo : GetStoresInfo
						}		
					}
				}
			})

			.state('intensive.bouquet', {
				url: 'bouquet',
				views: {
					'currentView@': {
						templateUrl: folderComponentsPath + 'bouquet/bouquet.home.view.html',
						controller: 'Intensive.App.BouquetController',
						controllerAs: 'vm',
						resolve: {
							GetAllBouquets: GetAllBouquets
						}
					}
				}
			})

			.state('intensive.bouquet.detail', {
				url: 'bouquet/detail/:id',
				views: {
					'currentView@': {
						templateUrl: folderComponentsPath + 'bouquet/bouquet.detail.view.html',
						controller: 'Intensive.App.BouquetController',
						controllerAs: 'vm',
						resolve: {
							GetAllBouquets: GetAllBouquets
						}
					}
				}
			})

			.state('intensive.contact', {
				url: 'contact',
				views: {
					'currentView@': {
						templateUrl: folderComponentsPath + 'contact/contact.home.view.html',
						controller: 'Intensive.App.ContactController',
						controllerAs: 'vm'		
					}
				}						
			})

			.state('intensive.loginuser', {
				views: {
					'currentView@': {
						templateUrl: folderComponentsPath + 'loginUser/login.user.home.view.html',
						controller: 'Intensive.App.LoginUserController',
						controllerAs: 'vm'		
					}
				}				
			})

			.state('intensive.activities', {
				url: 'activities/home',
				views: {
					'currentView@': {
						templateUrl: folderComponentsPath + 'loginAdmin/login.admin.home.view.php',
						controller: 'Intensive.App.LoginHomeAdminController',
						controllerAs: 'vm'		
					}
				}
			})

			.state('intensive.activities.querys', {
				templateUrl: folderComponentsPath + 'loginAdmin/login.admin.query.view.php',
				controller: 'Intensive.App.LoginQueryAdminController',
				controllerAs: 'vm',
				resolve: {
					GetStoresInfo: GetStoresInfo
				}						
			})
			
			.state('intensive.activities.orders', {
				templateUrl: folderComponentsPath + 'loginAdmin/login.admin.order.view.php',
				controller: 'Intensive.App.LoginOrderAdminController',
				controllerAs: 'vm',
				resolve: {
					GetStoresInfo: GetStoresInfo,
					GetAllOrders: GetAllOrders
				}						
			})

			.state('intensive.activities.messages', {
				templateUrl: folderComponentsPath + 'loginAdmin/login.admin.message.view.php',
				controller: 'Intensive.App.LoginMessageAdminController',
				controllerAs: 'vm',
				resolve: {
					GetAllMessages: GetAllMessages
				}					
			})

			.state('intensive.activities.contact', {
				templateUrl: folderComponentsPath + 'loginAdmin/login.admin.contact.view.php',
				controller: 'Intensive.App.LoginContactAdminController',
				controllerAs: 'vm',
				resolve: {
					GetAllContacts: GetAllContacts
				}						
			})

		$urlRouterProvider.otherwise('/');	
	};

	//############ Get All Messages
	GetAllMessages.$inject = [
		'Intensive.App.Services.HomeService'
	];

	function GetAllMessages(HomeService)
	{
		return HomeService.GetAllMessages();
	}

	//############ Get All Stores Info

	GetStoresInfo.$inject = [
		'Intensive.App.StoreService'
	];

	function GetStoresInfo(StoreService)
	{
		return StoreService.GetStoresInfo();
	}

	//############ Get all orders in store

	GetAllOrders.$inject = [
		'Intensive.App.StoreService'
	];

	function GetAllOrders(StoreService)
	{
		return StoreService.GetAllOrders();
	}

	//############ Get All Bouquets

	GetAllBouquets.$inject = [
		'Intensive.App.BouquetService'
	];

	function GetAllBouquets(BouquetService)
	{
		return BouquetService.GetAllBouquets();
	}

	//############ Get All Contacts

	GetAllContacts.$inject = [
		'Intensive.App.ContactService'
	];

	function GetAllContacts(ContactService)
	{
		return ContactService.GetAllContacts();
	}

})();