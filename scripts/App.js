class App {
    constructor() {
        this.$photographersWrapper = document.querySelector('.photographers_section');
        this.$specificPhotographerWrapper = document.querySelector('.photographer_data');
        this._photographerApi = new PhotographerApi('/data/photographers.json');
        this._mediaApi = new MediaApi('/data/photographers.json');
    }

    async displayHomePage() {
        // Get photographers data from photographers.json file
        const photographersData = await this._photographerApi.getPhotographersData();

        photographersData
            // Transform array of data in array of photographers
            .map(photographer => new Photographer(photographer))
            .forEach(photographer => {
                const Template = new PhotographerCard(photographer);
                this.$photographersWrapper.appendChild(
                    Template.createPhotographerCard()
                );
            })
    }

    async displayPhotographerPage() {
        // Get the photographer's id from the url
        const params = (new URL(document.location)).searchParams;
        const photographerId = parseInt(params.get('photographer'));
        // We check that the id is a number
        if (!isNaN(photographerId)) {
            const photographer = await this._photographerApi.getPhotographerDataByPhotographerId(photographerId);
            const photographerPageTemplate = new PhotographerPage(photographer);
            this.$specificPhotographerWrapper.innerHTML = photographerPageTemplate.createPhotographerPage();

            const $mediasWrapper = document.querySelector('.photographer_portfolio__medias');
            const mediasData = await this._mediaApi.getMediasDataByPhotographerId(photographerId);

            const medias = mediasData
                .map((media) => {
                    if (typeof media.image !== 'undefined') {
                        return new Image(media);
                    } else if (typeof media.video !== 'undefined') {
                        return new Video(media);
                    }
                    return null;
                })
                .filter(element => (element instanceof Image) || (element instanceof Video));

            medias.forEach(media => {
                if (media instanceof Image) {
                    const mediaTemplate = new ImageCard(media);
                    $mediasWrapper.appendChild(
                        mediaTemplate.createImageCard()
                    );
                } else if (media instanceof Video) {
                    const mediaTemplate = new VideoCard(media);
                    $mediasWrapper.appendChild(
                        mediaTemplate.createVideoCard()
                    );
                }
            });

            // Creation of the aside box mentionning total likes and daily price of the photographer
            const $asideWrapper = document.querySelector('.aside');
            const asideTemplate = new Aside(photographer, medias);
            $asideWrapper.innerHTML = asideTemplate.createAside();

            // Creation of the addEventListener on the contact button
            const $contactButton = document.querySelector('.contact_button');
            $contactButton.addEventListener('click', displayModal);

            // Creation of the addEventListener that launches the lightbox when we click on a link on a media card
            const $links = document.querySelectorAll('.photographer_portfolio__medias a');
            $links.forEach((link, index) => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const lightbox = new Lightbox(medias, index);
                    lightbox.display();
                })
            });

            // DOM variables
            const $lightbox = document.getElementById('lightbox');
            const $lightboxCloseButton = document.querySelector('.lightbox__close');
            const $lightboxNextButton = document.querySelector('.lightbox__next');
            const $lightboxPreviousButton = document.querySelector('.lightbox__prev');
            const $mediaWrapper = document.querySelector('.lightbox__container__media');
            const $titleWrapper = document.querySelector('.lightbox__container__title');



            // Creation of the addEventListener on the close button of the lightbox
            $lightboxCloseButton.addEventListener('click', () => {

                // We check if the current media displayed is an image or a video and we look its index in the medias array
                let currentMediaType;
                let index;
                if ($mediaWrapper.firstChild && $mediaWrapper.firstChild.tagName === 'IMG') {
                    currentMediaType = 'img';
                    const $img = document.querySelector('.lightbox__container__media img');
                    const currentImagePath = $img.src;
                    index = medias.findIndex((media) => currentImagePath.endsWith(media._image) === true);
                    console.log(index);
                } else if ($mediaWrapper.firstChild && $mediaWrapper.firstChild.tagName === 'VIDEO') {
                    currentMediaType = 'video';
                    const $video = document.querySelector('.lightbox__container__media video');
                    const currentVideoPath = $video.firstChild.src;
                    index = medias.findIndex((media) => currentVideoPath.endsWith(media._video) === true);
                    console.log(index);
                }

                // We delete the media and its title, according to the fact it is an image or a video
                if (currentMediaType === 'img') {
                    const $img = document.querySelector('.lightbox__container__media img');
                    $mediaWrapper.removeChild($img);
                    $titleWrapper.textContent = ''; 
                } else if (currentMediaType === 'video') {
                    const $video = document.querySelector('.lightbox__container__media video');
                    $mediaWrapper.removeChild($video);
                    $titleWrapper.textContent = ''; 
                }

                // We hide the lightbox
                $lightbox.style.display = 'none';
            });

            // Creation of the addEventListener on the next button of the lightbox
            $lightboxNextButton.addEventListener('click', () => {

                // We check if the current media displayed is an image or a video and we look its index in the medias array
                let currentMediaType;
                let index;
                if ($mediaWrapper.firstChild && $mediaWrapper.firstChild.tagName === 'IMG') {
                    currentMediaType = 'img';
                    const $img = document.querySelector('.lightbox__container__media img');
                    const currentImagePath = $img.src;
                    index = medias.findIndex((media) => currentImagePath.endsWith(media._image) === true);
                    console.log(index);
                } else if ($mediaWrapper.firstChild && $mediaWrapper.firstChild.tagName === 'VIDEO') {
                    currentMediaType = 'video';
                    const $video = document.querySelector('.lightbox__container__media video');
                    const currentVideoPath = $video.firstChild.src;
                    index = medias.findIndex((media) => currentVideoPath.endsWith(media._video) === true);
                    console.log(index);
                }

                // We calculate the index of the next media to display, according the fact we are at the end of the array or not
                let newIndex;
                if (index !== (medias.length - 1)) {
                    newIndex = index + 1;
                } else {
                    newIndex = 0;
                }

                // We delete the current media and its title
                if (currentMediaType === 'img') {
                    const $img = document.querySelector('.lightbox__container__media img');
                    $mediaWrapper.removeChild($img);
                    $titleWrapper.textContent = ''; 
                } else if (currentMediaType === 'video') {
                    const $video = document.querySelector('.lightbox__container__media video');
                    $mediaWrapper.removeChild($video);
                    $titleWrapper.textContent = ''; 
                }

                // We display the next media and its title
                const nextMedia = medias[newIndex];
                if (nextMedia instanceof Image) {
                    const newMedia = medias[newIndex]._image;
                    const $img = document.createElement('img');
                    $img.setAttribute('src', `assets/medias/${photographerId}/${newMedia}`);
                    $img.setAttribute('alt', '');
                    $mediaWrapper.appendChild($img);
                } else if (nextMedia instanceof Video) {
                    const newMedia = medias[newIndex]._video;
                    const $source = document.createElement('source');
                    $source.setAttribute('src', `assets/medias/${photographerId}/${newMedia}`);
                    $source.setAttribute('type', 'video/mp4');
            
                    const $video = document.createElement('video');
                    $video.setAttribute('controls', 'controls');
                    $video.appendChild($source);
                    $video.innerHTML = $video.innerHTML + 'Sorry, your browser doesn\'t support embedded videos.';
            
                    $mediaWrapper.appendChild($video);
                }
                console.log(nextMedia);
                $titleWrapper.textContent = medias[newIndex]._title;
                
            });

            // Creation of the addEventListener on the previous button of the lightbox
            $lightboxPreviousButton.addEventListener('click', () => {

                // We check if the current media displayed is an image or a video and we look its index in the medias array
                let currentMediaType;
                let index;
                if ($mediaWrapper.firstChild && $mediaWrapper.firstChild.tagName === 'IMG') {
                    currentMediaType = 'img';
                    const $img = document.querySelector('.lightbox__container__media img');
                    const currentImagePath = $img.src;
                    index = medias.findIndex((media) => currentImagePath.endsWith(media._image) === true);
                    console.log(index);
                } else if ($mediaWrapper.firstChild && $mediaWrapper.firstChild.tagName === 'VIDEO') {
                    currentMediaType = 'video';
                    const $video = document.querySelector('.lightbox__container__media video');
                    const currentVideoPath = $video.firstChild.src;
                    index = medias.findIndex((media) => currentVideoPath.endsWith(media._video) === true);
                    console.log(index);
                }

                // We calculate the index of the previous media to display, according the fact we are at the beginning of the array or not
                let newIndex;
                console.log(index);
                if (index !== 0) {
                    newIndex = index - 1;
                } else {
                    newIndex = medias.length - 1;
                }
                console.log(newIndex);

                // We delete the current media and its title
                if (currentMediaType === 'img') {
                    const $img = document.querySelector('.lightbox__container__media img');
                    $mediaWrapper.removeChild($img);
                    $titleWrapper.textContent = ''; 
                } else if (currentMediaType === 'video') {
                    const $video = document.querySelector('.lightbox__container__media video');
                    $mediaWrapper.removeChild($video);
                    $titleWrapper.textContent = ''; 
                }

                // We display the previous media and its title
                const prevMedia = medias[newIndex];
                if (prevMedia instanceof Image) {
                    const newMedia = medias[newIndex]._image;
                    const $img = document.createElement('img');
                    $img.setAttribute('src', `assets/medias/${photographerId}/${newMedia}`);
                    $img.setAttribute('alt', '');
                    $mediaWrapper.appendChild($img);
                } else if (prevMedia instanceof Video) {
                    const newMedia = medias[newIndex]._video;
                    const $source = document.createElement('source');
                    $source.setAttribute('src', `assets/medias/${photographerId}/${newMedia}`);
                    $source.setAttribute('type', 'video/mp4');
            
                    const $video = document.createElement('video');
                    $video.setAttribute('controls', 'controls');
                    $video.appendChild($source);
                    $video.innerHTML = $video.innerHTML + 'Sorry, your browser doesn\'t support embedded videos.';
            
                    $mediaWrapper.appendChild($video);
                }
                $titleWrapper.textContent = medias[newIndex]._title;

            });

            // Addition of the name of the photographer in the modal window title
            const $modalTitle = document.querySelector('.modal header h2');
            $modalTitle.innerHTML = `Contactez-moi<br>${photographer.name}`;
            
            // Creation of the addEventListener on the close button of the modal
            const $modalCloseButton = document.querySelector('.modal header img');
            $modalCloseButton.addEventListener('click', closeModal);

            // Creation of the addEventListener on the send button of the modal
            const $modalForm = document.querySelector('form');
            $modalForm.addEventListener('submit', manageValidation);

        } else {
            this.$specificPhotographerWrapper.innerHTML = 
                '<div class="error_message">La variable photographer que vous avez indiquée dans l\'URL n\' est pas un nombre.</div>';
        }
    }

    async displayErrorPage() {
 
        console.log('Aucune page ne correspond malheureusement à cette adresse.');
    }

}

const currentPage = document.location.pathname;
const app = new App();
switch (currentPage) {
    case '/':
    case '/index.html':
        app.displayHomePage();
        break;
    case '/photographer.html':
        app.displayPhotographerPage();
        break;
    default:
        app.displayErrorPage();
}
