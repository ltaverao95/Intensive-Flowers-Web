(function(){

	'use strict';

	angular
		.module('Intensive.App')
		.factory('Intensive.App.QueryDataModel', QueryDataModel);

	function QueryDataModel()
	{
		var Model = function(dataDTO)
		{
			var _self = this;
			
			angular.extend(this, {
				ResultData: null,
				NameToSearch: null,
				DateToSearch: new Date(),
				StoreName: null
			}, dataDTO);

		};

		return Model;

	};	

})();