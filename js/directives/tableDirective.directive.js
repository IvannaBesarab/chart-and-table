(function () {
    'use strict';

    angular
        .module('app')
        .directive('tableDirective', tableDirective);

    tableDirective.$inject = [];

    function tableDirective() {
        return {
            restrict: 'E',
            scope: {
                tableData: '=',
                onSaveEditRow: '=',
                onDeleteRow: '=',
                onAddNewRow: '='
            },
            templateUrl: 'js/template/tableDirective.template.html',
            controller: 'TableDirectiveController',
            controllerAs: 'vm',
            link: function (scope, element, attr, ctlr) {
                scope.$watchCollection('tableData', function (newVal, oldVal) {
                    if (newVal === oldVal) return;
                    ctlr.data = newVal;
                });
            }
        }
    }
})();

