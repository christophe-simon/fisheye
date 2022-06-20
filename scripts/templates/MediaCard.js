class MediaCard {
    constructor(media) {
        this._media = media;
    }

    createMediaCard() {
        // Creation of div.media_card__media
        const mediaCardMediaElt = document.createElement('div');
        mediaCardMediaElt.classList.add('media_card__media');

        const imgElt = document.createElement('img');
        imgElt.setAttribute('src', picture);
        imgElt.setAttribute('alt', '');
 
        mediaCardMediaElt.appendChild(imgElt);

        // Creation of div.media_card__description
        const mediaCardDescriptionElt = document.createElement('div');
        mediaCardDescriptionElt.classList.add('media_card__description');

        const mediaCardDescriptionTitleElt = document.createElement('p');
        mediaCardDescriptionTitleElt.classList.add('media_card__description__title');

        const mediaCardDescriptionPopularityElt = document.createElement('p');
        mediaCardDescriptionPopularityElt.classList.add('media_card__description__popularity');

        mediaCardDescriptionElt.appendChild(mediaCardDescriptionTitleElt);
        mediaCardDescriptionElt.appendChild(mediaCardDescriptionPopularityElt);

        // Creation of article.media_card
        const mediaCardElt = document.createElement('article');
        mediaCardElt.classList.add('media_card');

        mediaCardElt.appendChild(mediaCardMediaElt);
        mediaCardElt.appendChild(mediaCardDescriptionElt);


        return mediaCardElt;

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