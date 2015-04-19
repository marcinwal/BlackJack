var suitCodes = 'cdhs';
var rankCodes = 'jqk';

//Card class
var Card = function(suit,rank){
  this.suit = suit;
  this.rank = rank;
};

Card.prototype.isRankEqual = function(card) {
  return this.rank === card.rank;
};

//string for picture codes
Card.prototype.toString = function(){
  var rank = this.rank > 10 ? rankCodes.charAt(this.rank-11) : this.rank;
  return suitCodes.charAt(this.suit-1) + rank;
};

//Deck class
var Deck = function(){
  this.count = 52;
  this.deck = new Array(52);
  var cardsInDeck = 0;
    for(var i = 1; i <= 4;i++)
      for(var j=1; j<= 13; j++){
        this.deck[cardsInDeck++] = new Card(i,j)
      }
}; 

Deck.prototype.swap = function(i,j) {
  var swp = this.deck[i];
  this.deck[i] = this.deck[j];
  this.deck[j] = swp;
};

Deck.prototype.shuffle = function() {
  for(var i=51;i > 0;i--){
    var choice = Math.floor(Math.random()*(i+1));
    this.swap(i,choice);
  }
};

Deck.prototype.giveACard = function() {
  if (this.count === 0) throw "Cards are gone";
  return this.deck[--this.count];
};


Deck.prototype.howManyCards = function(){
  return this.count;
}

Deck.prototype.hasCards = function(){
  return this.howManyCards() > 0;
}
//Hand class
var Hand = function(){
  this.cards = [];
  this.score = 0;
};

Hand.prototype.calcScore_ = function(card) {
  if (card.rank >= 10) return 10;
  if (card.rank === 1) return this.score+11<=21 ? 11 : 1;
  return card.rank;
};

Hand.prototype.add = function(card) {
  this.cards.push(card);
  this.score += this.calcScore_(card);
};

Hand.prototype.isLost = function() {
  return this.score > 21;
};

Hand.prototype.numOfCards = function(){
  return this.cards.length;
};

//in case of splitting
Hand.prototype.halfScore = function(){
  this.score /= 2; 
};

Hand.prototype.setScore = function(number){
  this.score = number;
};

Hand.prototype.isSplittingAllowed = function(){
  if (this.cards.length > 2) return false;
  if (this.cards.length = 2) return this.cards[0].isRankEqual(this.cards[1]);
  return false;
};

//used in case of splitting
Hand.prototype.popCard = function(){
  return this.cards.pop();
};

Hand.prototype.toArrayOfStrings = function(){
  if (this.cards.length === 0) return [];
  return this.cards.map(function(card){
    return card.toString();
  });
}

//Player class 
var Player = function(){
  this.hands = []; //ready for splits
  this.hands[0] = new Hand();
  this.option ='';
};

Player.prototype.addCard = function(card,hand) {
  if (typeof hand === 'undefined') hand = 0;
  this.hands[hand].add(card);
  this.option = 'hit';
};

Player.prototype.isLost = function() {
  if (typeof this.hands[1] === 'undefined') return this.hands[0].isLost();
  return this.hands[1].isLost() && this.hands[0].isLost();
};
//allowed only if hands of the same value
Player.prototype.splitHand = function() {
  this.hands[1] = new Hand();
  this.hands[1].add(this.hands[0].popCard());
  this.hands[0].halfScore();
  this.hands[1].setScore(this.hands[0].score);
  this.option = 'split';
};

Player.prototype.isSplittingAllowed = function(){
  if (this.hands.length > 1) return false; //already split
  return (this.hands[0].isSplittingAllowed());
};

Player.prototype.stand = function(){
  this.option = 'stand';
}

Player.prototype.score = function(){
  if (typeof this.hands[1] === 'undefined') return this.hands[0].score;
  return Math.max(this.hands[0].score,this.hands[1].score);
}

Player.prototype.handsToArrayOfString = function(){
  if (typeof this.hands[1] === 'undefined') return [this.hands[0].toArrayOfStrings(),[]];
  return [this.hands[0].toArrayOfStrings(),this.hands[1].toArrayOfStrings()];
}

Player.prototype.numberOfHands = function(){
  if(typeof this.hands[1] === 'undefined') return 1;
  return 2;
}

//Dealer class inheriting from Player
var Dealer = function(){
};

Dealer.prototype = new Player();
//checking if the dealer should take one more card
//depending on his scored points
Dealer.prototype.shouldTakeCard = function() {
  return this.hands[0].score <= 16 ? true : false; 
};
//dealer is not allowed to split
Dealer.prototype.isSplittingAllowed = function(){
  return false;
};

//Game class

var Game = function(numberOfPlayers){
  this.maxPlayers = (typeof numberOfPlayers ==='undefined') ? 1 : numberOfPlayers;
  this.deck = new Deck();
  this.dealer = new Dealer();
  this.players = [];
};

Game.prototype.addPlayer = function() {
  if (this.players.length < this.maxPlayers){
    var player = new Player();
    this.players.push(player);
  }
};
//initial status of the dealer with 2 cards
Game.prototype.initDealer = function(){
  var card1 = this.deck.giveACard();
  var card2 = this.deck.giveACard();
  this.dealer.addCard(card1);
  this.dealer.addCard(card2);  
};
//start of the game
//with shuffling of the deck
//giving 2 cards for players and the dealer
Game.prototype.gameInit = function(){
  this.deck.shuffle();
  this.initDealer();
  for(var i = 0; i < this.players.length;i++){
    var card1 = this.deck.giveACard();
    var card2 = this.deck.giveACard();
    this.players[i].addCard(card1);
    this.players[i].addCard(card2);
  }
};

Game.prototype.hitPlayer = function (which,hand){
  var player = this.players[which];
  if (!player.isLost() && this.deck.hasCards()){
    var card = this.deck.giveACard();
    player.addCard(card,hand);
  }
};

Game.prototype.splitPlayer = function(which){
  var player = this.players[which];
  if (player.isSplittingAllowed()) player.splitHand();
};

Game.prototype.standPlayer = function(which){
  this.player[which].stand();
}
//checking if all players finished the game
//by either standing or loosing
Game.prototype.areAllPlayersFinished = function(){
  return this.players.map(function(player){
    var end = 0;
    if (player.option === 'stand') end = 1;
    if (player.isLost()) end = 1;
    return end;
  }).reduce(function(sum,el){
    return sum + el;
  }) === this.maxPlayers;
};
//auntomated intelligance for dealer to play once 
//all other players are finished
Game.prototype.playDealer = function(){
  while (this.dealer.shouldTakeCard()){
    this.dealer.addCard(this.deck.giveACard());
  }
};

//finding all the winners with maximum points
//returns an array with winning players ; 0-dealer,1-player1 etc.
Game.prototype.findWinners = function(){
  var results = this.players.map(function(player){
    if (!player.isLost()) {return player.score();} else
        return 0;
  });    
  var max = Math.max.apply(null,results);
  //ix - index of winning players 
  var ix =[]; 
  for(var i = 0; i < results.length; i++){
    if(results[i] === max) ix.push(i+1);
  }
  if ( !this.dealer.isLost() && 
       this.dealer.score() >= max) return [0]; //dealer won
  return ix;
};

