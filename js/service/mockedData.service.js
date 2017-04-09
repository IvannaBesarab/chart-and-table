(function () {
	'use strict';

	angular
		.module('app')
		.factory('mockedDataService', mockedDataService);

	mockedDataService.$inject = ['$q', '$http'];

	function mockedDataService($q, $http) {
		let data;
		function getDateResource() {			
			let deferred = $q.defer();
			$http.get('data.json')
				.then(function(response){
				console.log(response);
					data = response.data;
					deferred.resolve(data);
				}, function(error){
					console.log(error);
					deferred.reject(error);
				})
			return deferred.promise;			
		}

//		var data = [
//			{
//				"id": 1,
//				"sprint": "sprint A",
//				"startDate": '2016-04-26',
//				"endDate": '2016-01-26',
//				"storyPoints": 50
//				},
//			{
//				"id": 2,
//				"sprint": "sprint B",
//				"startDate": '2016-06-26',
//				"endDate": '2016-08-26',
//				"storyPoints": 20
//				},
//			{
//				"id": 3,
//				"sprint": "sprint D",
//				"startDate": '2010-02-14',
//				"endDate": '2016-02-10',
//				"storyPoints": 23
//				},
//			{
//				"id": 4,
//				"sprint": "sprint M",
//				"startDate": '2016-04-26',
//				"endDate": '2016-01-26',
//				"storyPoints": 50
//				}
//			]

		function getData() {
			return data;
		}

		function addInstance(inst) {
			inst.id = data.length + 1;
			data.push(inst);
			return data;
		}

		function updateInstance(inst) {
			var length = data.length;
			for (var i = 0; i < length; i++) {
				if (inst.id === data[i].id) {
					data[i] = inst;
				}
			}
			return data;
		}

		function deleteInstance(inst) {
			var length = data.length;
			for (var i = 0; i < data.length; i++) {
				if (inst.id === data[i].id) {
					data.splice(i, 1);
					i--;
				}
			}
		}


		return {
			getData: getDateResource,

			addInstance: addInstance,

			updateInstance: updateInstance,

			deleteInstance: deleteInstance
		}
	}

})();
