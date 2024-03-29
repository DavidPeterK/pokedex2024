let pokeApi;
let allPokemon = [];
let allPokemonImg = [];
let allSpecies = [];
//.names.8 englisch 5 deutsch   https://pokeapi.co/api/v2/pokemon-species/1/
async function loadApi() {
    let url = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=1302`;
    let response = await fetch(url);
    pokeApi = await response.json();
    loadPokemons();
}
async function loadPokemons() {
    for (let i = 0; i < pokeApi.results.length; i++) {
        const pokeName = pokeApi.results[i]['name'];
        let url = `https://pokeapi.co/api/v2/pokemon/${pokeName}/`;
        let response = await fetch(url);
        let pokemon = await response.json(); // Lade das Pokémon-Objekt
        allPokemon.push(pokemon);
    }
    loadSpecies();
    console.log(allPokemon);
}

async function loadSpecies() {
    for (let i = 1; i <= 1026; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon-species/${i}/`;
        try {
            let response = await fetch(url);
            if (response.ok) {
                let pokemon = await response.json(); // Load the Pokémon object
                allSpecies.push(pokemon);
            } else {
                console.log(`Species with ID ${i} not found.`);
            }
        } catch (error) {
            console.error(`Failed to fetch species with ID ${i}: ${error}`);
        }
    }

    console.log(allSpecies);
}


async function loadPokemonImg() {
    for (let i = 0; i < allPokemon.length; i++) {
        const pokeImg = allPokemon[i]['sprites']['other']['home']['front_default'];
        allPokemonImg.push(pokeImg);
    }
    renderPokemon();
}

function renderPokemon() {
    let render = document.getElementById('renderContainer');
    render.innerHTML = '';
    for (let i = 0; i <= 19; i++) {
        const pokePic = allPokemonImg[i];
        render.innerHTML += /*HTML*/`
        <div class="poke-card">
            <span class="card-number">#${i + 1}</span>
            <img class="pokemon-img"
                src="${pokePic}"
                alt="">
        </div>
        `;
    }
}