//# sourceMappingURL=streama.routes.js.map
(function(){angular.module("streama").config(["$stateProvider",function(g){function e(b,d){return b.currentUser().then(function(c){c=c.data;c||(location.href="/login/auth");if(c)return d.currentUser=c},function(c,a){401===a&&(location.href="/login/auth?sessionExpired=true")})}function b(b,d,c){return b.currentUser().then(function(a){a=a.data;a||(location.href="/login/auth");if(a.isAdmin)return d.currentUser=a;c.go("dash")})}function f(b,d,c){return b.currentUser().then(function(a){a=a.data;a||(location.href=
"/login/auth");if(a&&a.authorities.length)return d.currentUser=a;c.go("dash")})}g.state("dash",{url:"/dash?genreId?mediaModal?mediaType?dashType",templateUrl:"/streama/dash.htm",controller:"dashCtrl as vm",reloadOnSearch:!1,resolve:{currentUser:e}}).state("player",{url:"/player/:videoId?currentTime?sessionId",templateUrl:"/streama/player.htm",controller:"playerCtrl",resolve:{currentUser:e}}).state("sub-profiles",{url:"/sub-profiles",templateUrl:"/streama/sub-profiles.htm",controller:"subProfilesCtrl"}).state("userSettings",
{url:"/user-settings",templateUrl:"/streama/user-settings.htm",controller:"userSettingsCtrl",resolve:{currentUser:e}}).state("help",{url:"/help",templateUrl:"/streama/help.htm",controller:"helpCtrl"}).state("admin",{url:"/admin",templateUrl:"/streama/admin.htm",controller:"adminCtrl",resolve:{currentUser:f}}).state("admin.fileManager",{url:"/fileManager",templateUrl:"/streama/admin-fileManager.htm",controller:"adminFileManagerCtrl"}).state("admin.movies",{url:"/movies",templateUrl:"/streama/admin-movies.htm",
controller:"adminMoviesCtrl as vm"}).state("admin.movie",{url:"/movie/:movieId",templateUrl:"/streama/admin-movie.htm",controller:"adminMovieCtrl"}).state("admin.videos",{url:"/videos",templateUrl:"/streama/admin-videos.htm",controller:"adminVideosCtrl"}).state("admin.video",{url:"/video/:videoId",templateUrl:"/streama/admin-video.htm",controller:"adminVideoCtrl"}).state("admin.notifications",{url:"/notifications",templateUrl:"/streama/admin-notifications.htm",controller:"adminNotificationsCtrl",
resolve:{currentUser:b}}).state("admin.newReleases",{url:"/newReleases",templateUrl:"/streama/admin-new-releases.htm",controller:"adminNewReleasesCtrl"}).state("admin.shows",{url:"/shows",templateUrl:"/streama/admin-shows.htm",controller:"adminShowsCtrl"}).state("admin.show",{url:"/show/:showId?episodeId?season",templateUrl:"/streama/admin-show.htm",controller:"adminShowCtrl"}).state("admin.reports",{url:"/reports",templateUrl:"/streama/admin-reports.htm",controller:"adminReportsCtrl",controllerAs:"vm"}).state("settings.users",
{url:"/users",templateUrl:"/streama/settings-users.htm",controller:"settingsUsersCtrl",resolve:{currentUser:b}}).state("settings.userActivity",{url:"/user-activity",templateUrl:"/streama/settings-user-activity.htm",controller:"settingsUserActivityCtrl",controllerAs:"vm",resolve:{currentUser:b}}).state("settings.settings",{url:"/settings",templateUrl:"/streama/settings-settings.htm",controller:"settingsSettingsCtrl",resolve:{currentUser:b}}).state("settings",{url:"/settings",templateUrl:"/streama/settings.htm",
controller:"settingsCtrl",resolve:{currentUser:f}});e.$inject=["apiService","$rootScope"];b.$inject=["apiService","$rootScope","$state"];f.$inject=["apiService","$rootScope","$state"]}])})();