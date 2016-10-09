angular.module("myApp", ['ngMaterial']);

angular.module("myApp")
    .controller("MainController", ["$log", "HttpService", function ($log, HttpService) {
        var self = this;
        self.title = 'Pokemon Scroller';
        self.pokes = [];
        self.loading = false;
        self.nextId = 1;

        self.getMorePokes = function () {
            if (!self.loading) {
                self.loading = true;
                HttpService.getMorePokes(self.nextId)
                    .then(function (response) {
                        self.newPoke = {
                            name: response.name,
                            sprite: response.sprites.front_default
                        }
                        self.pokes.push(self.newPoke);
                        self.nextId++;
                        self.loading = false;
                        $log.info("self.nextId ", self.nextId);
                    })
            }
        }

        self.loadFirstPokes = function () {
            self.nextId = Math.floor(Math.random() * 300) + 1;
            for (var i = 0; i < 4; i++) {
                self.loading = false;
                self.getMorePokes();
                self.nextId ++;
            }
        }

        self.loadFirstPokes();
    }])
    .directive("isScrolled", function () {
        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
                var el = elem[0];
                elem.on('scroll', function () {
                    if (el.scrollTop + el.offsetHeight + 200 >= el.scrollHeight) {
                        scope.$apply(attrs.isScrolled);
                    }

                })
            }
        }
    })