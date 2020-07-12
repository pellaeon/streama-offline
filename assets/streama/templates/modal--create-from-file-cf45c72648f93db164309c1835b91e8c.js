//# sourceMappingURL=modal--create-from-file.js.map
angular.module("streama").run(["$templateCache",function(a){a.put("/streama/modal--create-from-file.htm",'<div class="modal-body"> <legend> Create {{vm.mediaType}}s from Files </legend> <div> <div class="form-group"> <input type="text" ng-model="vm.localFileSearch" class="form-control input-sm" placeholder="Search current directory..."> </div> </div> <div> <ul class="create-from-file-tree"> <li ng-repeat="file in vm.localFiles | orderBy: [\'-directory\', \'name\'] | filter:vm.localFileSearch" ng-include="\'/streama/modal--create-from-file-recursive-item.htm\'"> </li> </ul> </div> </div> <div class="modal-footer"> <button class="btn btn-success button-icon" ng-show="vm.matchResult" ng-click="vm.addAllMatches()"> Add all found matches </button> <button class="btn btn-success button-icon" ng-disabled="!vm.selection.length" ng-click="vm.runMatcher()"> Run Matcher <i class="ion-load-c spin" ng-show="vm.isMatcherLoading"></i> </button> <button class="btn btn-default" ng-disabled="vm.isMatcherLoading" ng-click="vm.close()">Close</button> </div>')}]);