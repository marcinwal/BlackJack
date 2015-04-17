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

});