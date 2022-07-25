class VideoCard extends MediaCard {
    constructor(media) {
        super(media);
    }

    createVideoCard() {
        const $mediaCard = document.createElement('article');
        $mediaCard.classList.add('media_card');
        const mediaCard = `
            <a href="assets/medias/${this._media.photographerId}/${this._media.video}" class="media_card__media">
                <video data-media-id=${this._media.id}>
                    <source src="assets/medias/${this._media.photographerId}/${this._media.video}" type="video/mp4">
                    Sorry, your browser doesn't support embedded videos.
                </video>
            </a>
            <div class="media_card__description">
                <h2 class="media_card__description__title">${this._media.title}</h2>
                <p class="media_card__description__popularity"><span class="number_of_likes">${this._media.likes}</span> <span class="heart"><i class="fa-solid fa-heart" aria-label="likes"></i></span></p>
            </div>
        `;
        $mediaCard.innerHTML = mediaCard;
        return $mediaCard;



        // // Creation of div.media_card__media
        // const $media = document.createElement('div');
        // $media.classList.add('media_card__media');

        // const $source = document.createElement('source');
        // $source.setAttribute('src', `assets/medias/${this._media.photographerId}/${this._media.video}`);
        // $source.setAttribute('type', 'video/mp4');

        // const $video = document.createElement('video');
        // // $video.setAttribute('controls', 'controls');
        // $video.setAttribute('data-media-id', this._media.id);
        // $video.appendChild($source);
        // $video.innerHTML = $video.innerHTML + 'Sorry, your browser doesn\'t support embedded videos.';

        // $media.appendChild($video);

        // // Creation of div.media_card__description
        // const $description = document.createElement('div');
        // $description.classList.add('media_card__description');

        // const $title = document.createElement('h2');
        // $title.classList.add('media_card__description__title');
        // $title.textContent = this._media.title;

        // const $popularity = document.createElement('p');
        // $popularity.classList.add('media_card__description__popularity');

        // const $numberOfLikes = document.createElement('span');
        // $popularity.innerHTML = `<span class="number_of_likes">${this._media.likes}</span> <a href="#" class="heart"><i class="fa-solid fa-heart" aria-label="likes"></i></a>`;

        // $description.appendChild($title);
        // $description.appendChild($popularity);

        // // Creation of article.media_card
        // const $mediaCard = document.createElement('article');
        // $mediaCard.classList.add('media_card');

        // $mediaCard.appendChild($media);
        // $mediaCard.appendChild($description);

        // // Creation of the link around the card
        // const $link = document.createElement('a');
        // $link.setAttribute('href', `assets/medias/${this._media.photographerId}/${this._media.video}`);

        // $link.appendChild($mediaCard);

        // return $link;

        ///////////////////////

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

    createLightboxVideoCard() {
        const $mediaWrapper = document.querySelector('.lightbox__container__media');
        
        const $source = document.createElement('source');
        $source.setAttribute('src', `assets/medias/${this._media.photographerId}/${this._media.video}`);
        $source.setAttribute('type', 'video/mp4');

        const $video = document.createElement('video');
        $video.setAttribute('controls', 'controls');
        $video.setAttribute('data-media-id', this._media.id);
        $video.appendChild($source);
        $video.innerHTML = $video.innerHTML + 'Sorry, your browser doesn\'t support embedded videos.';

        $mediaWrapper.appendChild($video);
    }    
}