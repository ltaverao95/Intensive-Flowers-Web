(function(){

	'use strict';

	var CoreConstants = {

		SERVER_API_RELATIVE_PATH: 'http://localhost:81/Intensive-Flowers-Web/Server/api/',

		MESSAGE_FILES_BASE_PATH: 'Message/',
		STORE_FILES_BASE_PATH: 'Store/',
		BOUQUET_FILES_BASE_PATH: 'Bouquet/',
		CONTACT_FILES_BASE_PATH: 'Contact/',
		LOGIN_FILES_BASE_PATH: 'Login/',
		ADMIN_FILES_BASE_PATH: 'Admin/',
		
		USER_SERVICES_URL: 'http://localhost:81/IntensiveFlowersWeb/Server/DAL/UserServices/',
		ADMIN_SERVICES_URL: 'http://localhost:81/IntensiveFlowersWeb/Server/DAL/AdminServices/',
		JSON_DATA_URL: 'http://localhost:81/IntensiveFlowersWeb/Server/App_Data/JsonData/'
	};

	CoreConstants.MESSAGE_FILES_NAMES = {
		GET_ALL_MESSAGES_FILE: CoreConstants.MESSAGE_FILES_BASE_PATH + 'GetAllMessages.php',
		SAVE_MESSAGE_FILE: CoreConstants.MESSAGE_FILES_BASE_PATH + 'SaveMessage.php',
		DELETE_ALL_MESSAGES_FILE: CoreConstants.MESSAGE_FILES_BASE_PATH + 'DeleteAllMessages.php',
		DELETE_MESSAGE_BY_ID_FILE: CoreConstants.MESSAGE_FILES_BASE_PATH + 'DeleteMessageByID.php',
		DELETE_MESSAGES_SELECTED_FILE: CoreConstants.MESSAGE_FILES_BASE_PATH + 'DeleteMessageByID.php',
		EDIT_MESSAGE_BY_ID_FILE: CoreConstants.MESSAGE_FILES_BASE_PATH + 'DeleteMessageByID.php'
	};

	CoreConstants.STORE_FILES_NAMES = {
		
	};

	CoreConstants.BOUQUET_FILES_NAMES = {
		
	};

	CoreConstants.CONTACT_FILES_NAMES = {
		
	};

	CoreConstants.LOGIN_FILES_NAMES = {
		
	};

	CoreConstants.ADMIN_FILES_NAMES = {
		
	};

	CoreConstants.MessageServiceURL = {
		GET_ALL_MESSAGES_URL: CoreConstants.SERVER_API_RELATIVE_PATH + CoreConstants.MESSAGE_FILES_NAMES.GET_ALL_MESSAGES_FILE,
		SAVE_MESSAGE_URL: CoreConstants.SERVER_API_RELATIVE_PATH + CoreConstants.MESSAGE_FILES_NAMES.SAVE_MESSAGE_FILE,
		DELETE_ALL_MESSAGES_URL: CoreConstants.SERVER_API_RELATIVE_PATH + CoreConstants.MESSAGE_FILES_NAMES.DELETE_ALL_MESSAGES_FILE,
		DELETE_MESSAGE_BY_ID_URL: CoreConstants.SERVER_API_RELATIVE_PATH + CoreConstants.MESSAGE_FILES_NAMES.DELETE_MESSAGE_BY_ID_FILE,
		DELETE_MESSAGES_SELECTED_URL: CoreConstants.SERVER_API_RELATIVE_PATH + CoreConstants.MESSAGE_FILES_NAMES.DELETE_MESSAGES_SELECTED_FILE,
		EDIT_MESSAGE_BY_ID_URL: CoreConstants.SERVER_API_RELATIVE_PATH + CoreConstants.MESSAGE_FILES_NAMES.EDIT_MESSAGE_BY_ID_FILE,
	};

	CoreConstants.StoreServiceURL = {
		
	};

	CoreConstants.BouquetServiceURL = {
		
	};

	CoreConstants.ContactServiceURL = {
		
	};

	CoreConstants.LoginServiceURL = {
		
	};

	CoreConstants.AdminServiceURL = {
		
	};

	angular
		.module('Intensive.Core')
		.constant('Intensive.Core.Constants', CoreConstants);
})();