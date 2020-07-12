//# sourceMappingURL=modal-video-ctrl.js.map
angular.module("streama").controller("modalVideoCtrl",["$scope","$uibModalInstance","apiService","video","isManual","tvShow","uploadService",function(a,d,e,g,h,f,k){a.loading=!1;a.addManually=h;a.episode=g||{};a.saveEpisode=function(a){f&&(a.show=f.id);delete a.dateCreated;delete a.lastUpdated;e.episode.save(a).then(function(a){d.close(a);alertify.success("Video saved.")},function(){alertify.error("An error occured.")})};a.imageUpload={};a.uploadImage=function(c,b){k.doUpload(a.imageUpload,"file/upload.json",
function(c){a.imageUpload.percentage=null;c.error||(a.episode[b]=c,a.episode[b+"_src"]=c.src)},function(){},c)};a.deleteVideo=function(a){alertify.set({buttonReverse:!0,labels:{ok:"Yes",cancel:"Cancel"}});alertify.confirm("Are you sure you want to delete this Episode?",function(b){b&&e.video.delete(a.id).then(function(){d.close({deleted:!0})})})};a.refetch=function(a){alertify.set({buttonReverse:!0,labels:{ok:"Yes",cancel:"Cancel"}});alertify.confirm("Are you sure you want to re-fetch the meta-data from TheMovieDb? All your changes except for the added files will be overridden.",
function(b){b&&e.video.refetch(a.id).then(function(b){_.assign(a,b.data);alertify.success("Fetch successful")})})};setTimeout(function(){$(".name-input").focus()},200);a.cancel=function(){d.dismiss("cancel")}}]);