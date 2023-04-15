require('./style.css')

const Player = require('./src/class/player.class')
const Deck = require('./src/class/deck.class')
const Table = require('./src/class/table.class')
const UI = require('./src/class/ui.class')
const { getNodeIndexRelativelyParent } = require('./src/helpers/node')
const { playerRoles } = require('./src/helpers/player')

/**
 * Render UI
 */
function render() {
  app.innerHTML = UI.init({ players, deck, table });
  events();
  console.log(players);
}

/**
 * Events
 */
function events() {
  // Card event
  document.querySelectorAll(`.${UI.classes.card}`).forEach(card => card.addEventListener('click', ({ currentTarget }) => {
    const cardIndex = getNodeIndexRelativelyParent(card);
    const playerIndex = getNodeIndexRelativelyParent(currentTarget.closest(`.${UI.classes.player}`));
    const currentPyaer = players[playerIndex];

    // Тот кто ходит
    if (currentPyaer.role === playerRoles.game || currentPyaer.role === playerRoles.beginning) {
      const isPush = table.pushCard(currentPyaer.cards[cardIndex]);

      if (isPush) {
        currentPyaer.spliceCard(cardIndex);
        render();
      } else {
        alert(currentPyaer.name + ' на столе нету такой карты!');
      }
    }

    // Тот кто закрывает
    else if (currentPyaer.role === playerRoles.close) {
      if (selectedCloseCard === null) {
        alert('Выберите карту которую хотите закрыть кликнув на нее!')
        return;
      }

      const isPush = table.pushCard(currentPyaer.cards[cardIndex], selectedCloseCard);

      if (isPush) {
        currentPyaer.spliceCard(cardIndex);
        render();
      } else {
        alert('Карта на закрывает!');
      }

      console.log(selectedCloseCard);
    }
  }));

  // Player take action event
  const takeAction = document.querySelector(`.${UI.classes.playerActionTake}`);
  if (takeAction) {
    takeAction.addEventListener('click', ({ currentTarget }) => {
      const playerIndex = getNodeIndexRelativelyParent(currentTarget.closest(`.${UI.classes.player}`));
      const currentPyaer = players[playerIndex];
      let cards = table.takeAll();
      currentPyaer.setCards(cards);

      players = players.map(player => {
        if (player.cards.length < 6) {
          const a = {
            ...player,
            cards: [...player.cards, ...deck.getCardsByCount(6 - player.cards.length)]
          }

          console.log(player.cards.length);
          return a;
        }
        return player;
      });

      render();
    })
  }

  // Table card select close event
  const tableCards = document.querySelectorAll(`.${UI.classes.tableCard}`);
  tableCards.forEach(card => card.addEventListener('click', ({ currentTarget }) => {
    tableCards.forEach(card => card.style.background = 'white')
    currentTarget.style.background = 'red'
    selectedCloseCard = Number(currentTarget.dataset.index)
  }));

  // Bit event

  const bit = document.querySelector(`.${UI.classes.playerActionBit}`)
  if (bit) {
    bit.addEventListener('click', () => {

    });
  }
}

let selectedCloseCard = null;
let activePlayer = 1;
const deck = new Deck()
const table = new Table(deck.trump)
const app = document.getElementById('app')
let players = ['Tigran', 'Mane', 'Karen'].map((name, i) =>
  new Player({
    name,
    cards: deck.getCardsByCount(6),
    role: i === 1 ? playerRoles.close : playerRoles.game,
  })
);

console.log(players)

render();
