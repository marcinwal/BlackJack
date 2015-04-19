var blackJackFun = angular.module('BlackJackFun',[])
                   .controller('BlackJackFunController',['$scope',function($scope){


                    var game = new Game();
                    game.addPlayer();
                    game.gameInit();
                    $scope.dealer = game.dealer;
                    $scope.players = game.players;

                   }])