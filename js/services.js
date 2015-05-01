/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module('myApp.services',['ngResource']).factory('AssignmentRest', function($resource) {
    
     return $resource(
        baseUrl+'/assignment/dashboard/:Owner',
        {Owner: "@Owner" },
        {
            "dashboard": {'method': 'GET', 'params': {}, isArray: false}
        }
    );
});


angular.module('myApp.services').factory('DatetimeFactory', function() {
     return {
         toDate : function(dayOfYear,year){
             var date = new Date(year,0);
             date = new Date(date.setDate(dayOfYear));
             return date.getDate()+"."+date.getMonth()+"."+date.getFullYear(); 
         }
         
     };
});

