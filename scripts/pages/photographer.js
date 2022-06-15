const photographerDataElt = document.querySelector('.photographer_data');


async function getPhotographerById(photographerId) {
    const response = await fetch('/data/photographers.json');
    const data = await response.json();

    // Version 3 of this code
    return data.photographers.find(element => element.id === photographerId);

    // Version 2:
    // function isThePhotographerIdentifiedById(photographer) {
    //     return photographer.id === photographerId;
    // }
    // return data.photographers.find(isThePhotographerIdentifiedById);

    // Version 1:
    // for (const photographer of data.photographers) {
    //     if (photographer.id === photographerId) {
    //         return photographer;
    //     }
    // }
    // return null;
}

async function getPhotographerSMedias(photographerId) {
    const response = await fetch('/data/photographers.json');
    const data = await response.json();

    const photographerSMedias = [];
    // for (const media of data.media) {
    //     if (media.photographerId === photographerId) {
    //         photographerSMedias.push(media);
    //     }
    // }

    data.media.find((media) => {
        if (media.photographerId === photographerId) {
            photographerSMedias.push(media);
        }
    });
    return photographerSMedias;
}

async function displayPhotographer(photographer) {
    const photographerModel = photographerFactory(photographer);
    const photographerDataDOM = photographerModel.getSpecificPhotographerDataDOM();
    photographerDataElt.appendChild(photographerDataDOM);
}

function displayPhotographerIdIsNan() {
    const errorMessageElt = document.createElement('p');
    errorMessageElt.classList.add('photographer');
    errorMessageElt.textContent = 'Erreur: La variable "photographer" n\'est pas un nombre';
    photographerDataElt.appendChild(errorMessageElt);
}

async function displayDataAboutMedias(medias) {
    const mediasDiv = document.querySelector('.photographer__photos');

    medias.forEach((media) => {
        const mediaModel = mediaFactory(media);
        const mediaCardDOM = mediaModel.getMediaCardDOM();
        mediasDiv.appendChild(mediaCardDOM);
    });
}

async function init() {
    const params = (new URL(document.location)).searchParams;
    const photographerId = parseInt(params.get('photographer'));
    if (!isNaN(photographerId)) {
        const photographer = await getPhotographerById(photographerId);
        displayPhotographer(photographer);
        const medias = await getPhotographerSMedias(photographerId);
        displayDataAboutMedias(medias);
    } else {
        displayPhotographerIdIsNan();
    }
}


init();
