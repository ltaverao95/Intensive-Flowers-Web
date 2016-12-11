(function(){

	'use strict';

	angular
		.module('Intensive.App')
		.service('Intensive.App.MessageLoginService', MessageLoginService);

	MessageLoginService.$inject = [
		'$q',
		'$http',
		'Intensive.Core.Constants'
	];	

	function MessageLoginService($q,
								 $http,
								 CoreConstants)
	{
		//####################### Instance Properties #######################
		
		var _self = this;

		_self.DeleteMessageByID = DeleteMessageByID;
		_self.DeleteAllMessages = DeleteAllMessages;
		_self.DeleteMessagessSelectedByID = DeleteMessagessSelectedByID;
		_self.UpdateMessageByID = UpdateMessageByID;

		//####################### Public Functions #######################

		function DeleteMessageByID(messageObj)
		{
			var deferred = $q.defer();

			var url = CoreConstants.ADMIN_SERVICES_URL + "message/deleteMessageByID.php";

			$http.post(url, messageObj)
			.success(
				function (data){
					deferred.resolve(data);
				}
			)
			.error(
				function (error){
					deferred.reject(error);
				}
			);

			return deferred.promise;
		}

		function DeleteAllMessages()
		{
			var deferred = $q.defer();

			var url = CoreConstants.ADMIN_SERVICES_URL + "message/deleteAllMessages.php";

			$http.get(url)
			.success(
				function(data)
				{
					deferred.resolve(data);
				}
			).error(
				function(error)
				{
					deferred.reject(error);
				}
			);

			return deferred.promise;
		}

		function DeleteMessagessSelectedByID(messageObj)
		{
			var deferred = $q.defer();

			var url = CoreConstants.ADMIN_SERVICES_URL + "message/deleteMessagesSelectedByID.php";

			$http.post(url, messageObj)
			.success(
				function (data){
					deferred.resolve(data);
				}
			)
			.error(
				function (error){
					deferred.reject(error);
				}
			);

			return deferred.promise;
		}

		function UpdateMessageByID(messageObj)
		{
			var deferred = $q.defer();

			var url = CoreConstants.ADMIN_SERVICES_URL + "message/updateMessageByID.php";

			$http.post(url, messageObj)
			.success(
				function (data){
					deferred.resolve(data);
				}
			)
			.error(
				function (error){
					deferred.reject(error);
				}
			);

			return deferred.promise;
		}
	};

})();