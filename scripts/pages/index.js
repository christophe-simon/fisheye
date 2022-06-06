async function getPhotographers() {
    /*fetch('/data/photographers.json')
        .then(Response => Response.json())
        .then(data => {
            const photographers = data['photographers'];
            //console.log(photographers);
        });*/
    const response = await fetch('/data/photographers.json');
    const data = await response.json();

    // et bien retourner le tableau photographers seulement une fois
    return {
        photographers: data['photographers'],
    };
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(
        '.photographer_section'
    );

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

init();
