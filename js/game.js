var Card = function(suit,rank){
  this.suit = suit;
  this.rank = rank;
};

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