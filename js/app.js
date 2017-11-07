(function (angular) {
    'use strict';
    var  mainApp = angular.module("mainApp",[]);
    mainApp.controller("mainController",["$scope","$window","$filter",function ($scope,$window,$filter) {
        var demotasks = [
            {id:Math.random(),content:"跑步",type:'运动',saveDate:'2012-06-11',completed:false},
            {id:Math.random(),content:"打篮球",type:'运动',saveDate:'2013-06-11',completed:false},
            {id:Math.random(),content:"定时更改状态",type:'新加定时器',saveDate:'2017-06-11',completed:true},
            {id:Math.random(),content:"可以删除默认数据",type:'模拟数据说明',saveDate:'2017-06-11',completed:true},
            {id:Math.random(),content:"数据存储在localStorage",type:'模拟数据说明',saveDate:'2017-06-11',completed:true},
            {id:Math.random(),content:"清空浏览器缓存不会删除",type:'模拟数据说明',saveDate:'2017-06-11',completed:true},
            {id:Math.random(),content:"存储数据量比cookie大",type:'模拟数据说明',saveDate:'2017-06-11',completed:true},
            {id:Math.random(),content:"检索、筛选、标记完成日志",type:'功能说明',saveDate:'2017-06-11',completed:false},
            {id:Math.random(),content:"angularJS、bootstrap css",type:'实现技术',saveDate:'2017-06-11',completed:false},
        ];
        var storage = $window.localStorage;
        //没有则加载模拟数据
        $scope.tasks = storage.tasks? JSON.parse(storage.tasks): demotasks;
        $scope.showType = true;
        $scope.showContent = true;
        $scope.showSaveDate = true;
        $scope.add = function(){
            if(!$scope.content || !$scope.type){
                return;
            }
            $scope.tasks.push({id:Math.random(),content:$scope.content,completed:false,
                type:$scope.type,saveDate:$filter('date')(new Date(), 'yyyy-MM-dd')});
            $scope.content = "";//清空文本框
            $scope.type = "";//清空文本框
            saveWindow();//保存至客户端
        }
        //$scope.currentDate = new Date();
        $scope.remove = function (id){
            for(var i=0,len=$scope.tasks.length;i<len;i++){
                if($scope.tasks[i].id === id){
                    $scope.tasks.splice(i, 1);
                    break;
                }
            }
            saveWindow();//保存至客户端
        }

        //保存到window客户端
         function saveWindow(){
            $window.localStorage.tasks = JSON.stringify($scope.tasks);
        }

        //改变状态
        $scope.changeCompleted = function (id){
            for(var i=0,len=$scope.tasks.length;i<len;i++){
                if($scope.tasks[i].id === id){
                    $scope.tasks[i].completed = !$scope.tasks[i].completed;
                    break;
                }
            }
            saveWindow();//保存至客户端
        }
        
        $scope.doConvert = function(){
			var rawData = relpace_line($scope.s_array_sql);
			var rawArray = rawData.split(',');
			var results = [];
			for(var k in rawArray){
				results.push("'" +rawArray[k] + "'")
			}
			$scope.s_array_sql = results.join(',');
        }
        
        $scope.doNation = function(){
        	var rawData = relpace_line($scope.s_nation);
			var rawArray = rawData.split(',');
			var results = [];
			for(var k in rawArray){
				results.push(rawArray[k].split('=')[0] + "=" + rawArray[k].split('=')[0]);
			}
			$scope.s_nation = results.join('\n');
        }
        
        $scope.doCode = function(){
        	var rawData = relpace_line($scope.s_nation);
			var rawArray = rawData.split(',');
			var results = [];
			for(var k in rawArray){
				results.push('lang_json_t.' + rawArray[k].split('=')[0]);
			}
			$scope.s_nation = results.join('\n');
        }        

    }]);
})(angular);
