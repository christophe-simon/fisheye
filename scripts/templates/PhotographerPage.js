class PhotographerPage {
    constructor(photographer) {
        this._photographer = photographer;
    }

    createPhotographerPage() {
        // Creation of div.photographer_presentation__data
        const photographerPresentationDataElt = document.createElement('div');
        photographerPresentationDataElt.classList.add('photographer_presentation__data');

        const nameElt = document.createElement('h1');
        nameElt.textContent = this._photographer.name;

        const placeElt = document.createElement('p');
        placeElt.classList.add('place');
        placeElt.textContent = this._photographer.place

        const taglineElt = document.createElement('p');
        taglineElt.classList.add('tagline');
        taglineElt.textContent = this._photographer.tagline;

        photographerPresentationDataElt.appendChild(nameElt);
        photographerPresentationDataElt.appendChild(placeElt);
        photographerPresentationDataElt.appendChild(taglineElt);

        // Creation of div.photographer_presentation__button
        const photographerPresentationButtonElt = document.createElement('div');
        photographerPresentationButtonElt.classList.add('photographer_presentation__button');

        const buttonElt = document.createElement('button');
        buttonElt.classList.add('contact_button');
        buttonElt.textContent = 'Contactez-moi';
        buttonElt.addEventListener('click', displayModal);

        photographerPresentationButtonElt.appendChild(buttonElt);

        // Creation of div.photographer_presentation__picture
        const photographerPresentationPictureElt = document.createElement('div');
        photographerPresentationPictureElt.classList.add('photographer_presentation__picture');

        const imgElt = document.createElement('img');
        imgElt.setAttribute('src', `assets/photographers/${this._photographer.portrait}`);
        imgElt.setAttribute('alt', this._photographer.name);

        photographerPresentationPictureElt.appendChild(imgElt);

        // Creation of div.photographer_presentation
        const photographerPresentationElt = document.createElement('div');
        photographerPresentationElt.classList.add('photographer_presentation');

        photographerPresentationElt.appendChild(photographerPresentationDataElt);
        photographerPresentationElt.appendChild(photographerPresentationButtonElt);
        photographerPresentationElt.appendChild(photographerPresentationPictureElt);

        // Creation of p.way_of_ordering
        const wayOfOrderingElt = document.createElement('p');
        wayOfOrderingElt.classList.add('way_of_ordering');
        wayOfOrderingElt.textContent = 'Trier par ...';

        // Creation of section.photographer_medias
        const photographerMediasElt = document.createElement('section');
        photographerMediasElt.classList.add('photographer_medias');

        // Creation of div.photographer_portfolio
        const photographerPortfolioElt = document.createElement('div');
        photographerPortfolioElt.classList.add('photographer_portfolio');

        photographerPortfolioElt.appendChild(wayOfOrderingElt);
        photographerPortfolioElt.appendChild(photographerMediasElt);

        // Creation of aside.aside
        const asideElt = document.createElement('aside');
        asideElt.classList.add('aside');


        // Creation of a blank element
        const blankElt = document.createElement('div');

        blankElt.appendChild(photographerPresentationElt);
        blankElt.appendChild(photographerPortfolioElt);
        blankElt.appendChild(asideElt);

        return blankElt.innerHTML;

        // Other way to write the code:

        // const $wrapper = document.createElement('div')
        // $wrapper.classList.add('movie-card-wrapper')

        // const movieCard = `
        //     <div class="movie-thumbnail center">
        //         <img
        //             alt="${this._movie.title}"
        //             src="${this._movie.thumbnail}"
        //         />
        //     </div>
        //     <h3 class="fs-16 center">${this._movie.title}</h3>
        //     <p class="fs-14 center">
        //         <span>${this._movie.released_in}</span>
        //         -
        //         <span>${this._movie.duration}</span>
        //     </p>
        // `
        
        // $wrapper.innerHTML = movieCard
        // return $wrapper
    }
}