describe('it should have a card',function(){
   var card;

   beforeEach(function(){
      card = new Card(1,12);
   });

   it('should create a card',function(){
    expect(card.suit).toEqual(1);
    expect(card.rank).toEqual(12);
   });

   it('should compare the ranks',function(){
    var card2 = new Card(2,12);
    var card3 = new Card(2,10);

    expect(card.isRankEqual(card2)).toBe(true);
    expect(card.isRankEqual(card3)).toBe(false);  
   });

   it('should convert card to png code',function(){
    var card1 = new Card(2,13);
    var card2 = new Card(3,11);
    var card3 = new Card(4,7);
    expect(card.toString()).toEqual('cq');
    expect(card1.toString()).toEqual('dk');
    expect(card2.toString()).toEqual('hj');
    expect(card3.toString()).toEqual('s7');
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
    expect(hand.isLost()).toBe(true);    
  });

});

describe('it should have players',function(){
  var player;
  var deck;
  var hand;

  beforeEach(function(){
    player = new Player;
    deck = new Deck();
    unshuffledDeck = new Deck();
    deck.shuffle();
  });

  it('should have hand when he starts',function(){
    expect(player.hands.length).toEqual(1);
  });

  it('should be able to add starting hand',function(){
    player.addCard(deck.giveACard());
    player.addCard(deck.giveACard());
    expect(player.hands[0].score).toBeGreaterThan(0);
  });

  it('should be able to say if player lost',function(){
    player.addCard(unshuffledDeck.giveACard());
    player.addCard(unshuffledDeck.giveACard());
    player.addCard(unshuffledDeck.giveACard());
    expect(player.isLost()).toBe(true);       
  });

  it('should check if splitting is allowed',function(){
    player.addCard(unshuffledDeck.giveACard());
    player.addCard(unshuffledDeck.giveACard());
    expect(player.isSplittingAllowed()).toBe(false);    
  });

  it('should be able to split hand',function(){
    var card1 = unshuffledDeck.giveACard();
    var card2 = unshuffledDeck.giveACard();
    player.addCard(card1);
    player.addCard(card2);   
    player.splitHand();
    expect(player.hands.length).toEqual(2);
  });
});


describe('it should describe a dealer',function(){
  var dealer;
  var card1,card2,card3;
  beforeEach(function(){
    dealer = new Dealer();
    card1 = new Card(1,10);
    card2 = new Card(1,6);
    card3 = new Card(2,6);
  });

  it('should take card if poinst <= 16',function(){
    dealer.addCard(card1);
    dealer.addCard(card2);
    expect(dealer.shouldTakeCard()).toBe(true);
    dealer.addCard(card3);
    expect(dealer.shouldTakeCard()).toBe(false);    
  });

  it('should not be allowed to split for a delaer',function(){
    dealer.addCard(card2);
    dealer.addCard(card3);
    expect(dealer.isSplittingAllowed()).toBe(false);
  });
});
