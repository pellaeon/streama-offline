angular.module('streama').run(['$templateCache', function($templateCache) {
    $templateCache.put('/streama/popover--movie-files.htm', '<div class="files-wrapper" ng-show="movie.files.length"> <div class="file-wrapper" ng-repeat="file in movie.files"> <div class="file-name"> {{file.originalFilename}} &nbsp; <button ng-click="removeFile(file)" tooltip="Remove File" class="btn btn-danger btn-xxs"><i class="ion-close"></i></button> </div> </div> </div> <div class="files-wrapper" ng-show="movie.subtitles.length"> <hr/> <h4>Added Subtitles</h4> <div class="file-wrapper" ng-repeat="file in movie.subtitles"> <div class="file-name"> {{file.originalFilename}} &nbsp; <button ng-click="removeFile(file)" tooltip="Remove File" class="btn btn-danger btn-xxs"><i class="ion-close"></i></button> </div> </div> </div>');
}]);
