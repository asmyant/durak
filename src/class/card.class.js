const {cards, types} = require('../helpers/cards')

class Card {
  /**
   * Card class constructor
   * @param id {number} - Card id from cards object
   * @param typeID {number} - Type id from types object
   */
  constructor({id, typeID}) {
    this.id = id
    this.typeID = typeID
  }

  /**
   * Get card object from cards object
   * @returns {{name: string, id: number}}
   */
  get card() {
    return cards.find(card => card.id === this.id)
  }

  /**
   * Get type object from types object
   * @returns {{color: string, name: string, id: number}}
   */
  get type() {
    return types.find(type => type.id === this.typeID)
  }

  /**
   * Get card name from cards object
   * @returns {string} - name from cards object
   */
  get name() {
    return this.card.name
  }

  /**
   * Get card priority from cards object
   * @returns {number} - priority id from cards object
   */
  get priority() {
    return this.card.id
  }

  /**
   * Get card type name from types object
   * @returns {string} - type name from types object
   */
  get typeName() {
    return this.type.name
  }

  /**
   * Get card type color from types object
   * @returns {string} - type color from types object
   */
  get typeColor() {
    return this.type.color
  }

  /**
   * Get card type id from types object
   * @returns {number} - type id from types object
   */
  get typeId() {
    return this.type.id
  }

  static getIndex(node) {
    return Array.from(node.parentNode.children).indexOf(node);
  }
}

module.exports = Card;