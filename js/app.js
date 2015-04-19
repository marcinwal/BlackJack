var blackJackFun = angular.module('BlackJackFun',[])
         .controller('BlackJackDealerController',['$scope',function($scope){

          var numberOfPlayers = 1;
          var game = new Game(numberOfPlayers);
          
          for(var i=0; i < numberOfPlayers;i++)  game.addPlayer();
          game.gameInit();
          $scope.dealer = game.dealer;
          $scope.players = game.players;
          $scope.playersIndex = Array.apply(null,{length:game.maxPlayers}).
                              map(Number.call,Number);



          $scope.dealerCardsLinks = function(){
            var dealerCards = game.dealer.handsToArrayOfString();
            return dealerCards[0].map(function(card,idx){
              if (idx === 0) return "public/cards_png/"+card+'.png';//1st uncovered
              if (!game.areAllPlayersFinished()) return "public/cards_png/b1fv.png";
              return "public/cards_png/"+card+'.png'; //all uncovered if players have finished
            });
          };

          $scope.playerHandCards = function(player,nHand){
            var playersCards = game.players[player].handsToArrayOfString();
            return playersCards[nHand].map(function(card){
              return "public/cards_png/"+card+'.png';
            });    
            
          };

         }])