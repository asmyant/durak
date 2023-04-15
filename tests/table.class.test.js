const Table = require('../src/class/table.class')
const Deck = require('../src/class/deck.class')
const Card = require('../src/class/card.class')

const deck = new Deck()
const table = new Table(deck.trump)

const cards = [
  new Card({id: 7, typeID: 3}),
  new Card({id: 6, typeID: 3}),
  new Card({id: 6, typeID: 1}),
  new Card({id: 7, typeID: 1}),
]

describe('Table module test', () => {
  test('Push received card', () => {
    table.cards = [[], []];

    expect(table.pushCard(cards[0])).not.toBe(false)
    expect(table.pushCard(cards[3])).not.toBe(false)
  })

  test('Close card', () => {
    table.cards = [
      [cards[1], cards[2]],
      []
    ];

    expect(table.pushCard(cards[0], 0)).not.toBe(false)
    expect(table.pushCard(cards[3], 1)).not.toBe(false)
  })
});