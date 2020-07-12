//# sourceMappingURL=admin-fileManager-ctrl.js.map
angular.module("streama").controller("adminFileManagerCtrl",["$scope","apiService","modalService","$state",function(a,d,f,g){a.maxPerPage=10;a.offset=0;a.pagination={};a.activeListDisplay="table";a.selectedFiles=[];a.changeListDisplay=function(b){a.activeListDisplay=b};a.removeFile=function(b){var c;c=b.isHardDriveFile?"This file is not associated with any object in the database and is therefore a sort of artifact. Do you want to remove it now?":b.videos&&b.videos.length?"This file is associated with "+
b.videos[0].title+". Do you want to remove this File from the hard drive?":"This file is not associated with any Video. Do you want to remove this File from the hard drive?";alertify.set({buttonReverse:!0,labels:{ok:"Yes",cancel:"Cancel"}});alertify.confirm(c,function(c){c&&d.video.removeFileFromDisk(b.id,b.path).then(function(){_.remove(a.files,{id:b.id});_.remove(a.files,{path:b.path});alertify.success("File deleted.")},function(a){console.log(a);alertify.error("An error occured. "+a.data)})})};
a.removeMultipleFiles=function(){0<a.selectedFiles.length&&(alertify.set({buttonReverse:!0,labels:{ok:"Yes",cancel:"Cancel"}}),alertify.confirm("This will delete all selected Files. Do you want to proceed?",function(b){b&&d.video.removeMultipleFilesFromDisk(a.selectedFiles).then(function(b){b=b.data;_.forEach(b.successes,function(b){_.remove(a.files,function(a){return a.id===b})});selectedFiles=[];alertify.success(b.successes.length+" of "+a.selectedFiles.length+" files deleted.")},function(b){alertify.error(data.successes.length+
" of "+a.selectedFiles.length+" files could be deleted. (this could be due to them being associated with the file-browser or an externalLink)")})}))};a.addOrRemoveFromSelection=function(b,c){b.target.checked?a.selectedFiles.push(c.id):_.remove(a.selectedFiles,function(a){return a===c.id})};a.pageChanged=function(){e({max:a.maxPerPage,filter:a.listFilter,offset:a.maxPerPage*(a.pagination.currentPage-1)})};a.refreshList=function(b){a.listFilter=b;e({max:a.maxPerPage,filter:b,offset:a.offset})};var e=
function(b){a.loading=!0;a.files=[];a.filesCount=0;d.video.listAllFiles(b).then(function(b){b=b.data;console.log(b);a.loading=!1;a.files=b.files;a.filesCount=b.count},function(){alertify.error("An error occurred.")})};a.cleanUpFiles=function(b){var c;"noVideos"==b?c="Are you sure you want to proceed? This will delete all file-objects that are missing the corresponding file in the file-system":"noFile"==b&&(c="Are you sure you want to proceed? This will delete all non-associated files from the harddrive");
alertify.set({buttonReverse:!0,labels:{ok:"Yes",cancel:"Cancel"}});alertify.confirm(c,function(c){c&&(a.loading=!0,d.video.cleanUpFiles(b).then(function(){a.refreshList("all")}))})};a.refreshList("all")}]);