describe('it should have game',function(){
  var game;

  xit('should add players',function(){
    game = new Game();
    game.addPlayer();
    expect(game.players.length).toEqual(1);
  });

  xit('the dealer should give cards to all',function(){
    game = new Game();
    game.addPlayer();
    game.gameInit();
    expect(game.dealer.hands[0].numOfCards()).toEqual(2);
    expect(game.players[0].hands[0].numOfCards()).toEqual(2);
  });

  xit('should take extra card if hit',function(){
    game = new Game();
    game.addPlayer();
    game.gameInit();
    game.hitPlayer(0);
    expect(game.players[0].hands[0].numOfCards()).toEqual(3);
  });

  xit('should be the end of the game if all lost/pass',function(){
    game2 = new Game();
    game2.addPlayer();
    game2.gameInit();
    game2.players[0].stand();
    expect(game2.playersFinished()).toBe(true);
  });

  it('dealer should play until > 16',function(){
    game = new Game();
    game.addPlayer();
    game.gameInit();
    console.log(game.dealer.score());    
    game.playDealer();
    expect(game.dealer.score()).toBeGreaterThan(16);
    console.log(game.dealer.score()); 
  });

});
