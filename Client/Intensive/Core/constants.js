(function(){

	'use strict';

	var CoreConstants = {

		MessageServiceBaseURL: 'http://localhost:81/IntensiveFlowersWeb/Server/Services/api/Message/',
		MessageServiceURL: {
			GET_ALL_MESSAGES_URL: CoreConstants.MessageServiceBaseURL + 'GetAllMessages.php',
			SAVE_MESSAGE_URL: CoreConstants.MessageServiceBaseURL + 'SaveMessage.php',
			GET_ALL_MESSAGES_URL: CoreConstants.MessageServiceBaseURL + 'MessageServices.php',
			GET_ALL_MESSAGES_URL: CoreConstants.MessageServiceBaseURL + 'MessageServices.php',
			GET_ALL_MESSAGES_URL: CoreConstants.MessageServiceBaseURL + 'MessageServices.php'
		},
		
		USER_SERVICES_URL: 'http://localhost:81/IntensiveFlowersWeb/Server/DAL/UserServices/',
		ADMIN_SERVICES_URL: 'http://localhost:81/IntensiveFlowersWeb/Server/DAL/AdminServices/',
		JSON_DATA_URL: 'http://localhost:81/IntensiveFlowersWeb/Server/App_Data/JsonData/'
	};

	angular
		.module('Intensive.Core', [])
		.constant('Intensive.Core.Constants', CoreConstants);

})();