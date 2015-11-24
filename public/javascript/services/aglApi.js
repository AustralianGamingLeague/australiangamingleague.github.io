(function(){
'use strict';

// TODO Doco
// TODO Consider moving each api into its own service eg. userService.

// TODO need to open a loading modal here maybe

var aglApiService = angular.module('aglApiService', []);

aglApiService.factory('aglApi', ['$http', function ($http) {

	return {

		createUser : function (properties, callback) {
			$http({
				method: 'POST',
				url   : '/api/users'
			}).then(function success (response) {
				// TODO Should alter API to return correct HTTP codes so this condition isn't needed.
				if (response.data.success) {
					return handleSuccessResponse(response, callback);
				}
				else {
					return handleErrorResponse(response, callback);
				}
			}, function error (response) {
				return handleErrorResponse(response, callback);
			});
		},

	};
}]);

function handleSuccessResponse (response, callback) {
	return callback(null, response.data.data);
}

function handleErrorResponse (response, callback) {
	// TODO need to check if there are any errors first. (500 response etc)
	return callback(response.data.errors);
}

})();
