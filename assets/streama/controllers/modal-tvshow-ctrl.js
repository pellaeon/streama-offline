//# sourceMappingURL=modal-tvshow-ctrl.js.map
angular.module("streama").controller("modalTvShowCtrl",["$scope","$uibModalInstance","apiService","tvShow",function(a,d,c,e){a.loading=!1;a.tvShow=e||{};a.hasMovieDBKey=!0;a.cancel=function(){d.dismiss("cancel")};a.saveShow=function(a){c.tvShow.save(a).then(function(a){d.close(a.data);alertify.success("TV Show saved.")})};a.selectFromAPI=function(b){var c=b.id;delete b.id;a.tvShow=b;a.tvShow.apiId=c;a.hasMovieDBKey=!0;a.tvShow.manualInput=!1};a.search=function(a){return c.theMovieDb.search("tv",a).then(function(a){return a.data})};
a.toggleAddManually=function(){a.tvShow.manualInput=!a.tvShow.manualInput};(function(){c.genres.list().then(function(b){a.genres=b.data});c.theMovieDb.hasKey().then(function(b){b.data.key||(a.tvShow.manualInput=!0,a.hasMovieDBKey=!1)});setTimeout(function(){$(".name-input").focus()},200)})()}]);