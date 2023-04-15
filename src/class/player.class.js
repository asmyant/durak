/**
 * Player module
 */
class Player {
  /**
   *
   * @param name {string}
   * @param cards {[Card]} -
   */
  constructor({name, cards}) {
    this.name = name
    this.cards = cards
  }

  /**
   * Splice player card by index
   * @param index {number}
   * @returns {Card}
   */
  spliceCard(index) {
    return this.cards.splice(index, 1)[0];
  }

  /**
   * Get player card by index
   * @param index {number}
   * @returns {Card}
   */
  getCard(index) {
    return this.cards[index];
  }
}

module.exports = Player;