class VideoCard extends MediaCard {
    constructor(media) {
        super(media);
    }

    createVideoCard() {
        const $mediaCard = document.createElement('article');
        $mediaCard.classList.add('media_card');
        const mediaCard = `
            <div class="media_card__media" tabindex="0" title="${this._media.title}" aria-labelledby="media_card__description__title">
                <video data-media-id=${this._media.id}>
                    <source src="assets/medias/${this._media.photographerId}/${this._media.video}" type="video/mp4">
                    Désolé, votre navigateur ne permet pas de lire les vidéos.
                </video>
            </div>
            <div class="media_card__description">
                <h2 id="media_card__description__title" class="media_card__description__title">${this._media.title}</h2>
                <p class="media_card__description__popularity"><span class="number_of_likes">${this._media.likes}</span> <span class="heart"><i class="fa-solid fa-heart" tabindex="0" aria-label="Cliquez pour liker le média"></i></span></p>
            </div>
        `;
        $mediaCard.innerHTML = mediaCard;
        return $mediaCard;
    }

    createLightboxVideoCard() {
        const $mediaWrapper = document.querySelector('.lightbox__container__media');
        
        const $source = document.createElement('source');
        $source.setAttribute('src', `assets/medias/${this._media.photographerId}/${this._media.video}`);
        $source.setAttribute('type', 'video/mp4');

        const $video = document.createElement('video');
        $video.setAttribute('controls', 'controls');
        $video.setAttribute('title', this._media.title);
        $video.setAttribute('aria-label', this._media.title);
        $video.setAttribute('data-media-id', this._media.id);
        $video.appendChild($source);
        $video.innerHTML = $video.innerHTML + 'Sorry, your browser doesn\'t support embedded videos.';

        $mediaWrapper.appendChild($video);
    }    
}