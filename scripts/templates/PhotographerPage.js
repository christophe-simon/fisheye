class PhotographerPage {
    constructor(photographer) {
        this._photographer = photographer;
    }

    createPhotographerPage() {
        // Creation of div.photographer__header__data
        const photographerHeaderDataElt = document.createElement('div');
        photographerHeaderDataElt.classList.add('photographer__header__data');

        const nameElt = document.createElement('h1');
        nameElt.textContent = this._photographer.name;

        const placeElt = document.createElement('p');
        placeElt.classList.add('place');
        placeElt.textContent = this._photographer.place

        const taglineElt = document.createElement('p');
        taglineElt.classList.add('tagline');
        taglineElt.textContent = this._photographer.tagline;

        photographerHeaderDataElt.appendChild(nameElt);
        photographerHeaderDataElt.appendChild(placeElt);
        photographerHeaderDataElt.appendChild(taglineElt);

        // Creation of div.photographer__header__button
        const photographerHeaderButtonElt = document.createElement('div');
        photographerHeaderButtonElt.classList.add('photographer__header__button');

        const buttonElt = document.createElement('button');
        buttonElt.classList.add('contact_button');
        buttonElt.textContent = 'Contactez-moi';
        buttonElt.addEventListener('click', displayModal);

        photographerHeaderButtonElt.appendChild(buttonElt);

        // Creation of div.photographer__header__picture
        const photographerHeaderPictureElt = document.createElement('div');
        photographerHeaderPictureElt.classList.add('photographer__header__picture');

        const imgElt = document.createElement('img');
        imgElt.setAttribute('src', this._photographer.portrait);
        imgElt.setAttribute('alt', this._photographer.name);

        photographerHeaderPictureElt.appendChild(imgElt);

        // Creation of div.photographer__header
        const photographerHeaderElt = document.createElement('div');
        photographerHeaderElt.classList.add('photographer__header');

        photographerHeaderElt.appendChild(photographerHeaderDataElt);
        photographerHeaderElt.appendChild(photographerHeaderButtonElt);
        photographerHeaderElt.appendChild(photographerHeaderPictureElt);

        // Creation of p.photographer__way_of_ordering
        const photographerWayOfOrderingElt = document.createElement('p');
        photographerWayOfOrderingElt.classList.add('photographer__way_of_ordering');
        photographerWayOfOrderingElt.textContent = 'Trier par ...';

        // Creation of section.photographer__medias
        const photographerPhotosElt = document.createElement('section');
        photographerPhotosElt.classList.add('photographer__medias');

        // Creation of div.photographer
        const photographerElt = document.createElement('div');
        photographerElt.classList.add('photographer');

        photographerElt.appendChild(photographerHeaderElt);
        photographerElt.appendChild(photographerWayOfOrderingElt);
        photographerElt.appendChild(photographerPhotosElt);


        return photographerElt;

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