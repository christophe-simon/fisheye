async function getPhotographers() {
    const response = await fetch('/data/photographers.json');
    const data = await response.json();

    return {
        photographers: data.photographers
    };
}

async function displayPhotographers(photographers) {
    const photographersSection = document.querySelector('.photographers_section');

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    const { photographers } = await getPhotographers();
    displayPhotographers(photographers);
}

init();
