//# sourceMappingURL=admin-new-releases-ctrl.js.map
angular.module("streama").controller("adminNewReleasesCtrl",["$scope","apiService","modalService","$state",function(a,c,e,f){a.loading=!0;c.notification.listNewReleases().then(function(b){a.notifications=b.data;a.loading=!1});a.delete=function(b){alertify.set({buttonReverse:!0,labels:{ok:"Yes",cancel:"Cancel"}});alertify.confirm("Are you sure you want to delete this highlight?",function(d){d&&c.notification.delete(b.id).then(function(c){_.remove(a.notifications,{id:b.id})})})}}]);