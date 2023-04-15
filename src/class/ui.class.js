const { playerRoles } = require("../helpers/player");

class UI {
	static classes = {
		players: "players-container",
		player: "player-item",
		card: "card-item",
		cards: "player-cards",
		deck: "deck",
		table: "table",
		tableCard: "table-card",
		playerActionBegining: "player-action-beginning",
		playerActionTake: "player-action-take",
		playerActionBit: "player-action-bit",
	};

	static renderPlayers(players, tableCardsCount, checkAllClosed) {
		return `
			<div class="${UI.classes.players}">
					${players.map((player) => UI.renderPlayer(player, tableCardsCount, checkAllClosed)).join("")}
			</div>
		`;
	}

	static renderPlayer(player, tableCardsCount, checkAllClosed) {
		console.log(checkAllClosed);
		return `
		${tableCardsCount}
			<div class="${UI.classes.player}">
					<div class="player-name">${player.name}</div>
					<div class="${UI.classes.cards}">
							${player.cards.map((card) => UI.renderCard(card)).join("")}
					</div>

					${!checkAllClosed ? (player.role === playerRoles.close && tableCardsCount !== 0 ? `<button type="button" class="${UI.classes.playerActionTake}">Беру</button>` : ``) : ''}
					${player.role === playerRoles.game && checkAllClosed ? `<button type="button" class="${UI.classes.playerActionBit}">Бита</button>` : ``}
			</div>
		`;
	}

	static renderCard(card) {
		return `
			<button type="button" class="${UI.classes.card}">
					${card.name}
					<span style="color: ${card.typeColor}">${card.typeName}</span>
			</button>
		`;
	}

	static renderDeck(deck) {
		return `
			<div class="${UI.classes.deck}">
					${deck.cards.length} 
					Карт (Козрь: <span style="color: ${deck.trump.typeColor}">${deck.trump.typeName} ${deck.trump.name}</span>)
			</div>
		`;
	}

	static renderTable(table) {
		return `
			<div class="${UI.classes.table}">
				${table.cards[0].map((card, index) => `
				<div>
					<div>${UI.renderTableCard(card, index)}</div>
					<div>${table.cards[1][index] ? UI.renderTableCard(table.cards[1][index]) : ''}</div>
				</div>`).join('')}
			</div>
		`;
	}

	static renderTableCard(card, index = false) {
		return `
			<div ${index !== false ? `data-index="${index}"` : ''} class="${UI.classes.tableCard}">
					${card.name}
					<span style="color: ${card.typeColor}">${card.typeName}</span>
			</div>
		`;
	}

	static init({ players, deck, table }) {
		const playersWrap = UI.renderPlayers(players, table.cards[0].length, table.checkAllClosed());
		const deckWrapper = UI.renderDeck(deck);
		const tableWrap = UI.renderTable(table);

		return `
			${playersWrap}
			${deckWrapper}
			${tableWrap}
		`;
	}
}

module.exports = UI;
