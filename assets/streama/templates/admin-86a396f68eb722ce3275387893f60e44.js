//# sourceMappingURL=admin.js.map
angular.module("streama").run(["$templateCache",function(a){a.put("/streama/admin.htm",'<div class="admin"> <div class="nav"> <ul> <li ng-class="{\'active\': (isCurrentState(\'admin.shows\') || isCurrentState(\'admin.show\'))}" ng-if="$root.currentUser.isContentManager"> <a ui-sref="admin.shows">TV Shows</a> </li> <li ng-class="{\'active\': isCurrentState(\'admin.movies\')}" ng-if="$root.currentUser.isContentManager"> <a ui-sref="admin.movies">Movies</a> </li> <li ng-class="{\'active\': isCurrentState(\'admin.videos\')}" ng-if="$root.currentUser.isContentManager"> <a ui-sref="admin.videos">Other Videos</a> </li> <li ng-class="{\'active\': isCurrentState(\'admin.fileManager\')}" ng-if="$root.currentUser.isContentManager"> <a ui-sref="admin.fileManager">File Manager</a> </li> <li ng-class="{\'active\': isCurrentState(\'admin.notifications\')}" ng-if="$root.currentUser.isAdmin"> <a ui-sref="admin.notifications">Notifications</a> </li> <li ng-class="{\'active\': isCurrentState(\'admin.newReleases\')}" ng-if="$root.currentUser.isContentManager"> <a ui-sref="admin.newReleases">Dashboard Highlights</a> </li> <li ng-class="{\'active\': isCurrentState(\'admin.reports\')}" ng-if="$root.currentUser.isContentManager"> <a ui-sref="admin.reports">Reports</a> </li> </ul> </div> <div class="admin-content"> <ui-view/> </div> </div>')}]);