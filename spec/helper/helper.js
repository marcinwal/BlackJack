var countDifferences = function(deck1,deck2){
  var count=0;
  for(var i = deck1.count-1; i > 0; i--){
    if ((deck1.deck[i].suit != deck2.deck[i].suit) ||
        (deck1.deck[i].rank != deck2.deck[i].rank)) count++;
  }
  return count;
}