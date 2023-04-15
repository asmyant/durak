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

  takeAll() {
    const all = [].concat(this.cards[0], this.cards[1]);
    this.cards = [[], []];
    return all;
  }

  checkAllClosed() {
    return this.cards[0].length !== 0 ? this.cards[0].length === this.cards[1].length : false;
  }

  /**
   * Push new card in table
   * @param card {Card}
   * @param closeIndex {number | boolean}
   * @returns {boolean | number}
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
    let index = [...this.cards[0], ...this.cards[1]].findIndex(receiveCard => card.priority === receiveCard.priority)

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

    const a = (card.typeId === this.trump.typeId && closeCard.typeId !== this.trump.typeId)
      || (card.typeId === closeCard.typeId && card.priority > closeCard.priority)
      ? this.cards[1][closeIndex] = card
      : false;

    console.log(this.cards);

    return a;
  }
}

module.exports = Table;
