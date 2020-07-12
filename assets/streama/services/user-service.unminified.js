'use strict';

angular.module('streama').factory('userService', ["$rootScope", "$translate", function ($rootScope, $translate) {
	return {
		setCurrentUser: function (data) {
			$rootScope.currentUser = data;
		}
	};
}]);

