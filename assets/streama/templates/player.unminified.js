angular.module('streama').run(['$templateCache', function($templateCache) {
    $templateCache.put('/streama/player.htm', '<div class="player-wrapper"> <streama-video-player options="videoOptions" ng-if="videoOptions.videoSrc"> </streama-video-player> </div>');
}]);
