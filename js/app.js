var blackJackFun = angular.module('BlackJackFun',[])
         .controller('BlackJackDealerController',['$scope',function($scope){

          var numberOfPlayers = 3;
          var game = new Game(numberOfPlayers);
          
          for(var i=0; i < numberOfPlayers;i++)  game.addPlayer();
          game.gameInit();
          $scope.end = false;
          $scope.game = game;
          $scope.dealer = game.dealer;
          $scope.players = game.players;
          $scope.deck = game.deck;
          $scope.playersIndex = Array.apply(null,{length:game.maxPlayers}).
                              map(Number.call,Number);

          //creates link with pictures                    
          $scope.dealerCardsLinks = function(){
            var dealerCards = $scope.dealer.handsToArrayOfString();
            return dealerCards[0].map(function(card,idx){
              if (idx === 0) return "public/cards_png/"+card+'.png';//1st uncovered
              if (!$scope.game.areAllPlayersFinished()) return "public/cards_png/b1fv.png";
              return "public/cards_png/"+card+'.png'; //all uncovered if players have finished
            });
          };
          //creates links with pictures for players
          $scope.playerHandCards = function(player,nHand){
            var playersCards = $scope.players[player].handsToArrayOfString();
            return playersCards[nHand].map(function(card){
              return "public/cards_png/"+card+'.png';
            });                
          };

          $scope.playerHit = function(player,hand){
            if ($scope.deck.hasCards()) { 
              var card = $scope.deck.giveACard();
              $scope.players[player].addCard(card,hand);
              if ($scope.game.areAllPlayersFinished()){
                $scope.finishTheGame();
              }
            }
          };

          $scope.playerStands = function(player,hand){
            $scope.players[player].stand(hand);
            if ($scope.game.areAllPlayersFinished()){
              $scope.finishTheGame();
            }
          };

          $scope.finishTheGame = function(){
            $scope.game.playDealer();
            $scope.winners = $scope.game.findWinners().map(function(player){
              if (player === 0) return 'The Dealer';
              return "Player " + player;
            })
            $scope.numberOfWinners = $scope.winners.length;
            $scope.winners = $scope.winners.join(', ');
            $scope.end = true;
          };

         }]);