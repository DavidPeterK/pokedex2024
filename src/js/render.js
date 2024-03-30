
function renderPokemon() {
    let render = document.getElementById('renderContainer');
    render.innerHTML = '';
    for (let i = 0; i <= 50; i++) {
        const pokePic = summaryDetails[i].img;
        //---------------------------------------------------
        let name = nameRule(i);
        name = name.charAt(0).toUpperCase() + name.slice(1);
        //---------------------------------------------------
        let type1 = summaryDetails[i].type[0];
        let type2 = summaryDetails[i].type.length > 1 ? summaryDetails[i].type[1] : summaryDetails[i].type[0];
        type1 = type1.charAt(0).toUpperCase() + type1.slice(1);
        type2 = type2.charAt(0).toUpperCase() + type2.slice(1);
        //---------------------------------------------------
        render.innerHTML += /*HTML*/`
            <div id='card${i}' onmouseout='cardHoverOut(${i})' onmouseover='cardHoverActiv(${i})' class="poke-card" style='background: linear-gradient(180deg, var(--${type1}) 25%, black 50%, var(--${type2}) 75%)'>
                <img id='cardBg${i}' class="card-bg-img" src="./src/img/background/card-background.png" alt="card-bg">
                <span id='cardNumber${i}' class="card-number">#${i + 1}<br>${name}</span>
                <img id='cardPokemon${i}' class="pokemon-img" src="${pokePic}" alt="poke-img">
                ${typeRule(i)}
            </div>
        `;
    }
}

function cardHoverActiv(i) {
    let backGround = document.getElementById('cardBg' + i);
    let pokemon = document.getElementById('cardPokemon' + i);
    let typA = document.getElementById('cardSpanA' + i);
    let typB = document.getElementById('cardSpanB' + i);
    let cardNumber = document.getElementById('cardNumber' + i);

    if (backGround) backGround.classList.add('card-bg-activ');
    if (pokemon) pokemon.classList.add('pokemon-img-activ');
    if (typA) typA.classList.add('element-span-activ');
    if (typB) typB.classList.add('element-span-activ'); // Fügt die Klasse hinzu, wenn typB existiert.
    if (cardNumber) cardNumber.classList.add('card-number-activ'); // Fügt die Klasse hinzu, wenn typB existiert.
}


function cardHoverOut(i) {
    let backGround = document.getElementById('cardBg' + i);
    let pokemon = document.getElementById('cardPokemon' + i);
    let typA = document.getElementById('cardSpanA' + i);
    let typB = document.getElementById('cardSpanB' + i);
    let cardNumber = document.getElementById('cardNumber' + i);

    if (backGround) backGround.classList.remove('card-bg-activ');
    if (pokemon) pokemon.classList.remove('pokemon-img-activ');
    if (typA) typA.classList.remove('element-span-activ');
    if (typB) typB.classList.remove('element-span-activ');
    if (cardNumber) cardNumber.classList.remove('card-number-activ');
}


function typeRule(i) {
    let type1 = summaryDetails[i].type[0];
    let type2 = summaryDetails[i].type.length > 1 ? summaryDetails[i].type[1] : summaryDetails[i].type[0];
    type1 = type1.charAt(0).toUpperCase() + type1.slice(1);
    type2 = type2.charAt(0).toUpperCase() + type2.slice(1);

    if (summaryDetails[i].type.length > 1) {
        return /*html*/`
            <div class='type-container' style='justify-content: space-between'>
                <span id='cardSpanA${i}' class='element-span' style='background-color: var(--${type1})'>${type1}</span>
                <span id='cardSpanB${i}' class='element-span' style='background-color: var(--${type2})'>${type2}</span>
            </div>
        `;
    } else {
        return /*html*/`
            <div class='type-container' style='justify-content: center'>
                <span id='cardSpanA${i}' class='element-span' style='background-color: var(--${type1})'>${type1}</span>
            </div>
        `;
    }

}

function nameRule(i) {
    if (language == 'en') {
        return summaryDetails[i].names.en;
    } else {
        return summaryDetails[i].names.de;
    }
}

// Funktion, um die Bilder verschwinden zu lassen
function hideImages() {
    document.querySelector('.light-container').classList.add('d-none');
    document.querySelector('.loading-img-top').classList.add('hide-top');
    document.querySelector('.loading-img-bottom').classList.add('hide-bottom');
}

// Funktion, um die Bilder wieder anzuzeigen
function showImages() {
    const pikaImg = document.querySelector('.light-container');
    const topImg = document.querySelector('.loading-img-top');
    const bottomImg = document.querySelector('.loading-img-bottom');
    topImg.classList.remove('hide-top');
    bottomImg.classList.remove('hide-bottom');
    topImg.classList.add('show-top');
    bottomImg.classList.add('show-bottom');
    setTimeout(() => {
        pikaImg.classList.remove('d-none');
        topImg.classList.remove('show-top');
        bottomImg.classList.remove('show-bottom');
    }, 2900); // Stelle sicher, dass dies der Dauer deiner Animation entspricht
}

