angular.module('streama').run(['$templateCache', function($templateCache) {
    $templateCache.put('/streama/typeahead--episode.htm', '<a> <span>s{{match.model.seasonnumber | padnumber:2}}e{{match.model.episodenumber | padnumber:2}}</span> - <span bind-html-unsafe="match.model.episodename | typeaheadHighlight:query"></span> </a>');
}]);
