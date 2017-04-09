(function(){
	'use strict';
	
	angular
		.module('app')
		.directive('tableDirective', tableDirective);
	
	tableDirective.$inject = [];
	
	function tableDirective(){
		return{
			rescrict: 'E',
			scope: {
				tableData: '=', 
				onSaveEditRow:'=', 
				onDeleteRow: '=', 
				onAddNewRow:'='
				},
			templateUrl: 'js/template/tableDirective.template.html',
			controller: 'TableDirectiveController',
			controllerAs: 'vm',
			link: function(scope, element, attr, ctlr){
				scope.$watchCollection('tableData', (newVal, oldVal) => {
					if(newVal === oldVal) return;
					ctlr.data = newVal;	
			 	});
			}
		}
	}	
})();

