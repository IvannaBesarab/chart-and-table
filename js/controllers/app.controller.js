(function () {
    'use strict';

    angular
        .module('app')
        .controller('AppController', AppController);

    AppController.$inject = ['mockedDataService'];

    function AppController(mockedDataService) {
        var vm = this;

        mockedDataService.getData().then(function (data) {
            vm.data = data;
        });

        vm.deleteRow = function (inst) {
            mockedDataService.deleteInstance(inst);
        };

        vm.saveRow = function (inst) {
            vm.data = mockedDataService.updateInstance(inst);
        };

        vm.onAddNewInstance = function (inst) {
            vm.data = mockedDataService.addInstance(inst);
        }

    }
})();