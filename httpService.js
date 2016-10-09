angular.module("myApp")
.service("HttpService", ["$http", function($http) {
    var self = this;

    var url = "https://pokeapi.co/api/v2/pokemon/"

    self.getMorePokes = function(id) {
        return $http.get(url + id)
        .then(function(response){
            return(response.data);
        }, function(error){
            console.log(error);
        }) 

        
    }
}])