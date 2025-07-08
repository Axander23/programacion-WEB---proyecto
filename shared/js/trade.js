document.addEventListener('DOMContentLoaded', () => {
    // Elementos de la interfaz de intercambio
    const yourOfferCard = document.getElementById('your-offer-card');
    const partnerOfferCard = document.getElementById('partner-offer-card');
    const selectYourCardButton = document.getElementById('select-your-card-button');
    const tradeButton = document.getElementById('trade-button');
    const tradeMessage = document.getElementById('trade-message');

    // Simulación de usuarios conectados (puedes integrar Ably aquí)
    // const connectedUsers = document.getElementById('connected-users');

    let selectedCard = null;

    // Mostrar selección de carta propia
    selectYourCardButton.addEventListener('click', () => {
        // Mostrar un modal o lista para seleccionar una carta de obtainedCards
        // Aquí solo mostramos la primera carta como ejemplo
        if (obtainedCards.length > 0) {
            selectedCard = obtainedCards[0];
            yourOfferCard.innerHTML = `
                <img src="${selectedCard.sprites.front_default}" alt="${capitalize(selectedCard.name)}">
                <p>${capitalize(selectedCard.name)}</p>
            `;
            tradeButton.disabled = false;
            tradeMessage.textContent = '';
        } else {
            tradeMessage.textContent = 'No tienes cartas para ofrecer.';
        }
    });

    // Simulación de intercambio (aquí deberías integrar Ably para el real)
    tradeButton.addEventListener('click', () => {
        if (selectedCard) {
            // Aquí iría la lógica de WebSocket/Ably para enviar la carta
            tradeMessage.textContent = `¡Intercambio enviado con ${capitalize(selectedCard.name)}! (Simulado)`;
            tradeButton.disabled = true;
        }
    });

    // Aquí puedes suscribirte a eventos de Ably para recibir ofertas de otros usuarios
});