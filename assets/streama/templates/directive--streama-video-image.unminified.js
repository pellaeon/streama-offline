angular.module('streama').run(['$templateCache', function($templateCache) {
    $templateCache.put('/streama/directive--streama-video-image.htm', '<img ng-if="video[type + \'_image_src\']" ng-src="{{::video[type + \'_image_src\']}}"/> <img ng-if="!video[type + \'_image_src\'] && video[type + \'_path\']" ng-src="https://image.tmdb.org/t/p/w{{size}}/{{::video[type + \'_path\']}}"/> <img ng-if="!video[type + \'_path\'] && !video[type + \'_image_src\']" ng-src="{{$root.basePath}}assets/poster-not-found.png"/>');
}]);
