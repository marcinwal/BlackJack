//Card class
var Card = function(suit,rank){
  this.suit = suit;
  this.rank = rank;
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

Hand.prototype.calcScore = function(card) {
  if (card.rank >= 10) return 10;
  if (card.rank === 1) return this.score+11<=21 ? 11 : 1;
  return card.rank;
};

Hand.prototype.add = function(card) {
  this.cards.push(card);
  this.score += this.calcScore(card);
};

Hand.prototype.isLost = function() {
  return this.score > 21;
};

