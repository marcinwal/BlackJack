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