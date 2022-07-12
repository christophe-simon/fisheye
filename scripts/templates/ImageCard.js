class ImageCard extends MediaCard {
    constructor(media) {
        super(media);
    }

    createImageCard() {
        // Creation of div.media_card__media
        const $media = document.createElement('div');
        $media.classList.add('media_card__media');

        const $img = document.createElement('img');
        $img.setAttribute('src', `assets/medias/${this._media.photographerId}/${this._media.image}`);
        $img.setAttribute('alt', '');
 
        $media.appendChild($img);

        // Creation of div.media_card__description
        const $description = document.createElement('div');
        $description.classList.add('media_card__description');

        const $title = document.createElement('p');
        $title.classList.add('media_card__description__title');
        $title.textContent = this._media.title;

        const $popularity = document.createElement('p');
        $popularity.classList.add('media_card__description__popularity');
        $popularity.innerHTML = `${this._media.likes} <i class="fa-solid fa-heart" aria-label="likes"></i>`;

        $description.appendChild($title);
        $description.appendChild($popularity);

        // Creation of article.media_card
        const $mediaCard = document.createElement('article');
        $mediaCard.classList.add('media_card');

        $mediaCard.appendChild($media);
        $mediaCard.appendChild($description);

        // Creation of the link around the card
        const $link = document.createElement('a');
        $link.setAttribute('href', `assets/medias/${this._media.photographerId}/${this._media.image}`);

        $link.appendChild($mediaCard);

        // // We open a lightbox when we click on this link
        // $link.addEventListener('click', (e) => {
        //     e.preventDefault();
        //     const lightbox = new Lightbox();
        //     lightbox.buildLightbox(this._media.title, $link.href);
        //     const $lightbox = document.querySelector('.lightbox');
        //     $lightbox.style.display = 'block';
        // });

        // // We add the possibility to open a lightbox by pressing the "Enter" key while the media card is focused
        // $link.addEventListener('keypress', (e) => {
        //     e.preventDefault();
        //     const lightbox = new Lightbox();
        //     lightbox.buildLightbox(this._media.title, $link.href);
        //     const $lightbox = document.querySelector('.lightbox');
        //     $lightbox.style.display = 'block';
        // });

        return $link;

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