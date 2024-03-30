function hideImages() {
    document.querySelector('.light-container').classList.add('d-none');
    document.querySelector('.loading-img-top').classList.add('hide-top');
    document.querySelector('.loading-img-bottom').classList.add('hide-bottom');
    setTimeout(() => {
        document.querySelector('.loading-screen').classList.add('d-none');
    }, 1600);

}

// Funktion, um die Bilder wieder anzuzeigen
function showImages() {
    const main = document.querySelector('.loading-screen');
    const pikaImg = document.querySelector('.light-container');
    const topImg = document.querySelector('.loading-img-top');
    const bottomImg = document.querySelector('.loading-img-bottom');
    main.classList.remove('d-none');
    topImg.classList.remove('hide-top');
    bottomImg.classList.remove('hide-bottom');
    topImg.classList.add('show-top');
    bottomImg.classList.add('show-bottom');
    setTimeout(() => {
        pikaImg.classList.remove('d-none');
        topImg.classList.remove('show-top');
        bottomImg.classList.remove('show-bottom');
    }, 1500); // Stelle sicher, dass dies der Dauer deiner Animation entspricht
}
