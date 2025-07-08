// pokemon-common.js
const POKEMON_COUNT = 150;
const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';

let obtainedCards = JSON.parse(localStorage.getItem('pokemonCollection')) || [];

function saveCardsToLocalStorage() {
    localStorage.setItem('pokemonCollection', JSON.stringify(obtainedCards));
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

async function getPokemonData(id) {
    try {
        const response = await fetch(`${POKEAPI_BASE_URL}${id}/`);
        if (!response.ok) return null;
        return await response.json();
    } catch (e) {
        return null;
    }
}

