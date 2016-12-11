(function(){

	'use strict';

	angular
		.module('Intensive.App')
		.service('Intensive.App.ContactLoginService', ContactLoginService);

	ContactLoginService.$inject = [
		'$q',
		'$http',
		'Intensive.Core.Constants'
	];	

	function ContactLoginService($q,
								 $http,
								 CoreConstants)
	{
		//####################### Instance Properties #######################

		var _self = this;

		_self.DeleteContactByID = DeleteContactByID;
		_self.DeleteAllContacts = DeleteAllContacts;
		_self.DeleteContactsSelectedByID = DeleteContactsSelectedByID;
		_self.UpdateContactByID = UpdateContactByID;

		//####################### Public Functions #######################

		function DeleteContactByID(clientObj)
		{
			var deferred = $q.defer();

			var url = CoreConstants.ADMIN_SERVICES_URL + "contact/deleteContactByID.php";

			$http.post(url, clientObj)
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

		function DeleteAllContacts()
		{
			var deferred = $q.defer();

			var url = CoreConstants.ADMIN_SERVICES_URL + "contact/deleteAllContacts.php";

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

		function DeleteContactsSelectedByID(clientObj)
		{
			var deferred = $q.defer();

			var url = CoreConstants.ADMIN_SERVICES_URL + "contact/deleteContactsSelectedByID.php";

			$http.post(url, clientObj)
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

		function UpdateContactByID(clientObj)
		{
			var deferred = $q.defer();

			var url = CoreConstants.ADMIN_SERVICES_URL + "contact/updateContactByID.php";

			$http.post(url, clientObj)
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
	}

})();