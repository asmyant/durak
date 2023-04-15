const { playerRoles } = require('../helpers/player')

/**
 * Player module
 */
class Player {
  /**
   *
   * @param name {string}
   * @param cards {[Card]}
   * @param status {wait|game|close}
   * @param moveCount {number} - Player move count
   */
  constructor({ name, cards, role = null, moveCount = 0 }) {
    this.name = name
    this.cards = cards
    this.role = role
    this.moveCount = moveCount;
  }

  /**
   * Splice player card by index
   * @param index {number}
   * @returns {Card}
   */
  spliceCard(index) {
    this.moveCount++;
    return this.cards.splice(index, 1)[0];
  }

  setCards(cards) {
    this.cards = [...this.cards, ...cards];
  }

  /**
   * Toggle status
   */
  static togglePlayerRoles(players, gamePlayerIndex) {
    const { close, wait, game } = playerRoles
    const playersLength = players.length - 1

    gamePlayerIndex = gamePlayerIndex - 1
    players[gamePlayerIndex].role = game

    if (gamePlayerIndex === playersLength) {
      players[0].role = close
      players[playersLength].role = game

      players.forEach((player, index) => {
        if (index !== playersLength && index !== 0) {
          player.role = wait
        }
      });

      return
    }

    players[gamePlayerIndex + 1].role = close

    players.forEach((player, index) => {
      if (index !== gamePlayerIndex && index !== gamePlayerIndex + 1) {
        player.role = wait
      }
    });

    return players;
  }

  static getPlayersCountByRole(players, role) {
    return players.findIndex(player => player.role === role);
  }
}

module.exports = Player;
