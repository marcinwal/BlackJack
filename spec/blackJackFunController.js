describe('BlackJackFunController',function(){
  beforeEach(module('BlackJackFun'));
  
  var scope,ctrl;

  beforeEach(inject(function($rootScope,$controller){
    scope = $rootScope.$new();
    ctrl = $controller('BlackJackFunController',{
      $scope: scope
    });
  }));

  it('should initialize with dealer cards',function(){
    expect(scope.dealer.hands[0].numOfCards()).toEqual(2);
    expect(scope.players[0].hands[0].numOfCards()).toEqual(2);
  });


});