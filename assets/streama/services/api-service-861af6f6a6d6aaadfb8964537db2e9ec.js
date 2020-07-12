//# sourceMappingURL=api-service.js.map
angular.module("streama").factory("apiService",["$http","$rootScope","contextPath",function(b,d,e){return{currentUser:function(){return b.get("user/current.json")},tvShow:{get:function(a){return b.get("tvShow/show.json",{params:{id:a}})},save:function(a){return b.post("tvShow/save.json",a)},delete:function(a){return b.delete("tvShow/delete.json",{params:{id:a}})},list:function(a){return b.get("tvShow.json",{params:a})},episodesForTvShow:function(a){return b.get("tvShow/episodesForTvShow.json",{params:{id:a}})},
adminEpisodesForTvShow:function(a){return b.get("tvShow/adminEpisodesForTvShow.json",{params:{id:a}})},removeSeason:function(a,c){return b.get("tvShow/removeSeason.json",{params:{showId:a,season_number:c}})}},user:{save:function(a){return b.post("user/save.json",a)},delete:function(a){return b.delete("user/delete.json",{params:{id:a}})},list:function(){return b.get("user.json")},checkAvailability:function(a,c){return b.get("user/checkAvailability.json",{params:{username:a,isInvite:c}})},saveAndCreateUser:function(a){return b.post("user/saveAndCreateUser.json",
a)},saveAndInviteUser:function(a){return b.post("user/saveAndInviteUser.json",a)},saveProfile:function(a){return b.post("user/saveProfile.json",a)},availableRoles:function(){return b.get("user/availableRoles.json")},changePassword:function(a){return b.post("user/changePassword.json",a)}},userActivity:{list:function(a){return b.get("userActivity.json",{params:a})}},tag:{save:function(a){return b.post("tag/save.json",a)},delete:function(a){return b.delete("tag/delete.json",{params:{id:a}})},list:function(){return b.get("tag.json")}},
video:{get:function(a){return b.get("video/show.json",{params:{id:a}})},save:function(a){return b.post("video/save.json",a)},delete:function(a){return b.delete("video/delete.json",{params:{id:a}})},list:function(a){return b.get("video.json",{params:a})},dash:function(){return b.get("video/dash.json")},removeFile:function(a,c){return b.get("video/removeFile.json",{params:{videoId:a,fileId:c}})},listAllFiles:function(a){return b.get("file.json",{params:a})},removeFileFromDisk:function(a,c){return b.delete("file/removeFileFromDisk.json",
{params:{id:a,path:c}})},removeMultipleFilesFromDisk:function(a){return b.delete("file/removeMultipleFilesFromDisk.json",{params:{id:a}})},cleanUpFiles:function(a){return b.delete("file/cleanUpFiles.json",{params:{type:a}})},addFile:function(a,c){return b.get("video/addFile.json",{params:{videoId:a,fileId:c}})},refetch:function(a){return b.get("video/refetch.json",{params:{videoId:a}})},addExternalUrl:function(a){return b.get("video/addExternalUrl.json",{params:a})},addLocalFile:function(a){return b.get("video/addLocalFile.json",
{params:a})}},report:{list:function(a){return b.get("report.json",{params:a})},reportsById:function(a){return b.get("report/reportsById.json",{params:{videoId:a}})},save:function(a,c){return b.put("report/save.json",{videoId:a,errorCode:c})},resolve:function(a){return b.post("report/resolve.json",{reportId:a})},unresolve:function(a){return b.post("report/unresolve.json",{reportId:a})},resolveMultiple:function(a){return b.post("report/resolveMultiple.json",{ids:a})}},file:{localFiles:function(a){return b.get("file/localFiles.json",
{params:{path:a}})},matchMetaDataFromFiles:function(a){return b.post("file/matchMetaDataFromFiles.json",{files:a})},bulkAddMediaFromFile:function(a){return b.post("file/bulkAddMediaFromFile.json",{files:a})},save:function(a){return b.post("file/save.json",a)},getURL:function(a){return b.get("file/getURL.json",{params:{id:a}})}},episode:{get:function(a){return b.get("episode/show.json",{params:{id:a}})},save:function(a){return b.post("episode/save.json",a)},delete:function(a){return b.delete("episode/delete.json",
{params:{id:a}})},list:function(a){return b.get("episode.json",{params:a})}},movie:{get:function(a){return b.get("movie/show.json",{params:{id:a}})},getsimilar:function(a){return b.get("movie/getsimilar.json",{params:{id:a}})},save:function(a){return b.post("movie/save.json",a)},delete:function(a){return b.delete("movie/delete.json",{params:{id:a}})},list:function(a){return b.get("movie.json",{params:a})}},genericVideo:{get:function(a){return b.get("genericVideo/show.json",{params:{id:a}})},save:function(a){return b.post("genericVideo/save.json",
a)},delete:function(a){return b.delete("genericVideo/delete.json",{params:{id:a}})},list:function(){return b.get("genericVideo.json")}},viewingStatus:{save:function(a){return b.get("viewingStatus/save.json",{params:a})},markCompleted:function(a){return b.get("viewingStatus/markCompleted.json",{params:{id:a.id}})},delete:function(a){return b.delete("viewingStatus/delete.json",{params:{id:a}})}},watchlistEntry:{create:function(a){return b.post("watchlistEntry/create.json",{params:{id:a.id,mediaType:a.mediaType}})},
delete:function(a){return b.delete("watchlistEntry/delete.json",{params:{id:a.id,mediaType:a.mediaType}})},list:function(a){return b.get("watchlistEntry/list.json",{params:a})}},genres:{get:function(a){return b.get("genre/show.json",{params:{id:a}})},list:function(){return b.get("genre.json")}},settings:{list:function(){return b.get("settings.json")},updateMultiple:function(a){return b.post("settings/updateMultiple.json",a)},validateSettings:function(a){return b.post("settings/validateSettings.json",
a)}},notification:{list:function(){return b.get("notificationQueue/index.json")},listNewReleases:function(){return b.get("notificationQueue/listNewReleases.json")},addMovieToCurrentNotification:function(a){return b.get("notificationQueue/addMovieToCurrentNotification.json",{params:{id:a}})},highlightOnDashboard:function(a){return b.post("notificationQueue/highlightOnDashboard.json",a)},addTvShowToCurrentNotification:function(a,c){return b.get("notificationQueue/addTvShowToCurrentNotification.json",
{params:{id:a,description:c}})},sendCurrentNotifcation:function(){return b.get("notificationQueue/sendCurrentNotifcations.json")},delete:function(a){return b.delete("notificationQueue/delete.json",{params:{id:a}})}},theMovieDb:{hasKey:function(a){return b.get("theMovieDb/hasKey.json")},search:function(a,c){return b.get("theMovieDb/search.json",{params:{type:a,name:c}})},seasonNumberForShow:function(a){return b.get("theMovieDb/seasonNumberForShow.json",{params:a})},seasonForShow:function(a){return b.get("theMovieDb/seasonForShow.json",
{params:a})},availableGenres:function(a){return b.get("theMovieDb/availableGenres.json")},countNewEpisodesForSeason:function(a){return b.get("theMovieDb/countNewEpisodesForSeason",{params:a})},imagesForMedia:function(a){return b.get("theMovieDb/imagesForMedia",{params:a})},checkAndFixImageIntegrity:function(a){return b.post("theMovieDb/checkAndFixImageIntegrity.json",a)},pollImageIntegrityFix:function(a){return b.get("theMovieDb/pollImageIntegrityFix.json",a)}},dash:{searchMedia:function(a){return b.get("dash/searchMedia.json",
{params:{query:a}})},listContinueWatching:function(){return b.get("dash/listContinueWatching.json")},listMovies:function(a){return b.get("dash/listMovies.json",{params:a})},listShows:function(a){return b.get("dash/listShows.json",{params:a})},firstEpisodeForShow:function(a){return b.get("dash/firstEpisodeForShow.json",{params:{id:a}})},listGenres:function(){return b.get("dash/listGenres.json")},listGenericVideos:function(a){return b.get("dash/listGenericVideos.json",{params:a})},listNewReleases:function(){return b.get("dash/listNewReleases.json")},
listRecommendations:function(){return b.get("dash/listRecommendations.json")}},websocket:{triggerPlayerAction:function(a){return b.get("websocket/triggerPlayerAction.json",{params:a})}},profile:{save:function(a){return b.post("profile/save",a)},update:function(a){return b.put("profile/update.json",a)},delete:function(a){return b.delete("profile/delete.json",{params:{id:a}})},getUserProfiles:function(){return b.get("profile/getUserProfiles.json")}}}}]);