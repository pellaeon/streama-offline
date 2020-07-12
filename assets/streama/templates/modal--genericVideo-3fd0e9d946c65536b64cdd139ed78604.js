//# sourceMappingURL=modal--genericVideo.js.map
angular.module("streama").run(["$templateCache",function(a){a.put("/streama/modal--genericVideo.htm",'<form class="form-horizontal"> <div class="modal-body"> <legend> Generic Video </legend> <div class="form-group"> <div class="col-sm-12"> <input type="text" class="form-control" ng-model="video.title" placeholder="Video Name"> </div> </div> <div> <div class="form-group row-slim"> <div class="col-sm-2"> <label>Release Date</label> <input type="text" class="form-control input-sm" ng-model="video.release_date" placeholder="2003-01-23"/> </div> <div class="col-sm-2"> <label>IMDB ID</label> <input type="text" class="form-control input-sm" ng-model="video.imdb_id" placeholder="i.e. tt0383126"/> </div> <div class="col-sm-2"> <label>Rating</label> <input type="text" class="form-control input-sm" ng-model="video.vote_average" placeholder="Rating 1-10"/> </div> <div class="col-sm-2"> <label>Rating Count</label> <input type="text" class="form-control input-sm" ng-model="video.vote_count" placeholder="Rating Count"/> </div> <div class="col-sm-2"> <label>YouTube Trailer ID</label> <input type="text" class="form-control input-sm" ng-model="video.trailerKey" placeholder="i.e. XAoQPp9XLt8"/> </div> </div> <div class="form-group"> <div class="col-sm-12"> <label>Overview</label> <textarea class="form-control" cols="30" rows="4" ng-model="video.overview" placeholder="Overview"></textarea> </div> </div> <div class="form-group"> <div class="col-sm-12"> <label>Genre</label> <ui-select class="tag-select" multiple ng-model="video.genre" theme="bootstrap" title="Add Genre"> <ui-select-match placeholder="Select Genre...">{{$item.name}}</ui-select-match> <ui-select-choices repeat="genre in genres | propsFilter: {name: $select.search}"> <div class="tag-name" ng-bind-html="genre.name | highlight: $select.search"></div> </ui-select-choices> </ui-select> </div> </div> <div class="form-group" ng-video="video.id"> <div class="col-sm-12"> <label>Tags</label> <ui-select class="tag-select" multiple tagging="tagTransform" ng-model="video.tags" theme="bootstrap" title="Add Tags" on-select="onTagSelect($item, $model)"> <ui-select-match placeholder="Select tag...">{{$item.name}}</ui-select-match> <ui-select-choices repeat="tag in tags | propsFilter: {name: $select.search}"> <div ng-if="tag.isNew" ng-bind-html="tag.name +\' <small>(new)</small>\'| highlight: $select.search"></div> <div ng-if="!tag.isNew" class="tag-wrapper"> <div class="tag-name" ng-bind-html="tag.name + tag.isTag| highlight: $select.search"></div> <i class="ion-trash-a" ng-click="deleteTag(tag)"></i> </div> </ui-select-choices> </ui-select> </div> </div> <div class="form-group"> <div class="col-sm-12"> <label>Poster Image</label> <br/> <div class="row"> <div class="col-sm-8"> <div class="upload-poster" ng-class="{\'update-poster\': video.poster_image_src}" ng-model="manualPoster" class="btn btn-primary btn-block btn-lg" ngf-change="uploadImage($files, \'poster_image\')" ngf-select ngf-drop ngf-drag-over-class="dragover"> <span class="main-text">Upload Poster</span> <span class="size-info">300x450 px</span> <span ng-show="imageUpload.percentage">{{imageUpload.percentage}}%</span> </div> </div> <div class="col-sm-4"> <img ng-show="video.poster_image || video.poster_image_src" ng-src="{{video.poster_image.src || video.poster_image_src}}"/> </div> </div> </div> </div> <div class="form-group"> <div class="col-sm-12"> <label>Backdrop Image</label> <br/> <div class="row"> <div class="col-sm-8"> <div class="upload-poster" ng-class="{\'update-poster\': video.backdrop_image_src}" ng-model="manualPoster" class="btn btn-primary btn-block btn-lg" ngf-change="uploadImage($files, \'backdrop_image\')" ngf-select ngf-drop ngf-drag-over-class="dragover"> <span class="main-text">Upload Backdrop</span> <span class="size-info">600x340 px</span> <span ng-show="imageUpload.percentage">{{imageUpload.percentage}}%</span> </div> </div> <div class="col-sm-4"> <img ng-show="video.backdrop_image_src" ng-src="{{video.backdrop_image_src}}"/> </div> </div> </div> </div> </div> </div> <div class="modal-footer"> <button ng-disabled="!video.title" class="btn btn-success" ng-click="saveVideo(video)">Save</button> <button class="btn btn-danger" ng-click="cancel()">Cancel</button> </div> </form>')}]);