//# sourceMappingURL=angular-translate.js.map
(function(w,B){"function"===typeof define&&define.amd?define([],function(){return B()}):"object"===typeof module&&module.exports?module.exports=B():B()})(this,function(){function w(c){var k=c.storageKey(),d=c.storage(),n=function(){var g=c.preferredLanguage();angular.isString(g)?c.use(g):d.put(k,c.use())};n.displayName="fallbackFromIncorrectStorageValue";if(d)if(d.get(k))c.use(d.get(k))["catch"](n);else n();else angular.isString(c.preferredLanguage())&&c.use(c.preferredLanguage())}function B(c,k,
d,n){var g={},f,u=[],r,e,v,b,p,F,O=c,E,q,pa,x=[],y,ia="translate-cloak",B,K,H,I=!1,C=!1,L=".",ja=!1,h=!1,D,ka=0,la=!0,qa,J="default",M={"default":function(a){return(a||"").split("-").join("_")},java:function(a){a=(a||"").split("-").join("_");var b=a.split("_");return 1<b.length?b[0].toLowerCase()+"_"+b[1].toUpperCase():a},bcp47:function(a){a=(a||"").split("_").join("-");var b=a.split("-");switch(b.length){case 1:b[0]=b[0].toLowerCase();break;case 2:b[0]=b[0].toLowerCase();b[1]=4===b[1].length?b[1].charAt(0).toUpperCase()+
b[1].slice(1).toLowerCase():b[1].toUpperCase();break;case 3:b[0]=b[0].toLowerCase();b[1]=b[1].charAt(0).toUpperCase()+b[1].slice(1).toLowerCase();b[2]=b[2].toUpperCase();break;default:return a}return b.join("-")},"iso639-1":function(a){return(a||"").split("_").join("-").split("-")[0].toLowerCase()}},w=function(){if(angular.isFunction(n.getLocale))return n.getLocale();var a=k.$get().navigator,b=["language","browserLanguage","systemLanguage","userLanguage"],e,c;if(angular.isArray(a.languages))for(e=
0;e<a.languages.length;e++)if((c=a.languages[e])&&c.length)return c;for(e=0;e<b.length;e++)if((c=a[b[e]])&&c.length)return c;return null};w.displayName="angular-translate/service: getFirstBrowserLanguage";var da=function(){var a=w()||"";M[J]&&(a=M[J](a));return a};da.displayName="angular-translate/service: getLocale";var N=function(a,b){for(var e=0,c=a.length;e<c;e++)if(a[e]===b)return e;return-1},Q=function(){return this.toString().replace(/^\s+|\s+$/g,"")},A=function(a){return angular.isString(a)?
a.toLowerCase():a},V=function(a){if(a){for(var b=[],e=A(a),c=0,g=u.length;c<g;c++)b.push(A(u[c]));c=N(b,e);if(-1<c)return u[c];if(r)for(var h in r)if(r.hasOwnProperty(h)&&(e=!1,c=Object.prototype.hasOwnProperty.call(r,h)&&A(h)===A(a),"*"===h.slice(-1)&&(e=A(h.slice(0,-1))===A(a.slice(0,h.length-1))),c||e)&&(e=r[h],-1<N(b,A(e))))return e;a=a.split("_");if(1<a.length&&-1<N(b,A(a[0])))return a[0]}},P=function(a,b){if(!a&&!b)return g;if(a&&!b){if(angular.isString(a))return g[a]}else angular.isObject(g[a])||
(g[a]={}),angular.extend(g[a],W(b));return this};this.translations=P;this.cloakClassName=function(a){if(!a)return ia;ia=a;return this};this.nestedObjectDelimeter=function(a){if(!a)return L;L=a;return this};var W=function(a,b,e,c){var h,g,d,f;b||(b=[]);e||(e={});for(h in a)Object.prototype.hasOwnProperty.call(a,h)&&(f=a[h],angular.isObject(f)?W(f,b.concat(h),e,h):(g=b.length?""+b.join(L)+L+h:h,b.length&&h===c&&(d=""+b.join(L),e[d]="@:"+g),e[g]=f));return e};W.displayName="flatObject";this.addInterpolation=
function(a){x.push(a);return this};this.useMessageFormatInterpolation=function(){return this.useInterpolation("$translateMessageFormatInterpolation")};this.useInterpolation=function(a){pa=a;return this};this.useSanitizeValueStrategy=function(a){d.useStrategy(a);return this};this.preferredLanguage=function(a){return a?(R(a),this):f};var R=function(a){a&&(f=a);return f};this.translationNotFoundIndicator=function(a){this.translationNotFoundIndicatorLeft(a);this.translationNotFoundIndicatorRight(a);return this};
this.translationNotFoundIndicatorLeft=function(a){if(!a)return K;K=a;return this};this.translationNotFoundIndicatorRight=function(a){if(!a)return H;H=a;return this};this.fallbackLanguage=function(a){S(a);return this};var S=function(a){return a?(angular.isString(a)?(v=!0,e=[a]):angular.isArray(a)&&(v=!1,e=a),angular.isString(f)&&0>N(e,f)&&e.push(f),this):v?e[0]:e};this.use=function(a){if(a){if(!g[a]&&!y)throw Error("$translateProvider couldn't find translationTable for langKey: '"+a+"'");b=a;return this}return b};
this.resolveClientLocale=function(){return da()};var T=function(a){if(!a)return E?E+O:O;O=a;return this};this.storageKey=T;this.useUrlLoader=function(a,b){return this.useLoader("$translateUrlLoader",angular.extend({url:a},b))};this.useStaticFilesLoader=function(a){return this.useLoader("$translateStaticFilesLoader",a)};this.useLoader=function(a,b){y=a;B=b||{};return this};this.useLocalStorage=function(){return this.useStorage("$translateLocalStorage")};this.useCookieStorage=function(){return this.useStorage("$translateCookieStorage")};
this.useStorage=function(a){F=a;return this};this.storagePrefix=function(a){if(!a)return a;E=a;return this};this.useMissingTranslationHandlerLog=function(){return this.useMissingTranslationHandler("$translateMissingTranslationHandlerLog")};this.useMissingTranslationHandler=function(a){q=a;return this};this.usePostCompiling=function(a){I=!!a;return this};this.forceAsyncReload=function(a){C=!!a;return this};this.uniformLanguageTag=function(a){a?angular.isString(a)&&(a={standard:a}):a={};J=a.standard;
return this};this.determinePreferredLanguage=function(a){a=a&&angular.isFunction(a)?a():da();f=u.length?V(a)||a:a;return this};this.registerAvailableLanguageKeys=function(a,b){return a?(u=a,b&&(r=b),this):u};this.useLoaderCache=function(a){!1===a?D=void 0:!0===a?D=!0:"undefined"===typeof a?D="$translationCache":a&&(D=a);return this};this.directivePriority=function(a){if(void 0===a)return ka;ka=a;return this};this.statefulFilter=function(a){if(void 0===a)return la;la=a;return this};this.postProcess=
function(a){qa=a?a:void 0;return this};this.keepContent=function(a){h=!!a;return this};this.$get=["$log","$injector","$rootScope","$q",function(a,c,d,k){var n,r=c.get(pa||"$translateDefaultInterpolation"),E=!1,A={},z={},w,J,t=function(m,a,c,ma,d,h){!b&&f&&(b=f);var l=d&&d!==b?V(d)||d:b;d&&ra(d);if(angular.isArray(m))return function(m){for(var b={},e=[],g=function(m){var e=k.defer(),l=function(a){b[m]=a;e.resolve([m,a])};t(m,a,c,ma,d,h).then(l,l);return e.promise},l=0,f=m.length;l<f;l++)e.push(g(m[l]));
return k.all(e).then(function(){return b})}(m);var g=k.defer();m&&(m=Q.apply(m));var q=function(){var m=z[l]||z[f];w=0;if(F&&!m){var a=n.get(O),m=z[a];e&&e.length&&(w=0===N(e,a)?1:0,0>N(e,f)&&e.push(f))}return m}();if(q){var p=function(){d||(l=b);ba(m,a,c,ma,l,h).then(g.resolve,g.reject)};p.displayName="promiseResolved";q["finally"](p)["catch"](angular.noop)}else ba(m,a,c,ma,l,h).then(g.resolve,g.reject);return g.promise},M=function(m){K&&(m=[K,m].join(" "));H&&(m=[m,H].join(" "));return m},ea=function(m){b=
m;F&&n.put(t.storageKey(),b);d.$emit("$translateChangeSuccess",{language:m});r.setLocale(b);var a=function(m,a){A[a].setLocale(b)};a.displayName="eachInterpolatorLocaleSetter";angular.forEach(A,a);d.$emit("$translateChangeEnd",{language:m})},X=function(m){if(!m)throw"No language key specified for loading.";var a=k.defer();d.$emit("$translateLoadingStart",{language:m});E=!0;var b=D;"string"===typeof b&&(b=c.get(b));var b=angular.extend({},B,{key:m,$http:angular.extend({},{cache:b},B.$http)}),e=function(b){var e=
{};d.$emit("$translateLoadingSuccess",{language:m});angular.isArray(b)?angular.forEach(b,function(a){angular.extend(e,W(a))}):angular.extend(e,W(b));E=!1;a.resolve({key:m,table:e});d.$emit("$translateLoadingEnd",{language:m})};e.displayName="onLoaderSuccess";var h=function(m){d.$emit("$translateLoadingError",{language:m});a.reject(m);d.$emit("$translateLoadingEnd",{language:m})};h.displayName="onLoaderError";c.get(y)(b).then(e,h);return a.promise};if(F&&(n=c.get(F),!n.get||!n.put))throw Error("Couldn't use storage '"+
F+"', missing get() or put() method!");x.length&&(a=function(m){m=c.get(m);m.setLocale(f||b);A[m.getInterpolationIdentifier()]=m},a.displayName="interpolationFactoryAdder",angular.forEach(x,a));var Z=function(m){var a=k.defer();if(Object.prototype.hasOwnProperty.call(g,m))a.resolve(g[m]);else if(z[m]){var b=function(m){P(m.key,m.table);a.resolve(m.table)};b.displayName="translationTableResolver";z[m].then(b,a.reject)}else a.reject();return a.promise},U=function(a,e,c,d,h){var g=k.defer(),l=function(l){if(Object.prototype.hasOwnProperty.call(l,
e)&&null!==l[e]){d.setLocale(a);var f=l[e];"@:"===f.substr(0,2)?U(a,f.substr(2),c,d,h).then(g.resolve,g.reject):(f=d.interpolate(l[e],c,"service",h,e),f=fa(e,l[e],f,c,a),g.resolve(f));d.setLocale(b)}else g.reject()};l.displayName="fallbackTranslationResolver";Z(a).then(l,g.reject);return g.promise},G=function(a,e,c,d,h){var f,l=g[a];if(l&&Object.prototype.hasOwnProperty.call(l,e)&&null!==l[e]){d.setLocale(a);f=d.interpolate(l[e],c,"filter",h,e);f=fa(e,l[e],f,c,a,h);if(!angular.isString(f)&&angular.isFunction(f.$$unwrapTrustedValue)){if(e=
f.$$unwrapTrustedValue(),"@:"===e.substr(0,2))return G(a,e.substr(2),c,d,h)}else if("@:"===f.substr(0,2))return G(a,f.substr(2),c,d,h);d.setLocale(b)}return f},ga=function(a,e,d,h){return q?c.get(q)(a,b,e,d,h):a},Y=function(a,b,c,d,h,g){var l=k.defer();if(a<e.length)U(e[a],b,c,d,g).then(function(a){l.resolve(a)},function(){return Y(a+1,b,c,d,h,g).then(l.resolve,l.reject)});else if(h)l.resolve(h);else{var f=ga(b,c,h);q&&f?l.resolve(f):l.reject(M(b))}return l.promise},aa=function(a,b,c,d,h){var g;a<
e.length&&((g=G(e[a],b,c,d,h))||""===g||(g=aa(a+1,b,c,d)));return g},ba=function(a,b,c,d,h,f){var l=k.defer(),p=h?g[h]:g,n=c?A[c]:r;if(p&&Object.prototype.hasOwnProperty.call(p,a)&&null!==p[a])p=p[a],"@:"===p.substr(0,2)?t(p.substr(2),b,c,d,h,f).then(l.resolve,l.reject):(c=n.interpolate(p,b,"service",f,a),c=fa(a,p,c,b,h),l.resolve(c));else{var D;q&&!E&&(D=ga(a,b,d));h&&e&&e.length?Y(0<J?J:w,a,b,n,d,f).then(function(a){l.resolve(a)},function(a){l.reject(M(a))}):q&&!E&&D?d?l.resolve(d):l.resolve(D):
d?l.resolve(d):l.reject(M(a))}return l.promise},ca=function(a,b,c,d,h){var f=d?g[d]:g,l=r;A&&Object.prototype.hasOwnProperty.call(A,c)&&(l=A[c]);if(f&&Object.prototype.hasOwnProperty.call(f,a)&&null!==f[a])f=f[a],"@:"===f.substr(0,2)?c=ca(f.substr(2),b,c,d,h):(c=l.interpolate(f,b,"filter",h,a),c=fa(a,f,c,b,d,h));else{var p;q&&!E&&(p=ga(a,b,h));d&&e&&e.length?(w=0,c=aa(0<J?J:w,a,b,l,h)):c=q&&!E&&p?p:M(a)}return c},fa=function(a,b,e,d,h,f){var g=qa;return g&&("string"===typeof g&&(g=c.get(g)),g)?g(a,
b,e,d,h,f):e},ra=function(a){g[a]||!y||z[a]||(z[a]=X(a).then(function(a){P(a.key,a.table);return a}))};t.preferredLanguage=function(a){a&&R(a);return f};t.cloakClassName=function(){return ia};t.nestedObjectDelimeter=function(){return L};t.fallbackLanguage=function(a){if(void 0!==a&&null!==a){S(a);if(y&&e&&e.length){a=0;for(var b=e.length;a<b;a++)z[e[a]]||(z[e[a]]=X(e[a]))}t.use(t.use())}return v?e[0]:e};t.useFallbackLanguage=function(a){void 0!==a&&null!==a&&(a?(a=N(e,a),-1<a&&(J=a)):J=0)};t.proposedLanguage=
function(){return p};t.storage=function(){return n};t.negotiateLocale=V;t.use=function(a){if(!a)return b;var c=k.defer();c.promise.then(null,angular.noop);d.$emit("$translateChangeStart",{language:a});var h=V(a);if(0<u.length&&!h)return k.reject(a);h&&(a=h);p=a;!C&&g[a]||!y||z[a]?z[a]?z[a].then(function(a){p===a.key&&ea(a.key);c.resolve(a.key);return a},function(a){return!b&&e&&0<e.length&&e[0]!==a?t.use(e[0]).then(c.resolve,c.reject):c.reject(a)}):(c.resolve(a),ea(a)):(z[a]=X(a).then(function(b){P(b.key,
b.table);c.resolve(b.key);p===a&&ea(b.key);return b},function(a){d.$emit("$translateChangeError",{language:a});c.reject(a);d.$emit("$translateChangeEnd",{language:a});return k.reject(a)}),z[a]["finally"](function(){var b=a;p===b&&(p=void 0);z[b]=void 0})["catch"](angular.noop));return c.promise};t.resolveClientLocale=function(){return da()};t.storageKey=function(){return T()};t.isPostCompilingEnabled=function(){return I};t.isForceAsyncReloadEnabled=function(){return C};t.isKeepContent=function(){return h};
t.refresh=function(a){function c(a){var b=X(a);z[a]=b;b.then(function(b){g[a]={};P(a,b.table);f[a]=!0},angular.noop);return b}if(!y)throw Error("Couldn't refresh translation table, no loader registered!");d.$emit("$translateRefreshStart",{language:a});var h=k.defer(),f={};h.promise.then(function(){for(var a in g)g.hasOwnProperty(a)&&(a in f||delete g[a]);b&&ea(b)},angular.noop)["finally"](function(){d.$emit("$translateRefreshEnd",{language:a})});if(a)g[a]?c(a).then(h.resolve,h.reject):h.reject();
else{var p=e&&e.slice()||[];b&&-1===p.indexOf(b)&&p.push(b);k.all(p.map(c)).then(h.resolve,h.reject)}return h.promise};t.instant=function(a,c,h,d,p){var k=d&&d!==b?V(d)||d:b;if(null===a||angular.isUndefined(a))return a;d&&ra(d);if(angular.isArray(a)){for(var k={},l=0,D=a.length;l<D;l++)k[a[l]]=t.instant(a[l],c,h,d,p);return k}if(angular.isString(a)&&1>a.length)return a;a&&(a=Q.apply(a));d=[];f&&d.push(f);k&&d.push(k);e&&e.length&&(d=d.concat(e));for(var n=0,F=d.length;n<F;n++){var y=d[n];g[y]&&"undefined"!==
typeof g[y][a]&&(l=ca(a,c,h,k,p));if("undefined"!==typeof l)break}l||""===l||(K||H?l=M(a):(l=r.interpolate(a,c,"filter",p),q&&!E&&(D=ga(a,c,p)),q&&!E&&D&&(l=D)));return l};t.versionInfo=function(){return"2.18.1"};t.loaderCache=function(){return D};t.directivePriority=function(){return ka};t.statefulFilter=function(){return la};t.isReady=function(){return ja};var ha=k.defer();ha.promise.then(function(){ja=!0});t.onReady=function(a){var b=k.defer();angular.isFunction(a)&&b.promise.then(a);ja?b.resolve():
ha.promise.then(b.resolve);return b.promise};t.getAvailableLanguageKeys=function(){return 0<u.length?u:null};t.getTranslationTable=function(a){return(a=a||t.use())&&g[a]?angular.copy(g[a]):null};var sa=d.$on("$translateReady",function(){ha.resolve();sa();sa=null}),ta=d.$on("$translateChangeEnd",function(){ha.resolve();ta();ta=null});if(y){if(angular.equals(g,{})&&t.use()&&t.use(t.use()),e&&e.length){a=function(a){P(a.key,a.table);d.$emit("$translateChangeEnd",{language:a.key});return a};for(var na=
0,ua=e.length;na<ua;na++){var oa=e[na];if(C||!g[oa])z[oa]=X(oa).then(a)}}}else d.$emit("$translateReady",{language:t.use()});return t}]}function Q(c,k){return{setLocale:function(c){},getInterpolationIdentifier:function(){return"default"},useSanitizeValueStrategy:function(c){k.useStrategy(c);return this},interpolate:function(d,n,g,f,u){n=n||{};n=k.sanitize(n,"params",f,g);angular.isNumber(d)?d=""+d:angular.isString(d)?(d=c(d)(n),d=k.sanitize(d,"text",f,g)):d="";return d}}}function R(c,k,d,n,g){var f=
function(){return this.toString().replace(/^\s+|\s+$/g,"")},u=function(c){return angular.isString(c)?c.toLowerCase():c};return{restrict:"AE",scope:!0,priority:c.directivePriority(),compile:function(r,e){var v=e.translateValues?e.translateValues:void 0,b=e.translateInterpolation?e.translateInterpolation:void 0,p=e.translateSanitizeStrategy?e.translateSanitizeStrategy:void 0,F=r[0].outerHTML.match(/translate-value-+/i),O="^(.*)("+k.startSymbol()+".*"+k.endSymbol()+")(.*)",E="^(.*)"+k.startSymbol()+
"(.*)"+k.endSymbol()+"(.*)";return function(q,r,x){q.interpolateParams={};q.preText="";q.postText="";q.translateNamespace=Y(q);var y={},w=function(b){angular.isFunction(w._unwatchOld)&&(w._unwatchOld(),w._unwatchOld=void 0);if(angular.equals(b,"")||!angular.isDefined(b)){b=f.apply(r.text());var c=b.match(O);angular.isArray(c)?(q.preText=c[1],q.postText=c[3],y.translate=k(c[2])(q.$parent),b=b.match(E),angular.isArray(b)&&b[2]&&b[2].length&&(w._unwatchOld=q.$watch(b[2],function(b){y.translate=b;C()}))):
y.translate=b?b:void 0}else y.translate=b;C()},B=function(b){x.$observe(b,function(c){y[b]=c;C()})};(function(b,c,e){c.translateValues&&angular.extend(b,n(c.translateValues)(q.$parent));if(F)for(var d in e)if(Object.prototype.hasOwnProperty.call(c,d)&&"translateValue"===d.substr(0,14)&&"translateValues"!==d){var f=u(d.substr(14,1))+d.substr(15);b[f]=e[d]}})(q.interpolateParams,x,e);var K=!0;x.$observe("translate",function(b){"undefined"===typeof b?w(""):""===b&&K||(y.translate=b,C());K=!1});for(var H in x)x.hasOwnProperty(H)&&
"translateAttr"===H.substr(0,13)&&13<H.length&&B(H);x.$observe("translateDefault",function(b){q.defaultText=b;C()});p&&x.$observe("translateSanitizeStrategy",function(b){q.sanitizeStrategy=n(b)(q.$parent);C()});v&&x.$observe("translateValues",function(b){b&&q.$parent.$watch(function(){angular.extend(q.interpolateParams,n(b)(q.$parent))})});if(F){var B=function(b){x.$observe(b,function(c){var d=u(b.substr(14,1))+b.substr(15);q.interpolateParams[d]=c})},I;for(I in x)Object.prototype.hasOwnProperty.call(x,
I)&&"translateValue"===I.substr(0,14)&&"translateValues"!==I&&B(I)}var C=function(){for(var b in y)y.hasOwnProperty(b)&&void 0!==y[b]&&L(b,y[b],q,q.interpolateParams,q.defaultText,q.translateNamespace)},L=function(d,e,f,g,p,k){e?(k&&"."===e.charAt(0)&&(e=k+e),c(e,g,b,p,f.translateLanguage,f.sanitizeStrategy).then(function(b){G(b,f,!0,d)},function(b){G(b,f,!1,d)})):G(e,f,!1,d)},G=function(b,f,g,p){g||"undefined"===typeof f.defaultText||(b=f.defaultText);"translate"===p?((g||!g&&!c.isKeepContent()&&
"undefined"===typeof x.translateKeepContent)&&r.empty().append(f.preText+b+f.postText),b=c.isPostCompilingEnabled(),p=(g="undefined"!==typeof e.translateCompile)&&"false"!==e.translateCompile,(b&&!g||p)&&d(r.contents())(f)):(f=x.$attr[p],"data-"===f.substr(0,5)&&(f=f.substr(5)),f=f.substr(15),r.attr(f,b))};(v||F||x.translateDefault)&&q.$watch("interpolateParams",C,!0);q.$on("translateLanguageChanged",C);I=g.$on("$translateChangeSuccess",C);r.text().length?x.translate?w(x.translate):w(""):x.translate&&
w(x.translate);C();q.$on("$destroy",I)}}}}function Y(c){if(c.translateNamespace)return c.translateNamespace;if(c.$parent)return Y(c.$parent)}function S(c,k){return{restrict:"A",priority:c.directivePriority(),link:function(d,n,g){var f,u,r,e={},v=function(){angular.forEach(f,function(b,f){b&&(e[f]=!0,d.translateNamespace&&"."===b.charAt(0)&&(b=d.translateNamespace+b),c(b,u,g.translateInterpolation,void 0,d.translateLanguage,r).then(function(b){n.attr(f,b)},function(b){n.attr(f,b)}))});angular.forEach(e,
function(b,c){f[c]||(n.removeAttr(c),delete e[c])})};T(d,g.translateAttr,function(b){f=b},v);T(d,g.translateValues,function(b){u=b},v);T(d,g.translateSanitizeStrategy,function(b){r=b},v);g.translateValues&&d.$watch(g.translateValues,v,!0);d.$on("translateLanguageChanged",v);var b=k.$on("$translateChangeSuccess",v);v();d.$on("$destroy",b)}}}function T(c,k,d,n){k&&("::"===k.substr(0,2)?k=k.substr(2):c.$watch(k,function(c){d(c);n()},!0),d(c.$eval(k)))}function Z(c,k){return{compile:function(d){var n=
function(d){d.addClass(c.cloakClassName())},g=function(d){d.removeClass(c.cloakClassName())};n(d);return function(d,u,r){var e=g.bind(this,u),v=n.bind(this,u);if(r.translateCloak&&r.translateCloak.length)r.$observe("translateCloak",function(b){c(b).then(e,v)}),k.$on("$translateChangeSuccess",function(){c(r.translateCloak).then(e,v)});else c.onReady(e)}}}}function aa(){return{restrict:"A",scope:!0,compile:function(){return{pre:function(c,k,d){c.translateNamespace=ba(c);c.translateNamespace&&"."===
d.translateNamespace.charAt(0)?c.translateNamespace+=d.translateNamespace:c.translateNamespace=d.translateNamespace}}}}}function ba(c){if(c.translateNamespace)return c.translateNamespace;if(c.$parent)return ba(c.$parent)}function ca(){return{restrict:"A",scope:!0,compile:function(){return function(c,k,d){d.$observe("translateLanguage",function(d){c.translateLanguage=d});c.$watch("translateLanguage",function(){c.$broadcast("translateLanguageChanged")})}}}}function U(c,k){var d=function(d,g,f,u){if(!angular.isObject(g)){var r=
this||{__SCOPE_IS_NOT_AVAILABLE:"More info at https://github.com/angular/angular.js/commit/8863b9d04c722b278fa93c5d66ad1e578ad6eb1f"};g=c(g)(r)}return k.instant(d,g,f,u)};k.statefulFilter()&&(d.$stateful=!0);return d}function G(c){return c("translations")}w.$inject=["$translate"];B.$inject=["$STORAGE_KEY","$windowProvider","$translateSanitizationProvider","pascalprechtTranslateOverrider"];Q.$inject=["$interpolate","$translateSanitization"];R.$inject=["$translate","$interpolate","$compile","$parse",
"$rootScope"];S.$inject=["$translate","$rootScope"];Z.$inject=["$translate","$rootScope"];U.$inject=["$parse","$translate"];G.$inject=["$cacheFactory"];angular.module("pascalprecht.translate",["ng"]).run(w);w.displayName="runTranslate";angular.module("pascalprecht.translate").provider("$translateSanitization",function(){var c,k,d=null,n=!1,g=!1,f;f={sanitize:function(b,c){"text"===c&&(b=r(b));return b},escape:function(b,c){"text"===c&&(b=u(b));return b},sanitizeParameters:function(b,c){"params"===
c&&(b=v(b,r));return b},escapeParameters:function(b,c){"params"===c&&(b=v(b,u));return b},sce:function(b,c,d){"text"===c?b=e(b):"params"===c&&"filter"!==d&&(b=v(b,u));return b},sceParameters:function(b,c){"params"===c&&(b=v(b,e));return b}};f.escaped=f.escapeParameters;this.addStrategy=function(b,c){f[b]=c;return this};this.removeStrategy=function(b){delete f[b];return this};this.useStrategy=function(b){n=!0;d=b;return this};this.$get=["$injector","$log",function(b,e){var r={},u=function(c,d,e,g){angular.forEach(g,
function(g){if(angular.isFunction(g))c=g(c,d,e);else if(angular.isFunction(f[g]))c=f[g](c,d,e);else if(angular.isString(f[g])){if(!r[f[g]])try{r[f[g]]=b.get(f[g])}catch(k){throw r[f[g]]=function(){},Error("pascalprecht.translate.$translateSanitization: Unknown sanitization strategy: '"+g+"'");}c=r[f[g]](c,d,e)}else throw Error("pascalprecht.translate.$translateSanitization: Unknown sanitization strategy: '"+g+"'");});return c};b.has("$sanitize")&&(c=b.get("$sanitize"));b.has("$sce")&&(k=b.get("$sce"));
return{useStrategy:function(b){return function(c){b.useStrategy(c)}}(this),sanitize:function(b,c,f,k){d||n||g||(e.warn("pascalprecht.translate.$translateSanitization: No sanitization strategy has been configured. This can have serious security implications. See http://angular-translate.github.io/docs/#/guide/19_security for details."),g=!0);f||null===f||(f=d);if(!f)return b;k||(k="service");f=angular.isArray(f)?f:[f];return u(b,c,k,f)}}}];var u=function(b){var c=angular.element("<div></div>");c.text(b);
return c.html()},r=function(b){if(!c)throw Error("pascalprecht.translate.$translateSanitization: Error cannot find $sanitize service. Either include the ngSanitize module (https://docs.angularjs.org/api/ngSanitize) or use a sanitization strategy which does not depend on $sanitize, such as 'escape'.");return c(b)},e=function(b){if(!k)throw Error("pascalprecht.translate.$translateSanitization: Error cannot find $sce service.");return k.trustAsHtml(b)},v=function(b,c,d){if(angular.isDate(b))return b;
if(angular.isObject(b)){var e=angular.isArray(b)?[]:{};if(!d)d=[];else if(-1<d.indexOf(b))throw Error("pascalprecht.translate.$translateSanitization: Error cannot interpolate parameter due recursive object");d.push(b);angular.forEach(b,function(b,f){angular.isFunction(b)||(e[f]=v(b,c,d))});d.splice(-1,1);return e}return angular.isNumber(b)?b:!0===b||!1===b?b:angular.isUndefined(b)||null===b?b:c(b)}});angular.module("pascalprecht.translate").constant("pascalprechtTranslateOverrider",{}).provider("$translate",
B);B.displayName="displayName";angular.module("pascalprecht.translate").factory("$translateDefaultInterpolation",Q);Q.displayName="$translateDefaultInterpolation";angular.module("pascalprecht.translate").constant("$STORAGE_KEY","NG_TRANSLATE_LANG_KEY");angular.module("pascalprecht.translate").directive("translate",R);R.displayName="translateDirective";angular.module("pascalprecht.translate").directive("translateAttr",S);S.displayName="translateAttrDirective";angular.module("pascalprecht.translate").directive("translateCloak",
Z);Z.displayName="translateCloakDirective";angular.module("pascalprecht.translate").directive("translateNamespace",aa);aa.displayName="translateNamespaceDirective";angular.module("pascalprecht.translate").directive("translateLanguage",ca);ca.displayName="translateLanguageDirective";angular.module("pascalprecht.translate").filter("translate",U);U.displayName="translateFilterFactory";angular.module("pascalprecht.translate").factory("$translationCache",G);G.displayName="$translationCache";return"pascalprecht.translate"});