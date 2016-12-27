(function(){

	'use strict';

	var CoreConstants = {

		SERVER_API_RELATIVE_PATH: 'http://localhost:81/Intensive-Flowers-Web/Server/api/',

		MESSAGE_FILES_BASE_PATH: 'Message/',
		STORE_FILES_BASE_PATH: 'Store/',
		CONTACT_FILES_BASE_PATH: 'Contact/',
		LOGIN_FILES_BASE_PATH: 'Login/',

		UserLoggedInfoKey: 'UserLoggedInfo'
	};

	CoreConstants.MESSAGE_FILES_NAMES = {
		GET_ALL_MESSAGES_FILE: CoreConstants.MESSAGE_FILES_BASE_PATH + 'GetAllMessages.php',
		SAVE_MESSAGE_FILE: CoreConstants.MESSAGE_FILES_BASE_PATH + 'SaveMessage.php',
		DELETE_ALL_MESSAGES_FILE: CoreConstants.MESSAGE_FILES_BASE_PATH + 'DeleteAllMessages.php',
		DELETE_MESSAGE_BY_ID_FILE: CoreConstants.MESSAGE_FILES_BASE_PATH + 'DeleteMessageByID.php',
		DELETE_MESSAGES_SELECTED_FILE: CoreConstants.MESSAGE_FILES_BASE_PATH + 'DeleteMessagesSelected.php',
		UPDATE_MESSAGE_SELECTED_FILE: CoreConstants.MESSAGE_FILES_BASE_PATH + 'UpdateMessageByID.php'
	};

	CoreConstants.STORE_FILES_NAMES = {
		SAVE_ORDER_FILE: CoreConstants.STORE_FILES_BASE_PATH + 'SaveOrder.php',
		GET_ALL_ORDERS_FILE: CoreConstants.STORE_FILES_BASE_PATH + 'GetAllOrders.php',
		GET_ORDER_BY_IDENTITY_CARD_FILE: CoreConstants.STORE_FILES_BASE_PATH + 'GetOrderByIdentityCard.php',
		GET_ORDER_BY_NAME_FILE: CoreConstants.STORE_FILES_BASE_PATH + 'GetOrderByName.php',
		GET_ORDER_BY_DATE_AND_STORE_NAME_FILE: CoreConstants.STORE_FILES_BASE_PATH + 'GetOrderByDateAndStoreName.php',
		GET_ORDER_BY_STORE_NAME_FILE: CoreConstants.STORE_FILES_BASE_PATH + 'GetOrderByStoreName.php',
		DELETE_ALL_ORDERS_FILE: CoreConstants.STORE_FILES_BASE_PATH + 'DeleteAllOrders.php',
		DELETE_ORDER_BY_ID_FILE: CoreConstants.STORE_FILES_BASE_PATH + 'DeleteOrderById.php',
		DELETE_ORDERS_SELECTED_FILE: CoreConstants.STORE_FILES_BASE_PATH + 'DeleteAllOrdersSelected.php',
		UPDATE_ORDER_SELECTED_FILE: CoreConstants.STORE_FILES_BASE_PATH + 'UpdateOrderByID.php'
	};

	CoreConstants.CONTACT_FILES_NAMES = {
		GET_ALL_CONTACTS_FILE: CoreConstants.CONTACT_FILES_BASE_PATH + 'GetAllContacts.php',
		SAVE_CONTACT_FILE: CoreConstants.CONTACT_FILES_BASE_PATH + 'SaveContact.php',
		DELETE_ALL_CONTACTS_FILE: CoreConstants.CONTACT_FILES_BASE_PATH + 'DeleteAllContacts.php',
		DELETE_CONTACT_BY_ID_FILE: CoreConstants.CONTACT_FILES_BASE_PATH + 'DeleteContactByID.php',
		DELETE_CONTACTS_SELECTED_FILE: CoreConstants.CONTACT_FILES_BASE_PATH + 'DeleteContactsSelected.php',
		UPDATE_CONTACT_SELECTED_FILE: CoreConstants.CONTACT_FILES_BASE_PATH + 'UpdateContactByID.php'
	};

	CoreConstants.LOGIN_FILES_NAMES = {
		SIGN_IN_FILE: CoreConstants.LOGIN_FILES_BASE_PATH + 'SignIn.php',
		LOG_OUT_FILE: CoreConstants.LOGIN_FILES_BASE_PATH + 'LogOut.php',
		SAVE_USER_FILE: CoreConstants.LOGIN_FILES_BASE_PATH + 'SaveNewUser.php',
		GET_ALL_USERS_FILE: CoreConstants.LOGIN_FILES_BASE_PATH + 'GetAllUsers.php',
		GET_USER_LOGGED_INFO_BY_ID_FILE: CoreConstants.LOGIN_FILES_BASE_PATH + 'GetUserLoggedInfoByID.php',
		UPDATE_USER_LOGGED_INFO_BY_ID_FILE: CoreConstants.LOGIN_FILES_BASE_PATH + 'UpdateUserLoggedInfoByID.php',
		DELETE_USER_LOGGED_INFO_BY_ID_FILE: CoreConstants.LOGIN_FILES_BASE_PATH + 'DeleteUserLoggedInfoByID.php',
		DELETE_ALL_USERS_FILE: CoreConstants.LOGIN_FILES_BASE_PATH + 'DeleteAllUsers.php',
		DELETE_USER_BY_ID_FILE: CoreConstants.LOGIN_FILES_BASE_PATH + 'DeleteUserByID.php',
		DELETE_USERS_SELECTED_FILE: CoreConstants.LOGIN_FILES_BASE_PATH + 'DeleteUsersSelected.php'
	};

	CoreConstants.MessageServiceURL = {
		GET_ALL_MESSAGES_URL: CoreConstants.SERVER_API_RELATIVE_PATH + CoreConstants.MESSAGE_FILES_NAMES.GET_ALL_MESSAGES_FILE,
		SAVE_MESSAGE_URL: CoreConstants.SERVER_API_RELATIVE_PATH + CoreConstants.MESSAGE_FILES_NAMES.SAVE_MESSAGE_FILE,
		DELETE_ALL_MESSAGES_URL: CoreConstants.SERVER_API_RELATIVE_PATH + CoreConstants.MESSAGE_FILES_NAMES.DELETE_ALL_MESSAGES_FILE,
		DELETE_MESSAGE_BY_ID_URL: CoreConstants.SERVER_API_RELATIVE_PATH + CoreConstants.MESSAGE_FILES_NAMES.DELETE_MESSAGE_BY_ID_FILE,
		DELETE_MESSAGES_SELECTED_URL: CoreConstants.SERVER_API_RELATIVE_PATH + CoreConstants.MESSAGE_FILES_NAMES.DELETE_MESSAGES_SELECTED_FILE,
		UPDATE_MESSAGE_SELECTED_URL: CoreConstants.SERVER_API_RELATIVE_PATH + CoreConstants.MESSAGE_FILES_NAMES.UPDATE_MESSAGE_SELECTED_FILE
	};

	CoreConstants.StoreServiceURL = {
		GET_ALL_ORDERS_URL: CoreConstants.SERVER_API_RELATIVE_PATH + CoreConstants.STORE_FILES_NAMES.GET_ALL_ORDERS_FILE,
		GET_ORDER_BY_IDENTITY_CARD_URL: CoreConstants.SERVER_API_RELATIVE_PATH + CoreConstants.STORE_FILES_NAMES.GET_ORDER_BY_IDENTITY_CARD_FILE,
		GET_ORDER_BY_NAME_URL: CoreConstants.SERVER_API_RELATIVE_PATH + CoreConstants.STORE_FILES_NAMES.GET_ORDER_BY_NAME_FILE,
		GET_ORDER_BY_DATE_AND_STORE_NAME_URL: CoreConstants.SERVER_API_RELATIVE_PATH + CoreConstants.STORE_FILES_NAMES.GET_ORDER_BY_DATE_AND_STORE_NAME_FILE,
		GET_ORDER_BY_STORE_NAME_URL: CoreConstants.SERVER_API_RELATIVE_PATH + CoreConstants.STORE_FILES_NAMES.GET_ORDER_BY_STORE_NAME_FILE,
		SAVE_ORDER_URL: CoreConstants.SERVER_API_RELATIVE_PATH + CoreConstants.STORE_FILES_NAMES.SAVE_ORDER_FILE,
		DELETE_ALL_ORDERS_URL: CoreConstants.SERVER_API_RELATIVE_PATH + CoreConstants.STORE_FILES_NAMES.DELETE_ALL_ORDERS_FILE,
		DELETE_ORDER_BY_ID_URL: CoreConstants.SERVER_API_RELATIVE_PATH + CoreConstants.STORE_FILES_NAMES.DELETE_ORDER_BY_ID_FILE,
		DELETE_ORDERS_SELECTED_URL: CoreConstants.SERVER_API_RELATIVE_PATH + CoreConstants.STORE_FILES_NAMES.DELETE_ORDERS_SELECTED_FILE,
		UPDATE_ORDER_SELECTED_URL: CoreConstants.SERVER_API_RELATIVE_PATH + CoreConstants.STORE_FILES_NAMES.UPDATE_ORDER_SELECTED_FILE
	};

	CoreConstants.ContactServiceURL = {
		GET_ALL_CONTACTS_URL: CoreConstants.SERVER_API_RELATIVE_PATH + CoreConstants.CONTACT_FILES_NAMES.GET_ALL_CONTACTS_FILE,
		SAVE_CONTACT_URL: CoreConstants.SERVER_API_RELATIVE_PATH + CoreConstants.CONTACT_FILES_NAMES.SAVE_CONTACT_FILE,
		DELETE_ALL_CONTACTS_URL: CoreConstants.SERVER_API_RELATIVE_PATH + CoreConstants.CONTACT_FILES_NAMES.DELETE_ALL_CONTACTS_FILE,
		DELETE_CONTACT_BY_ID_URL: CoreConstants.SERVER_API_RELATIVE_PATH + CoreConstants.CONTACT_FILES_NAMES.DELETE_CONTACT_BY_ID_FILE,
		DELETE_CONTACTS_SELECTED_URL: CoreConstants.SERVER_API_RELATIVE_PATH + CoreConstants.CONTACT_FILES_NAMES.DELETE_CONTACTS_SELECTED_FILE,
		UPDATE_CONTACT_SELECTED_URL: CoreConstants.SERVER_API_RELATIVE_PATH + CoreConstants.CONTACT_FILES_NAMES.UPDATE_CONTACT_SELECTED_FILE
	};

	CoreConstants.LoginServiceURL = {
		SIGN_IN_URL: CoreConstants.SERVER_API_RELATIVE_PATH + CoreConstants.LOGIN_FILES_NAMES.SIGN_IN_FILE,
		LOG_OUT_URL: CoreConstants.SERVER_API_RELATIVE_PATH + CoreConstants.LOGIN_FILES_NAMES.LOG_OUT_FILE,
		SAVE_USER_URL: CoreConstants.SERVER_API_RELATIVE_PATH + CoreConstants.LOGIN_FILES_NAMES.SAVE_USER_FILE,
		GET_ALL_USERS_URL: CoreConstants.SERVER_API_RELATIVE_PATH + CoreConstants.LOGIN_FILES_NAMES.GET_ALL_USERS_FILE,
		GET_USER_LOGGED_INFO_BY_ID_URL: CoreConstants.SERVER_API_RELATIVE_PATH + CoreConstants.LOGIN_FILES_NAMES.GET_USER_LOGGED_INFO_BY_ID_FILE,
		UPDATE_USER_LOGGED_INFO_BY_ID_URL: CoreConstants.SERVER_API_RELATIVE_PATH + CoreConstants.LOGIN_FILES_NAMES.UPDATE_USER_LOGGED_INFO_BY_ID_FILE,
		DELETE_USER_LOGGED_INFO_BY_ID_URL: CoreConstants.SERVER_API_RELATIVE_PATH + CoreConstants.LOGIN_FILES_NAMES.DELETE_USER_LOGGED_INFO_BY_ID_FILE,
		DELETE_ALL_USERS_URL: CoreConstants.SERVER_API_RELATIVE_PATH + CoreConstants.LOGIN_FILES_NAMES.DELETE_ALL_USERS_FILE,
		DELETE_USER_BY_ID_URL: CoreConstants.SERVER_API_RELATIVE_PATH + CoreConstants.LOGIN_FILES_NAMES.DELETE_USER_BY_ID_FILE,
		DELETE_USERS_SELECTED_URL: CoreConstants.SERVER_API_RELATIVE_PATH + CoreConstants.LOGIN_FILES_NAMES.DELETE_USERS_SELECTED_FILE
	};

	angular
		.module('Intensive.Core')
		.constant('Intensive.Core.Constants', CoreConstants);
})();