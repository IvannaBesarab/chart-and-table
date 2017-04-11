(function () {
    'use strict';

    angular
        .module('app')
        .factory('mockedDataService', mockedDataService);

    mockedDataService.$inject = ['$q', '$http'];

    function mockedDataService($q, $http) {
        var data;

        function getDateResource() {
            var deferred = $q.defer();

            $http.get('data.json')
                .then(function (response) {
                    data = response.data;
                    deferred.resolve(data);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
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
            for (var i = 0; i < length; i++) {
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
