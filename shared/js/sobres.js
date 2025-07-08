
document.addEventListener('DOMContentLoaded', () => {
    const openPackButton = document.getElementById('open-pack-button');
    const packResultsContainer = document.getElementById('pack-results');


    

    async function openNewPack() {
        openPackButton.disabled = true;
        packResultsContainer.innerHTML = '';

        const chosenPokemonIds = new Set();
        while (chosenPokemonIds.size < 6) {
            const randomId = Math.floor(Math.random() * POKEMON_COUNT) + 1;
            chosenPokemonIds.add(randomId);
        }
        const idsToFetch = Array.from(chosenPokemonIds);
        const fetchedPokemonData = await Promise.all(idsToFetch.map(getPokemonData));

        for (const pokemonData of fetchedPokemonData) {
            if (pokemonData) {
                const exists = obtainedCards.some(card => card.id === pokemonData.id);
                if (!exists) {
                    const minimalPokemon = {
                        id: pokemonData.id,
                        name: pokemonData.name,
                        sprites: { front_default: pokemonData.sprites.front_default },
                        types: pokemonData.types,
                        stats: pokemonData.stats
                    };
                    obtainedCards.push(minimalPokemon);
                }
                const cardElement = createPokemonCardElement(pokemonData, true);
                packResultsContainer.appendChild(cardElement);
            }
        }
        saveCardsToLocalStorage();
        openPackButton.disabled = false;
    }

    openPackButton.addEventListener('click', openNewPack);
});

function createPokemonCardElement(pokemon, isOpenedPack = false) {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('pokemon-card', 'unlocked');
    cardDiv.dataset.id = pokemon.id;
    const imageUrl = pokemon.sprites.front_default;
    cardDiv.innerHTML = `
        <img src="${imageUrl}" alt="${capitalize(pokemon.name)}">
        <p>${capitalize(pokemon.name)}</p>
    `;
    if (isOpenedPack) cardDiv.classList.add('newly-opened');
    return cardDiv;
}