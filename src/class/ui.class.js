class UI {
    static classes = {
        players: 'players-container',
        player: 'player-item',
        card: 'card-item',
        cards: 'player-cards',
        deck: 'deck',
    }

    static renderPlayers(players) {
        return `
            <div class="${UI.classes.players}">
                ${players.map(player => UI.renderPlayer(player)).join('')}
            </div>
        `
    }

    static renderPlayer (player) {
        return `
            <div class="${UI.classes.player}">
                <div>${player.name}</div>
                <div class="${UI.classes.cards}">
                    ${player.cards.map(card => UI.renderCard(card)).join('')}
                </div>
            </div>
        `
    }

    static renderCard (card) {
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
            <div>
                ${table.cards.map(couple => `
                    <div>
                        ${couple.map(card => card ? UI.renderCard(card) : '-').join(' ')}
                    </div>
                `).join('')}
            </div>
        `
    }
    
    static init({ players, deck, table }) {
        const playersWrap = UI.renderPlayers(players);
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