class App {
    constructor() {
        this.$photographersWrapper = document.querySelector('.photographers_section');
        this.$specificPhotographerWrapper = document.querySelector('.photographer_data');
        this._photographerApi = new PhotographerApi('/data/photographers.json');
        this._mediaApi = new MediaApi('/data/photographers.json');
    }

    async displayHomePage() {
        const photographersData = await this._photographerApi.getPhotographersData();

        photographersData
            .map(photographer => new Photographer(photographer))
            .forEach(photographer => {
                const Template = new PhotographerCard(photographer);
                this.$photographersWrapper.appendChild(
                    Template.createPhotographerCard()
                );
            })
    }

    async displayPhotographerPage() {
        const params = (new URL(document.location)).searchParams;
        const photographerId = parseInt(params.get('photographer'));

        if (!isNaN(photographerId)) {
            const photographer = await this._photographerApi.getPhotographerDataByPhotographerId(photographerId);
            const photographerPageTemplate = new PhotographerPage(photographer);
            this.$specificPhotographerWrapper.innerHTML = photographerPageTemplate.createPhotographerPage();

            const $mediasWrapper = document.querySelector('.photographer_portfolio__medias');
            const mediasData = await this._mediaApi.getMediasDataByPhotographerId(photographerId);

            const mediasOfThisPhotographer = mediasData
                .map((media) => {
                    if (typeof media.image !== 'undefined') {
                        return new Image(media);
                    } else if (typeof media.video !== 'undefined') {
                        return new Video(media);
                    }
                    return null;
                })
                .filter(element => (element instanceof Image) || (element instanceof Video));

                mediasOfThisPhotographer.forEach(media => {
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

            const $asideWrapper = document.querySelector('.aside');
            const asideTemplate = new Aside(photographer, mediasOfThisPhotographer);
            $asideWrapper.innerHTML = asideTemplate.createAside();

            const $contactButton = document.querySelector('.contact_button');
            $contactButton.addEventListener('click', displayModal);

            const $links = document.querySelectorAll('.photographer_portfolio__medias a');
            $links.forEach((link, index) => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const lightbox = new Lightbox(mediasOfThisPhotographer, index);
                    lightbox.reinitialize();
                    lightbox.display();
                })
            });

            const $lightbox = document.getElementById('lightbox');
            const $lightboxCloseButton = document.querySelector('.lightbox__close');
            const $lightboxNextButton = document.querySelector('.lightbox__next');
            const $lightboxPreviousButton = document.querySelector('.lightbox__prev');
            const $mediaWrapper = document.querySelector('.lightbox__container__media');
            const $titleWrapper = document.querySelector('.lightbox__container__title');

            $lightboxCloseButton.addEventListener('click', () => {
                lightbox.close();
            });

            $lightboxNextButton.addEventListener('click', () => {

                let mediaId = parseInt($mediaWrapper.firstChild.dataset.mediaId);
                let index = mediasOfThisPhotographer.findIndex((media) => media._id == mediaId);
                let indexOfNextMedia = (index !== (mediasOfThisPhotographer.length - 1) ? index + 1 : 0);

                if ($mediaWrapper.firstChild) {
                    $mediaWrapper.firstChild.remove();
                }
                $titleWrapper.textContent = '';

                const nextMedia = mediasOfThisPhotographer[indexOfNextMedia];
                if (nextMedia instanceof Image) {
                    const imageCardTemplate = new ImageCard(mediasOfThisPhotographer[indexOfNextMedia]);
                    imageCardTemplate.createLightboxImageCard();
                } else if (nextMedia instanceof Video) {
                    const videoCardTemplate = new VideoCard(mediasOfThisPhotographer[indexOfNextMedia])
                    videoCardTemplate.createLightboxVideoCard();
                }
                $titleWrapper.textContent = mediasOfThisPhotographer[indexOfNextMedia]._title;
                
            });

            $lightboxPreviousButton.addEventListener('click', () => {

                let mediaId = parseInt($mediaWrapper.firstChild.dataset.mediaId);
                let index = mediasOfThisPhotographer.findIndex((media) => media._id === mediaId);
                let indexOfPreviousMedia = (index !== 0 ? index - 1 : mediasOfThisPhotographer.length - 1);

                if ($mediaWrapper.firstChild) {
                    $mediaWrapper.firstChild.remove();
                }
                $titleWrapper.textContent = '';

                const previousMedia = mediasOfThisPhotographer[indexOfPreviousMedia];
                if (previousMedia instanceof Image) {
                    const imageCardTemplate = new ImageCard(mediasOfThisPhotographer[indexOfPreviousMedia]);
                    imageCardTemplate.createLightboxImageCard();
                } else if (previousMedia instanceof Video) {
                    const videoCardTemplate = new VideoCard(mediasOfThisPhotographer[indexOfPreviousMedia])
                    videoCardTemplate.createLightboxVideoCard();
                }
                $titleWrapper.textContent = mediasOfThisPhotographer[indexOfPreviousMedia]._title;

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
