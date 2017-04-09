 (function(){
	'use strict';
	
	angular
		.module('app')
		.controller('AppController', AppController);
		
	AppController.$inject = ['mockedDataService', '$scope'];
	
	function AppController(mockedDataService, $scope){
		var vm  = this;
			
		mockedDataService.getData().then(function(data){
			vm.data = data;
		})

		vm.deleteRow = deleteRow;
		vm.saveRow = saveRow;
		vm.onAddNewInstance = onAddNewInstance;		
	
		
		function deleteRow(inst){
			mockedDataService.deleteInstance(inst);
		}
		
		function saveRow(inst){
			vm.data = mockedDataService.updateInstance(inst);			
		}
		
		function onAddNewInstance(inst){			
			vm.data = mockedDataService.addInstance(inst);			
		}
						
	}	 
 })();