// --- 1. Selección de elementos del índice ---
const pokemonGrid = document.getElementById('pokemon-grid');

// Modal de detalle de Pokémon
const pokemonDetailModal = document.getElementById('pokemon-detail-modal');
const closeButton = pokemonDetailModal.querySelector('.close-button');
const modalPokemonName = document.getElementById('modal-pokemon-name');
const modalPokemonImage = document.getElementById('modal-pokemon-image');
const modalPokemonType = document.getElementById('modal-pokemon-type');
const modalPokemonStats = document.getElementById('modal-pokemon-stats');

// --- 2. Variables solo del índice ---
let allPokemonData = [];

// --- 3. Funciones solo del índice ---

// Actualiza la barra y etiqueta de progreso
function actualizarProgresoColeccion() {
    const progreso = obtainedCards.length;
    const total = POKEMON_COUNT;
    const progressBar = document.getElementById('collection-progress');
    const progressLabel = document.getElementById('progress-label');
    if (progressBar) progressBar.value = progreso;
    if (progressBar) progressBar.max = total;
    if (progressLabel) progressLabel.textContent = `${progreso} / ${total} Pokémones desbloqueados`;
}


// Carga los nombres e IDs de todos los Pokémon para el grid
async function fetchAllPokemonNamesAndIds() {
    try {
        const response = await fetch(`${POKEAPI_BASE_URL}?limit=${POKEMON_COUNT}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        allPokemonData = data.results.map((pokemon, index) => ({
            id: index + 1,
            name: pokemon.name,
        }));
        renderPokemonGrid();
    } catch (error) {
        console.error("Error al cargar la lista de Pokémon para el índice:", error);
    }
}

// Renderiza el grid de cartas
function renderPokemonGrid() {
    pokemonGrid.innerHTML = '';
    if (allPokemonData.length === 0) return;
    allPokemonData.forEach(pokemon => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('pokemon-card');
        cardDiv.dataset.id = pokemon.id;
        const isUnlocked = obtainedCards.some(card => card.id === pokemon.id);
        if (isUnlocked) {
            const unlockedPokemonData = obtainedCards.find(card => card.id === pokemon.id);
            cardDiv.classList.add('unlocked');
            const imageUrl = unlockedPokemonData.sprites.front_default;
            cardDiv.innerHTML = `
                <img src="${imageUrl}" alt="${capitalize(unlockedPokemonData.name)}">
                <p>${capitalize(unlockedPokemonData.name)}</p>
            `;
            cardDiv.addEventListener('click', () => {
                mostrarModalPokemon(unlockedPokemonData);
            });
        } else {
            cardDiv.classList.add('locked');
            cardDiv.innerHTML = `?`;
            cardDiv.addEventListener('click', () => {
                // No hace nada, carta bloqueada
            });
        }
        pokemonGrid.appendChild(cardDiv);
    });
    actualizarProgresoColeccion();
}

// Modal de detalle de Pokémon (solo índice)
function mostrarModalPokemon(pokemonData) {
    modalPokemonName.textContent = capitalize(pokemonData.name);
    modalPokemonImage.src = pokemonData.sprites.front_default;
    modalPokemonImage.alt = capitalize(pokemonData.name);
    modalPokemonType.textContent = pokemonData.types.map(t => capitalize(t.type.name)).join(', ');
    modalPokemonStats.innerHTML = '';
    pokemonData.stats.forEach(stat => {
        const li = document.createElement('li');
        li.textContent = `${capitalize(stat.stat.name)}: ${stat.base_stat}`;
        modalPokemonStats.appendChild(li);
    });
    pokemonDetailModal.classList.remove('hidden');
}
closeButton.addEventListener('click', () => {
    pokemonDetailModal.classList.add('hidden');
});
pokemonDetailModal.addEventListener('click', (e) => {
    if (e.target === pokemonDetailModal) {
        pokemonDetailModal.classList.add('hidden');
    }
});

// --- Inicialización ---
fetchAllPokemonNamesAndIds();