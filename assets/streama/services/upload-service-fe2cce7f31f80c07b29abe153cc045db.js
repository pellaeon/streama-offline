//# sourceMappingURL=upload-service.js.map
angular.module("streama").factory("uploadService",["$http","Upload","contextPath",function(l,e,f){return{doUpload:function(d,g,h,k,b){if(b&&b.length)for(var c=0;c<b.length;c++)e.upload({url:f+g,sendObjectsAsJsonBlob:!0,file:b[c]}).progress(function(a){a=parseInt(100*a.loaded/a.total);d.percentage=a}).success(h||angular.noop).error(function(a){console.log("%c err","color: deeppink; font-weight: bold; text-shadow: 0 0 5px deeppink;",arguments);alertify.error("File upload failed. Please close this popup and try again.",
0);d.percentage=null;(k||angular.noop)(a)})}}}]);