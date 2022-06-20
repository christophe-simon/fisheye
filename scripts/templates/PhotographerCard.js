class PhotographerCard {
    constructor(photographer) {
        this._photographer = photographer;
    }

    createPhotographerCard() {
        // Creation of a.photographer_card__link
        const linkElt = document.createElement('a');
        linkElt.classList.add('photographer_card__link');
        linkElt.href = `photographer.html?photographer=${this._photographer.id}`;
        linkElt.setAttribute('tabindex', 0);
        linkElt.ariaLabel = name;

        const imgElt = document.createElement('img');
        imgElt.setAttribute('src', this._photographer.portrait);
        imgElt.setAttribute('alt', '');

        const h2Elt = document.createElement('h2');
        h2Elt.textContent = this._photographer.name;

        linkElt.appendChild(imgElt);
        linkElt.appendChild(h2Elt);

        // Creation of div.photographer_card__description
        const divElt = document.createElement('div');
        divElt.classList.add('photographer_card__description');

        const placeElt = document.createElement('p');
        placeElt.classList.add('place');
        placeElt.textContent = `${this._photographer.city}, ${this._photographer.country}`;

        const taglineElt = document.createElement('p');
        taglineElt.classList.add('tagline');
        taglineElt.textContent = this._photographer.tagline;

        const priceElt = document.createElement('p');
        priceElt.classList.add('price');
        priceElt.textContent = `${this._photographer.price}€/jour`;

        divElt.appendChild(placeElt);
        divElt.appendChild(taglineElt);
        divElt.appendChild(priceElt);

        // Creation of article.photographer_card
        const articleElt = document.createElement('article');
        articleElt.classList.add('photographer_card');

        articleElt.appendChild(linkElt);
        articleElt.appendChild(divElt);


        return articleElt;

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