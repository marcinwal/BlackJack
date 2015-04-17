describe('it should have a card',function(){
   var card;

   beforeEach(function(){
      card = new Card(1,12);
   });

   it('should create a card',function(){
    expect(card.suit).toEqual(1);
    expect(card.rank).toEqual(12);
   });
});


describe('it shoud have a deck of cards',function(){
  var deck;

  beforeEach(function(){
    deck = new Deck();
  });

  it('should create a deck of 52 cards ',function(){
    expect(deck.count).toEqual(52);
  });

  it('should be able to swap two cards in a deck',function(){
    deck.swap(0,5);
    expect(deck.deck[0].rank).toEqual(6);
  });

  it('should be able to compare two decks',function(){
    var deck2 = new Deck();
    expect(countDifferences(deck,deck2)).toEqual(0);
  });

  it('should be able to compare two decks',function(){
    var deck2 = new Deck();
    deck.swap(0,5);
    expect(countDifferences(deck,deck2)).toEqual(1);
  });

  it('should be able to shuffle a deck',function(){
    unshuffledDeck = new Deck();
    deck.shuffle();
    expect(countDifferences(deck,unshuffledDeck)).toBeGreaterThan(0);
  });

  it('should give a card from a deck',function(){
    var lastCard = deck.deck[51];
    expect(deck.giveACard()).toEqual(lastCard);
  });

});

describe('it should have hands',function(){

  var hand;
  var card;
  var deck;

  beforeEach(function(){
    hand = new Hand();
    unshuffledDeck = new Deck();
  });

  it('should start with an empty hand',function(){
    expect(hand.cards.length).toEqual(0);
  });

  it('should be able to add a card to a hand',function(){
     card = unshuffledDeck.giveACard();
     hand.add(card);
     expect(hand.cards[0]).toEqual(card);
  });

  it('should score a hand after new card given',function(){
    card1 = unshuffledDeck.giveACard();
    card2 = unshuffledDeck.giveACard();
    hand.add(card);
    hand.add(card);
    expect(hand.score).toEqual(20);
  });

  it('should loose with points above 21',function(){
    card1 = unshuffledDeck.giveACard();
    card2 = unshuffledDeck.giveACard();
    card3 = unshuffledDeck.giveACard();
    hand.add(card1);
    hand.add(card2);
    hand.add(card3);
    expect(hand.isLost()).toEqual(true);    
  });

});

describe('it should have players',function(){
  var player;
  var deck;
  var hand;

  beforeEach(function(){
    player = new Player;
    deck = new Deck();
    deck.shuffle();
  });

  it('should have hand when he starts',function(){
    expect(player.hands.length).toEqual(2);
  });

  it('should be able to add starting hand',function(){
    player.addCard(deck.giveACard());
    player.addCard(deck.giveACard());
    expect(player.hands[0].score).toBeGreaterThan(0);
  });
});
