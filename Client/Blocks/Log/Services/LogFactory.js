(function(){

	'use strict';

	angular
		.module('Intensive.Blocks.Log')
		.factory('Intensive.Blocks.Log.LogFactory', LogFactory);

	LogFactory.$inject = [
		'$q',
		'$http',
		'Intensive.Blocks.Utils.ActionResultModel'
	];
	
	function LogFactory($q,
						$http,
						ActionResultModel)
	{

		var _writeLogURL = null;

		var service = {
			WriteLog: WriteLog
		};

		return service;

		//######## Public

		Object.defineProperty(service, "WriteLogURL", {
			get: function(){
				return _writeLogURL;
			},
			set: function(value) { _writeLogURL = value; }
		});

		function WriteLog(logFactoryDTO){

			var deferred = $q.defer();

			var actionResultModel = new ActionResultModel();

			var httpRequestParams = {
				method: 'POST',
				url: _writeLogURL,
				data: logFactoryDTO
			};

			$http(httpRequestParams)
				.success(
					function (data){
						deferred.resolve(new ActionResultModel(data));
					}
				)
				.error(
					function (error){
						actionResultModel.SetError(error);
						deferred.reject(actionResultModel);
					}
				);

			return deferred.promise;
		};
	};	

})();