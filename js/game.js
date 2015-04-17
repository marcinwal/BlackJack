//Card class
var Card = function(suit,rank){
  this.suit = suit;
  this.rank = rank;
};

Card.prototype.isRankEqual = function(card) {
  return this.rank === card.rank;
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
  return this.deck[--this.count];
};

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
}

//in case of splitting
Hand.prototype.halfScore = function(){
  this.score /= 2; 
}

Hand.prototype.setScore = function(number){
  this.score = number;
}

Hand.prototype.isSplittingAllowed = function(){
  if (this.cards.length > 2) return false;
  if (this.cards.length = 2) return this.cards[0].isRankEqual(this.cards[1]);
  return false;
}

//used in case of splitting
Hand.prototype.popCard = function(){
  return this.cards.pop();
}

//Player class 
var Player = function(){
  this.hands = []; //ready for splits
  this.hands[0] = new Hand();
};

Player.prototype.addCard = function(card,hand) {
  if (typeof hand === 'undefined') hand = 0;
  this.hands[hand].add(card);
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
};

Player.prototype.isSplittingAllowed = function(){
  if (this.hands.length > 1) return false; //already split
  return (this.hands[0].isSplittingAllowed());
};

//Dealer class


