let pokeApi;//namen englisch
let pokemonDetails = []; //name EN , 
let allPokemonImg = [];//bilder
let allSpecies = [];//namen deutsch
let allEvolutions = [];//entwicklungen
let language = 'de';
//.names.8 englisch 5 deutsch   https://pokeapi.co/api/v2/pokemon-species/1/   1025

async function loadApi() {
    try {
        const url = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=1025`;
        const response = await fetch(url);
        pokeApi = await response.json();
        console.log('API loaded', pokeApi);
        await loadPokeDetails();
    } catch (error) {
        console.error('Failed to load API:', error);
        alert('Failed to load Pokémon data. Please try again later.'); // Benutzerfeedback
    }
}

async function loadPokeDetails() {
    try {
        const promises = pokeApi.results.map(pokemon =>
            fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}/`).then(res => res.json())
        );
        pokemonDetails = await Promise.all(promises);
        console.log('Details loaded', pokemonDetails);
        loadPokeHtml();
    } catch (error) {
        console.error('Failed to load Pokémon details:', error);
        alert('Failed to load Pokémon details. Please try again later.'); // Benutzerfeedback
    }
}

async function searchGermanName(pokeId) {
    try {
        let url = `https://pokeapi.co/api/v2/pokemon-species/${pokeId}/`;
        let response = await fetch(url);
        let species = await response.json(); // Load the Pokémon object
        return species.names[5].name;
    } catch (error) {
        console.info('No German name available');
        return pokeApi.results[i].name;
    }
}

