//# sourceMappingURL=angular-resource.js.map
/*
 AngularJS v1.4.12
 (c) 2010-2015 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(J,f,K){function D(u,e){e=e||{};f.forEach(e,function(f,k){delete e[k]});for(var k in u)!u.hasOwnProperty(k)||"$"===k.charAt(0)&&"$"===k.charAt(1)||(e[k]=u[k]);return e}var z=f.$$minErr("$resource"),C=/^(\.[a-zA-Z_$@][0-9a-zA-Z_$@]*)+$/;f.module("ngResource",["ng"]).provider("$resource",function(){var u=/^https?:\/\/[^\/]*/,e=this;this.defaults={stripTrailingSlashes:!0,actions:{get:{method:"GET"},save:{method:"POST"},query:{method:"GET",isArray:!0},remove:{method:"DELETE"},"delete":{method:"DELETE"}}};
this.$get=["$http","$log","$q",function(k,F,G){function x(f,g){this.template=f;this.defaults=r({},e.defaults,g);this.urlParams={}}function A(l,g,t,h){function c(a,q){var c={};q=r({},g,q);v(q,function(b,q){y(b)&&(b=b());var m;if(b&&b.charAt&&"@"==b.charAt(0)){m=a;var d=b.substr(1);if(null==d||""===d||"hasOwnProperty"===d||!C.test("."+d))throw z("badmember",'Dotted member path "@{0}" is invalid.',d);for(var d=d.split("."),n=0,g=d.length;n<g&&f.isDefined(m);n++){var e=d[n];m=null!==m?m[e]:void 0}}else m=
b;c[q]=m});return c}function H(a){return a.resource}function d(a){D(a||{},this)}var u=new x(l,h);t=r({},e.defaults.actions,t);d.prototype.toJSON=function(){var a=r({},this);delete a.$promise;delete a.$resolved;return a};v(t,function(a,q){var g=/^(POST|PUT|PATCH)$/i.test(a.method);d[q]=function(b,B,m,e){var n={},h,l,t;switch(arguments.length){case 4:t=e,l=m;case 3:case 2:if(y(B)){if(y(b)){l=b;t=B;break}l=B;t=m}else{n=b;h=B;l=m;break}case 1:y(b)?l=b:g?h=b:n=b;break;case 0:break;default:throw z("badargs",
"Expected up to 4 arguments [params, data, success, error], got {0} arguments",arguments.length);}var x=this instanceof d,p=x?h:a.isArray?[]:new d(h),w={},A=a.interceptor&&a.interceptor.response||H,C=a.interceptor&&a.interceptor.responseError||void 0;v(a,function(a,b){switch(b){default:w[b]=I(a);break;case "params":case "isArray":case "interceptor":break;case "timeout":a&&!f.isNumber(a)&&F.debug("ngResource:\n  Only numeric values are allowed as `timeout`.\n  Promises are not supported in $resource, because the same value would be used for multiple requests.\n  If you need support for cancellable $resource actions, you should upgrade to version 1.5 or higher.")}});
g&&(w.data=h);u.setUrlParams(w,r({},c(h,a.params||{}),n),a.url);n=k(w).then(function(b){var c=b.data,m=p.$promise;if(c){if(f.isArray(c)!==!!a.isArray)throw z("badcfg","Error in resource configuration for action `{0}`. Expected response to contain an {1} but got an {2} (Request: {3} {4})",q,a.isArray?"array":"object",f.isArray(c)?"array":"object",w.method,w.url);a.isArray?(p.length=0,v(c,function(b){"object"===typeof b?p.push(new d(b)):p.push(b)})):(D(c,p),p.$promise=m)}p.$resolved=!0;b.resource=p;
return b},function(b){p.$resolved=!0;(t||E)(b);return G.reject(b)});n=n.then(function(b){var a=A(b);(l||E)(a,b.headers);return a},C);return x?n:(p.$promise=n,p.$resolved=!1,p)};d.prototype["$"+q]=function(b,a,c){y(b)&&(c=a,a=b,b={});b=d[q].call(this,b,this,a,c);return b.$promise||b}});d.bind=function(a){return A(l,r({},g,a),t)};return d}var E=f.noop,v=f.forEach,r=f.extend,I=f.copy,y=f.isFunction;x.prototype={setUrlParams:function(l,g,e){var h=this,c=e||h.template,k,d,r="",a=h.urlParams={};v(c.split(/\W/),
function(d){if("hasOwnProperty"===d)throw z("badname","hasOwnProperty is not a valid parameter name.");!/^\d+$/.test(d)&&d&&(new RegExp("(^|[^\\\\]):"+d+"(\\W|$)")).test(c)&&(a[d]=!0)});c=c.replace(/\\:/g,":");c=c.replace(u,function(a){r=a;return""});g=g||{};v(h.urlParams,function(a,e){k=g.hasOwnProperty(e)?g[e]:h.defaults[e];f.isDefined(k)&&null!==k?(d=encodeURIComponent(k).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"%20").replace(/%26/gi,"&").replace(/%3D/gi,
"=").replace(/%2B/gi,"+"),c=c.replace(new RegExp(":"+e+"(\\W|$)","g"),function(b,a){return d+a})):c=c.replace(new RegExp("(/?):"+e+"(\\W|$)","g"),function(b,a,c){return"/"==c.charAt(0)?c:a+c})});h.defaults.stripTrailingSlashes&&(c=c.replace(/\/+$/,"")||"/");c=c.replace(/\/\.(?=\w+($|\?))/,".");l.url=r+c.replace(/\/\\\./,"/.");v(g,function(a,c){h.urlParams[c]||(l.params=l.params||{},l.params[c]=a)})}};return A}]})})(window,window.angular);