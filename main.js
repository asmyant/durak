const Player = require('./src/class/player.class')
const Deck = require('./src/class/deck.class')
const Table = require('./src/class/table.class')
const Card = require('./src/class/card.class')

const deck = new Deck()
const table = new Table(deck.trump)

const players = ['Tigran', 'Mane', 'Karen'].map(name =>
  new Player({
    name,
    cards: deck.getCardsByCount(6),
  })
);

table.pushCard(players[0].cards[1]);
console.log(table.pushCard(players[1].cards[1], 0));

console.log(table)