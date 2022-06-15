function mediaFactory(data) {
    const { id, photographerId, title, image, likes, date, price } = data;

    const picture = `assets/images/${photographerId}/${image}`;

    function getMediaCardDOM() {

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
    }

    return { picture, getMediaCardDOM }
}