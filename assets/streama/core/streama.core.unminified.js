(function(){
'use strict';
//= wrapped
//= require_self
//= require_tree services

angular.module("streama.core", ['ngResource'])
    .constant("contextPath", window.contextPath)
    .config(config);

function config($httpProvider) {
    $httpProvider.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    $httpProvider.interceptors.push(httpRequestInterceptor);
}
config.$inject = ["$httpProvider"];

function httpRequestInterceptor(contextPath) {
    return {
        request: function (config) {
            if (!config.url.indexOf("/") == 0 && contextPath) {
                config.url = contextPath + "/" + config.url;
            }
            return config;
        }
    };
}
httpRequestInterceptor.$inject = ["contextPath"];
})();
(function(){
'use strict';
//= wrapped

/*
    NOTE: This file is used by the create-ng-domain action.
    You can modify or extend the DomainServiceFactory but it is recommended that you not delete it.
*/

angular
    .module("streama.core")
    .factory("DomainServiceFactory", DomainServiceFactory);

function DomainServiceFactory($resource) {
    return function(url, paramDefaults, actions, options) {
        var resourceActions = {"update": {method: "PUT"}, "list": {method: "GET", isArray: true}};
        angular.extend(resourceActions, actions);

        return $resource(
            url,
            paramDefaults || null,
            resourceActions,
            options || {}
        );
    }
}
DomainServiceFactory.$inject = ["$resource"];

})();
