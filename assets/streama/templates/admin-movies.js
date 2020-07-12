//# sourceMappingURL=admin-movies.js.map
angular.module("streama").run(["$templateCache",function(a){a.put("/streama/admin-movies.htm",'<div class="row"> <div class="col-md-6"> <h1> Movies <video-sort-order-dropdown ng-model="vm.movie.sorter" ng-model-options="{getterSetter: true}" dropdown-type="\'movie\'"/> </h1> <input placeholder="{{vm.searchText}}" type="text" ng-model="vm.movie.filter.title" ng-change="vm.doSearch(vm.movie.filter.title)" ng-model-options="{debounce: 333}" class="form-control input-sm"/> </div> <div class="col-md-6"> <br> <div class="btn-group pull-right"> <button class="btn btn-primary" ng-click="vm.createFromFiles()">Bulk-Create from file(s)</button> <button class="btn btn-primary" ng-click="vm.openMovieModal()">Create new Movie</button> </div> </div> </div> <div class="spinner big" ng-show="vm.movie.isLoading"> <div class="bounce1"></div> <div class="bounce2"></div> <div class="bounce3"></div> </div> <div ng-show="vm.movie.list.length"> <hr/> <div class="media-list"> <div class="media-list-item media-poster-item" ng-class="{\'no-files\': !movie.hasFiles}" ng-repeat="movie in vm.movie.list" ui-sref="admin.movie({movieId: movie.id})"> <div class="media-item"> <streama-video-image type="poster" size="300" video="movie"></streama-video-image> <div class="play-text"> <h4>{{::movie.title}}</h4> <p>{{::movie.release_date.substring(0,4)}}</p> <span class="label label-danger" ng-show="!movie.hasFiles"><i class="ion-alert-circled"></i> No Video File yet!</span> </div> <i class="warning-icon ion-alert-circled" ng-show="!movie.hasFiles"></i> </div> </div> </div> <div class="text-center" ng-if="vm.movie.total> vm.movie.list.length"> <button class="btn btn-primary btn-outline" ng-click="vm.movie.loadMore()">Load more ...</button> </div> </div> <div ng-if="vm.suggestedMovies.length"> <hr> <h3>Want to add a new Movie?</h3> <div class="media-list similar-media"> <div class="media-list-item" ng-repeat="movie in vm.suggestedMovies | filter:vm.search | orderBy: \'-vote_count\'" ng-if="!vm.alreadyAdded(movie)"> <div class="hover-overlay"> <div> <button class="btn btn-primary btn-sm btn-block" ng-click="vm.addFromSuggested(movie, true)">Add and Open</button> <button class="btn btn-primary btn-sm btn-block" ng-click="vm.addFromSuggested(movie, false)">Add and Continue</button> </div> </div> <div class="media-item"> <img ng-src="https://image.tmdb.org/t/p/w300/{{movie.poster_path}}"/> </div> <div class="media-meta">Release: {{::movie.release_date.substring(0, 4)}} | <i class="ion-ios-star"></i> {{::movie.vote_average}}</div> </div> </div> </div>')}]);