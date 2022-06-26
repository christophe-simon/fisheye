class VideoCard extends MediaCard {
    constructor(media) {
        super(media);
    }

    createVideoCard() {
        // Creation of div.media_card__media
        const mediaCardMediaElt = document.createElement('div');
        mediaCardMediaElt.classList.add('media_card__media');

        const sourceElt = document.createElement('source');
        sourceElt.setAttribute('src', `assets/medias/${this._media.photographerId}/${this._media.video}`);
        sourceElt.setAttribute('type', 'video/mp4');

        const videoElt = document.createElement('video');
        // videoElt.setAttribute('controls', 'controls');
        videoElt.appendChild(sourceElt);
        videoElt.innerHTML = videoElt.innerHTML + 'Sorry, your browser doesn\'t support embedded videos.';

        mediaCardMediaElt.appendChild(videoElt);

        // Creation of div.media_card__description
        const mediaCardDescriptionElt = document.createElement('div');
        mediaCardDescriptionElt.classList.add('media_card__description');

        const mediaCardDescriptionTitleElt = document.createElement('p');
        mediaCardDescriptionTitleElt.classList.add('media_card__description__title');
        mediaCardDescriptionTitleElt.textContent = this._media.title;

        const mediaCardDescriptionPopularityElt = document.createElement('p');
        mediaCardDescriptionPopularityElt.classList.add('media_card__description__popularity');
        mediaCardDescriptionPopularityElt.innerHTML = `${this._media.likes} <i class="fa-solid fa-heart"></i>`;

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