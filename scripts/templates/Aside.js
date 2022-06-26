class Aside {
    constructor(photographer, medias) {
        this._photographer = photographer;
        this._medias = medias;
    }

    getTotalLikes() {
        let sum = 0
        for (let element of this._medias) {
            sum += element.likes;
        }
        return sum;
    }

    createAside() {
        // Creation of span.aside__total_likes
        const asideTotalLikesElt = document.createElement('span');
        asideTotalLikesElt.classList.add('aside__total_likes');

        asideTotalLikesElt.innerHTML = `${this.getTotalLikes()} <i class="fa-solid fa-heart"></i>`;

        // Creation of span.photographer_presentation__button
        const asideDailyPriceElt = document.createElement('span');
        asideDailyPriceElt.classList.add('aside__daily_price');

        asideDailyPriceElt.textContent = `${this._photographer.price}€/jour`;

        // Creation of a blank element
        const blankElt = document.createElement('div');

        blankElt.appendChild(asideTotalLikesElt);
        blankElt.appendChild(asideDailyPriceElt);

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