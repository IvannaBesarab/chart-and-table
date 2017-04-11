 (function(){
	'use strict';
	
	angular
		.module('app')
		.controller('TableDirectiveController', TableDirectiveController);
		
	TableDirectiveController.$inject = ['$filter', '$scope'];
	
	function TableDirectiveController($filter, $scope){
		var vm  = this;
		vm.editMode = false;
		vm.addMode = false;
		vm.newIsntance = {};
		vm.editInstance = {};			 
		
		var filterClicked = false;
		vm.orderColumn = function (col){
			vm.data = $filter('orderBy')(vm.data, col, filterClicked);
			filterClicked = !filterClicked;
		};
		
		vm.editRow = function (inst, index){			
			vm.editInstance = angular.copy(inst);
			vm.editInstance.startDate = new Date(inst.startDate);
			vm.editInstance.endDate = new Date(inst.endDate);
			vm.editIndex = index;				
		};
		
		vm.deleteRow = function (inst){
			$scope.onDeleteRow(inst);
		};
		
		vm.saveRow = function (inst){
			var copiedInst =angular.copy(inst);
			
			copiedInst.startDate = $filter('date')(inst.startDate, 'yyyy-MM-dd');	
			copiedInst.endDate = $filter('date')(inst.endDate, 'yyyy-MM-dd');

			$scope.onSaveEditRow(copiedInst);
			
			vm.editIndex = -1;
		};
		
		vm.reset = function (){
			vm.editInstance = {};
			vm.editIndex = -1;
		};
		
		vm.openAddInstanceForm = function (){
			vm.addMode = true;
			var time = new Date();
			vm.initailStartDateValue = $filter('date')(time.getTime(), 'yyyy-MM-dd');					
			vm.initialEndDateValue = $filter('date')(time.getTime(), 'yyyy-MM-dd');
			
			vm.newIsntance.startDate = time;
			vm.newIsntance.endDate = time;	
		};
		
		vm.onAddNewInstance = function (inst){
			var copiedInst = angular.copy(inst);
			$scope.onAddNewRow(copiedInst);
					
			vm.newIsntance.sprint = '';	
			vm.newIsntance.storyPoints = '';
		};
		
		vm.cancelAddNewInstance = function (){
			vm.addMode = false;			
		}
				
	}	 
 })();