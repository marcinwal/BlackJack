describe('it should have game',function(){
  var game;
  

  it('should add players',function(){
    game = new Game();
    game.addPlayer();
    expect(game.players.length).toEqual(1);
  });

  it('the dealer should give cards to all',function(){
    game = new Game();
    game.addPlayer();
    game.gameInit();
    expect(game.dealer.hands[0].numOfCards()).toEqual(2);
    expect(game.players[0].hands[0].numOfCards()).toEqual(2);
    console.log(game.dealer.hands[0]);
    console.log(game.dealer.shouldTakeCard());
  });

});
