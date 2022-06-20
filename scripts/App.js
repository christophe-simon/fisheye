class App {
    constructor() {
        this.$photographersWrapper = document.querySelector('.photographers_section');
        this.$specificPhotographerWrapper = document.querySelector('.photographer_data');
        this._photographerApi = new PhotographerApi('/data/photographers.json');
        this._mediaApi = new MediaApi('/data/photographers.json');
    }

    async displayHomePage() {
        // Ici je récupère mes photographes de mon fichier photographers.json
        const photographersData = await this._photographerApi.getPhotographersData();

        photographersData
            // Ici, je transforme mon tableau de données en un tableau de classe Photographer
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
            const photographerData = await this._photographerApi
                .getPhotographerDataByPhotographerId(photographerId);
            const arrayPhotographersData = [];
            arrayPhotographersData.push(photographerData);
            const arrayPhotographer = arrayPhotographersData.map(
                photographer => new Photographer(photographer)
            );
            const photographer = arrayPhotographer[0];
            const Template = new PhotographerPage(photographer);
            this.$specificPhotographerWrapper.appendChild(
                Template.createPhotographerPage()
            );

            const $mediasWrapper = document.querySelector('.photographer__medias');
            const mediasData = await this._mediaApi.getMediasDataByPhotographerId(photographerId);

            mediasData
            // Ici, je transforme mon tableau de données en un tableau de classe Photographer
            .map((media) => {
                if (typeof media.image !== 'undefined') {
                    return new Image(media);
                } else if (typeof media.video !== 'undefined') {
                    return new Video(media);
                } else {
                    return null;
                }
            })
            .forEach(media => {
                if (typeof media.image !== 'undefined') {
                    const Template = new ImageCard(media);
                    $mediasWrapper.appendChild(
                        Template.createImageCard()
                    );
                } else if (typeof media.video !== 'undefined') {
                    const Template = new VideoCard(media);
                    $mediasWrapper.appendChild(
                        Template.createVideoCard()
                    );
                } else {
                    console.log('on est passé dans le else');
                    // this.$mediasWrapper.appendChild(null);
                }
            })
        } else {
            //displayPhotographerIdIsNan();
            console.log('photographerId n\' est pas un nombre');
        }
    }
}

const currentPage = document.location.pathname;
let pageToDisplay;
switch (currentPage) {
    case '/':
    case '/index.html':
        pageToDisplay = 'home';
        break;
    case '/photographer.html':
        pageToDisplay = 'photographer';
        break;
    default:
        pageToDisplay = null;
}

const app = new App();
switch (pageToDisplay) {
    case 'home':
        app.displayHomePage();
        break;
    case 'photographer':
        app.displayPhotographerPage();
        break;
    // default:
    //     app.displayDefaultPage();
}
