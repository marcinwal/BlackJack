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
  });

  it('should take extra card if hit',function(){
    game = new Game();
    game.addPlayer();
    game.gameInit();
    game.hitPlayer(0);
    expect(game.players[0].hands[0].numOfCards()).toEqual(3);
  });

  it('should be the end of the game if all lost/pass',function(){
    game = new Game();
    game.addPlayer();
    game.gameInit();
    game.players[0].stand();
    expect(game.areAllPlayersFinished()).toBe(true);
  });

  it('dealer should play until > 16',function(){
    game = new Game();
    game.addPlayer();
    game.gameInit();  
    game.playDealer();
    expect(game.dealer.score()).toBeGreaterThan(16);
  });

  it('should have a list of winners',function(){
    game = new Game(2);
    game.addPlayer();
    game.addPlayer();
    game.gameInit();
    game.playDealer();
    expect(game.findWinners().length).toBeGreaterThan(0);
  });

  it('should have a list of cards',function(){
    game = new Game(2);
    game.addPlayer();
    game.addPlayer();
    game.gameInit();
    cardsInHands = game.players[0].handsToArrayOfString();
    expect(cardsInHands[0].length).toEqual(2);
  });

});
