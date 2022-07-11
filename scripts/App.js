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
        const params = (new URL(document.location)).searchParams;
        const photographerId = parseInt(params.get('photographer'));
        if (!isNaN(photographerId)) {
            const photographer = await this._photographerApi
                .getPhotographerDataByPhotographerId(photographerId);
            // const arrayPhotographersData = [];
            // arrayPhotographersData.push(photographerData);
            // const arrayPhotographer = arrayPhotographersData.map(
            //     photographer => new Photographer(photographer)
            // );
            // const photographer = arrayPhotographer[0];
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
            const buttonElt = document.querySelector('.contact_button');
            buttonElt.addEventListener('click', displayModal);

            // Addition of the name of the photographer in the modal window title
            const $titleWrapper = document.querySelector('.modal header h2');
            $titleWrapper.innerHTML = `Contactez-moi<br>${photographer.name}`;
            
            // Creation of the addEventListener on the close button of the modal
            const closeButtonElt = document.querySelector('.modal header img');
            closeButtonElt.addEventListener('click', closeModal);

            // Creation of the addEventListener on the close button of the modal
            const formElt = document.querySelector('form');
            formElt.addEventListener('submit', manageValidation);
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
