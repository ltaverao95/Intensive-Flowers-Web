(function(){

	'use strict';

	angular
		.module('Intensive.Core')
		.filter('pagination', FilterPaginator);

	function FilterPaginator(){

		return function(input, start)
		{
			start =+ start;
			
			if(input > 0 || input.length > 0)
			{
				return input.slice(start);
			}
		};
	};	

})();