angular.module('streama').run(['$templateCache', function($templateCache) {
    $templateCache.put('/streama/typeahead--tvShow.htm', '<a> <img ng-show="match.model.poster_path" ng-src="https://image.tmdb.org/t/p/w92/{{match.model.poster_path}}" width="60px"/> <img ng-show="!match.model.poster_path" ng-src="/assets/poster-not-found.png" width="60px"/> &nbsp; <span ng-bind-html="match.model.name | uibTypeaheadHighlight:query"></span> <span ng-show="match.model.first_air_date" style="opacity: .5;">({{match.model.first_air_date.substring(0, 4)}})</span> </a>');
}]);
