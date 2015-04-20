BlackJack JS game for X number of players and the dealer.

I created the following classes:

Card
Deck (set of 52 cards which can be easily extended to multi decks)
Hand (set of cards)
Player (who has two hands(2nd after the split))
Dealer which inherits from Player and has algo for playing decisions
Game which is an object controlling overall game of one dealer and n-players;

Notes on the initial structure:
I could have treated splits as splits of Players into two other players and then the structure could have been modified with one base object which could have been the parrent for both player and dealer objects.

To play the game please "open index.html".

I used AngularJS. 

"BlackJack engine" was build using TDD as I was building the structure.

I learnt more about AngularJS but it was my first project not a walkthrough so I indend to solve similiar tasks.

I also had fun with some map/reduce functions like Game.prototype.areAllPlayersFinished.

Dealer is now allowed to split but it can be added.

