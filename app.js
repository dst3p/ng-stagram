
// $(document).ready(function() {
	
// 	setInterval(function() {

// 		$(".profile-image").animate( { boxShadow: '0 0 10px red' }, 1000)
// 						   .animate( { boxShadow: '0 0 10px blue' }, 1000)
// 						   .animate( { boxShadow: '0 0 10px green'}, 1000);

// 	});

// });	

(function() {

	var app = angular.module('ng-stagram', []);

	app.factory('instagram', ['$http', function($http){ 

		var client_id = '7dd75e008c7941d98c00647bea73f7c3';

		return {

			fetchPopular: function(callback) {

				var endpoint = 'https://api.instagram.com/v1/media/popular/?client_id=' + client_id + '&callback=JSON_CALLBACK&count=1000';

				$http.jsonp(endpoint).success(function(response) {

					callback(response.data);

			 	});
			},

			searchByTag: function(tag, callback) {

				var endpoint = 'https://api.instagram.com/v1/tags/' + tag + '/media/recent?client_id=' + client_id + '&callback=JSON_CALLBACK&count=1000'; 

				$http.jsonp(endpoint).success(function(response){

					callback(response.data);

				});
			}
		};
	}]);
	
	app.controller('PhotosController', function($scope, $http, instagram) {
		
		$scope.tag = '';
		$scope.viewFullSizePhotos = false;

		instagram.fetchPopular(function(data){

			$scope.pics = data;

		});

		$scope.searchByTag = function(tag) {

			delay(function() {

				if (tag.length > 2)
				{
					instagram.searchByTag(tag, function(data) {

						$scope.pics = data;

					});
				}
			}, 1000);

		};

	});

})();

var delay = (function() {

	var timer = 0;

	return function(callback, ms) {
		clearTimeout(timer);

		timer = setTimeout(callback, ms);
	};

})();

// $(document).ready(function() {

// 	$("#search").keyup(function() {
	
// 		delay(function() {

// 			if ($("#search").val().length > 2)
// 			{
// 				var endpoint = 'https://api.instagram.com/v1/tags/' + tag + '/media/recent?client_id=' + client_id + '&callback=JSON_CALLBACK'; 

// 				$http.jsonp(endpoint).success(function(response){

// 					callback(response.data);

// 				});
// 			}

// 		}, 1500);

// 	});
	
// });





