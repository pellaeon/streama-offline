angular.module('streama').run(['$templateCache', function($templateCache) {
    $templateCache.put('/streama/modal--image-chooser.htm', '<div class="modal-body"> <legend> Choose new Image </legend> <div class="row"> <div class="col-xs-6 col-md-4" ng-repeat="image in vm.imagesForMedia"> <a ng-click="vm.chooseImage(image)" class="thumbnail"> <img ng-src="https://image.tmdb.org/t/p/w300{{image.file_path}}" class=""/> </a> </div> </div> </div> <div class="modal-footer"> <button class="btn btn-default" ng-click="vm.close()">Close</button> </div>');
}]);
