class Table {
  cards = [
    [], []
  ]

  /**
   * Game table module
   * @param trump {Card}
   */
  constructor(trump) {
    this.trump = trump;
  }

  /**
   * Push new card in table
   * @param card {Card}
   * @param closeIndex {number | boolean}
   */
  pushCard(card, closeIndex = false) {
    return closeIndex !== false
      ? this.#closeReceiveCard(card, closeIndex)
      : this.#pushReceiveCard(card);
  }

  /**
   * Push new received card
   * @param card {Card}
   */
  #pushReceiveCard(card) {
    let index = this.cards[0].findIndex(receiveCard => card.priority === receiveCard.priority)

    return this.cards[0].length === 0 || index !== -1
      ? this.cards[0].push(card)
      : false;
  }

  /**
   *
   * @param card {Card}
   * @param closeIndex {number}
   */
  #closeReceiveCard(card, closeIndex) {
    let closeCard = this.cards[0][closeIndex];

    return (card.typeId === this.trump.typeId && closeCard.typeId !== this.trump.typeId)
    || (card.typeId === closeCard.typeId && card.priority > closeCard.priority)
      ? this.cards[1][closeIndex] = card
      : false;
  }
}

module.exports = Table;