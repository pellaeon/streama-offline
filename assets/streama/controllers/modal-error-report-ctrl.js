//# sourceMappingURL=modal-error-report-ctrl.js.map
(function(){angular.module("streama").controller("modalErrorReportCtrl",["apiService","$state","$uibModalInstance","errorCode","videoData","$rootScope",function(f,a,g,d,b,e){function c(){e.currentUser.isAdmin||e.currentUser.isContentManager?b.show?a.go("admin.show",{showId:b.show.id}):a.go("admin.movie",{movieId:b.id}):a.go("dash");g.close()}this.close=function(a){"withReport"===a?f.report.save(b.id,d).then(function(){c();alertify.success("Report sent successfully.")},function(a){c();alertify.error(a.data)}):
c()};this.errorCode=d}])})();