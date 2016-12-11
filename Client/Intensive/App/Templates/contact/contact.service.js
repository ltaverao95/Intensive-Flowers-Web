(function(){

	'use strict';

	angular
		.module('Intensive.App')
		.service('Intensive.App.ContactService', ContactService);

	ContactService.$inject = [
		'$http',
		'$q',
		'Intensive.Core.Constants'
	];	

	function ContactService($http,
							$q,
							CoreConstants)
	{
		//####################### Instance Properties #######################

		var _self = this;

		_self.GetAllContacts = GetAllContacts;
		_self.NewContactMessage = NewContactMessage;

		//####################### Public Functions #######################

		function GetAllContacts()
		{
			var deferred = $q.defer();

			var url = CoreConstants.USER_SERVICES_URL + "contact/getAllContacts.php";

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

		function NewContactMessage(objContactData)
		{
			var deferred = $q.defer();

			var url = CoreConstants.USER_SERVICES_URL + 'contact/newContact.php';

			$http.post(url, objContactData)
				.success(function(data){
					deferred.resolve(data);
				})
				.error(function(error){
					deferred.reject(error);
				});

			return deferred.promise;
		}
	}

})();