let loadedPokeHtml = '';
let arrayStart = 0;
let arrayProgress = 19

function loadMorePokeon() {
    showImages();
    arrayStart += 20;
    arrayProgress += 20;
    loadPokeHtml();
}

async function loadPokeHtml() {
    for (let i = arrayStart; i <= arrayProgress; i++) {
        const details = await initPokeDetails(i);
        loadedPokeHtml += smallCardHtml(i, details.pokePic, details.pokeId, details.name, details.type1, details.type2);
    }
    showContentHtml();
}

function showContentHtml() {
    const render = document.getElementById('renderContainer');
    render.innerHTML = loadedPokeHtml;
    hideImages();
}

async function initPokeDetails(i) {
    const pokePic = pokemonDetails[i].sprites.other.home.front_default;
    let pokeId = pokemonDetails[i].id;
    let name = await nameRule(i, pokeId);
    let type1 = pokemonDetails[i].types[0].type.name;
    let type2 = await typeTwoForColor(i);
    name = capitalizeFirstLetter(name);
    type1 = capitalizeFirstLetter(type1);
    type2 = capitalizeFirstLetter(type2);
    return { pokePic, pokeId, name, type1, type2 };
}


function typeRule(pokeId, type1, type2) {
    if (type1 !== type2) {
        return elementHtml(pokeId, type1, type2);
    } else {
        return elementSoloHtml(pokeId, type1);
    }
}


function typeTwoForColor(i) {
    if (pokemonDetails[i].types[1]) {
        return pokemonDetails[i].types[1].type.name;
    } else {
        return pokemonDetails[i].types[0].type.name;
    }
}


function nameRule(i, pokeId) {
    if (language === 'en') {
        return pokemonDetails[i].name;
    } else {
        return searchGermanName(pokeId);
    }
}


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


function smallCardHtml(i, pokePic, pokeId, name, type1, type2) {
    return /*HTML*/`
    <div id='card${pokeId}' onmouseout='cardHoverOut(${pokeId})' onmouseover='cardHoverActiv(${pokeId})' class="poke-card"
        style='background: linear-gradient(180deg, var(--${type1}) 25%, black 50%, var(--${type2}) 75%)'>
        <img id='cardBg${pokeId}' class="card-bg-img" src="./src/img/background/card-background.png" alt="card-bg">
        <span id='cardNumber${pokeId}' class="card-number">#${pokeId}<br>${name}</span>
        <img id='cardPokemon${pokeId}' class="pokemon-img" src="${pokePic}" alt="poke-img">
        ${typeRule(pokeId, type1, type2)}
    </div>
    `;
}


function elementSoloHtml(pokeId, type1) {
    return /*html*/`
    <div class='type-container' style='justify-content: center'>
        <span id='cardSpanA${pokeId}' class='element-span' style='background-color: var(--${type1})'>${type1}</span>
    </div>
    `;
}


function elementHtml(pokeId, type1, type2) {
    return/*html*/`
    <div class='type-container' style='justify-content: space-between'>
        <span id='cardSpanA${pokeId}' class='element-span' style='background-color: var(--${type1})'>${type1}</span>
        <span id='cardSpanB${pokeId}' class='element-span' style='background-color: var(--${type2})'>${type2}</span>
    </div>
    `;
}

