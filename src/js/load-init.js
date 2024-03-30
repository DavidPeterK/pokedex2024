let pokeApi;//namen englisch
let pokemonDetails = []; //name EN , 
let allPokemonImg = [];//bilder
let allSpecies = [];//namen deutsch
let allEvolutions = [];//entwicklungen
let summaryDetails = [];
let language = 'de';
//.names.8 englisch 5 deutsch   https://pokeapi.co/api/v2/pokemon-species/1/   1025

async function loadApi() {
    let url = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=1025`;
    let response = await fetch(url);
    pokeApi = await response.json();
    await loadPokeDetails(); // Warte, bis alle Pokémon geladen sind
    await loadPokeSpecies();  // Dann lade die Speziesinformationen
    loadPokemonImg();     // Anschließend die Bilder
}

async function loadPokeDetails() {
    const promises = pokeApi.results.map(pokemon => fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}/`).then(res => res.json()));
    pokemonDetails = await Promise.all(promises);
    console.log('detail', pokemonDetails);
}

async function loadPokeSpecies() {
    for (let i = 1; i < 1026; i++) {
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

    console.log('species', allSpecies);
}

async function loadPokeEvolution() {
    for (let i = 1; i < 1026; i++) {
        let url = `https://pokeapi.co/api/v2/evolution-chain/${i}/`;
        try {
            let response = await fetch(url);
            if (response.ok) {
                let pokemon = await response.json(); // Load the Pokémon object
                allEvolutions.push(pokemon);
            } else {
                console.log(`Species with ID ${i} not found.`);
            }
        } catch (error) {
            console.error(`Failed to fetch species with ID ${i}: ${error}`);
        }
    }
    console.log('evolutions', allEvolutions);
}

function loadPokemonImg() {
    for (let i = 0; i < pokemonDetails.length; i++) {
        const img = pokemonDetails[i].sprites.other.home.front_default;
        allPokemonImg.push(img);

    }
    console.log('img', allPokemonImg);
    fillSummary();
}

function fillSummary() {
    for (let i = 0; i < 1025; i++) {
        const nameEn = pokeApi.results[i].name;
        const nameDe = allSpecies[i].names[5].name;
        const image = allPokemonImg[i];
        let types = [];
        let statsArray = pokemonDetails[i].stats;
        for (let t = 0; t < pokemonDetails[i].types.length; t++) {
            let type = pokemonDetails[i].types[t].type.name;
            types.push(type);
        }
        summaryDetails.push(pokeInterFace(i, nameEn, nameDe, types, statsArray, image))
    }
    console.log('summary', summaryDetails);
    hideImages();
    renderPokemon();
}

function pokeInterFace(i, nameEn, nameDe, types, statsArray, image) {
    let pokeInterface = {
        id: i + 1, // Setzt die ID
        names: {
            en: nameEn, // Englischer Name
            de: nameDe  // Deutscher Name
        },
        type: types, // Ein Array von Typen, z.B. ['Grass', 'Poison']
        stats: statsArray,
        img: image,
    };
    return pokeInterface;
}
