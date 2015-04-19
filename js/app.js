var blackJackFun = angular.module('BlackJackFun',[])
         .controller('BlackJackDealerController',['$scope',function($scope){


          var game = new Game();
          game.addPlayer();
          game.gameInit();
          $scope.dealer = game.dealer;
          $scope.players = game.players;
          var dealerCards = game.dealer.handsToArrayOfString();

          $scope.dealerCardsInitial = function(){
            return 1  
          };

          $scope.dealerCardsLinks = function(){
            return dealerCards[0].map(function(card,idx){
              if (idx === 0) return "public/cards_png/"+card+'.png';
              if (!game.areAllPlayersFinished()) return "public/cards_png/b1fv.png";
              return "public/cards_png/"+card+'.png';
            });
          };
         }])