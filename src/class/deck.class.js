const Card = require('./card.class')
const {types, cards} = require('../helpers/cards')

/**
 * Deck module,
 * working with the deck
 */
class Deck {
  cards = []
  trump = null

  constructor() {
    this.create();
    // this.shuffle();
    this.trump = this.cards.splice(0, 1)[0];
  }

  /**
   * Trump card
   * @returns {Card} - game trump card object
   */
  get trump() {
    return this.trump;
  }

  /**
   * Deck length
   * @returns {number}
   */
  get cardsLength() {
    return this.cards.length
  }

  /**
   * Building a deck
   * Cycle through all cards and types
   * Map assignment type
   * Deck length = types * cards
   */
  create() {
    types.forEach(({id: typeID}) =>
      cards.forEach(({id}) => this.cards.push(
        new Card({id, typeID})
      )))
  }

  /**
   * Shuffle deck
   * Shuffle card indexes
   */
  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = this.cards[i];
      this.cards[i] = this.cards[j];
      this.cards[j] = temp;
    }
  }

  /**
   * Getting a card by number from the deck
   * Once received, the card is removed from the deck
   * @param count {number} - Get card count
   * @returns {[Card]}
   */
  getCardsByCount(count) {
    return this.cards.splice(0, count);
  }
}

module.exports = Deck;