angular.module('streama').run(['$templateCache', function($templateCache) {
    $templateCache.put('/streama/modal--error-report.htm', '<div class="modal-body"> <p>{{\'MESSAGES.\' + vm.errorCode | translate}}</p> </div> <div class="modal-footer"> <button class="btn btn-sm" ng-click="vm.close(\'withReport\', vm.videoId)">Send Report</button> <button class="btn btn-sm" ng-click="vm.close()">Close</button> </div>');
}]);
