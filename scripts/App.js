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
            
            const mediasData = await this._mediaApi.getMediasDataByPhotographerId(photographerId);
            const mediasSortedByPopularity = mediasData.sort((a, b) => b.likes - a.likes);
            const mediasOfThisPhotographer = displayMedias(mediasSortedByPopularity);
            createLinksOnMediasCards(mediasOfThisPhotographer);

            const $asideWrapper = document.querySelector('.aside');
            const asideTemplate = new Aside(photographer, mediasData);
            $asideWrapper.innerHTML = asideTemplate.createAside();

            manageClickOnHeartsBehaviour();

            manageLightboxControls(mediasOfThisPhotographer);
            
            manageSortingFunctionality(mediasOfThisPhotographer);

            const $contactButton = document.querySelector('.contact_button');
            $contactButton.addEventListener('click', () => displayModal(photographer));
            $contactButton.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    displayModal(photographer);
                }
            });
            
            manageModalControls();

        } else {
            this.$specificPhotographerWrapper.innerHTML = 
                '<div class="error_message">La variable photographer que vous avez indiquée dans l\'URL n\' est pas un nombre.</div>';
        }
    }

    displayErrorPage() {
        console.log('Aucune page ne correspond malheureusement à cette adresse.');
    }

}




const displayMedias = (array) => {
    const $mediasWrapper = document.querySelector('.photographer_portfolio__medias');
    $mediasWrapper.innerHTML = '';
    const mediasOfThisPhotographer = array
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

    return mediasOfThisPhotographer;
}

const manageClickOnHeartsBehaviour = () => {
    const $hearts = document.querySelectorAll('.heart');

    $hearts.forEach((heart) => {
        heart.addEventListener('click', () => {
            addOrReduceNumberOfLikes(heart);
        });
        heart.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                addOrReduceNumberOfLikes(heart);
            }
        });
    });

    function addOrReduceNumberOfLikes(heart) {
        heart.parentElement.classList.toggle('liked');
        const $numberOfLikes = heart.parentElement.firstChild;
        const $totalNumberOfLikes = document.getElementById('total_number_of_likes');
        let numberOfLikes = parseInt($numberOfLikes.textContent);
        let totalNumberOfLikes = parseInt($totalNumberOfLikes.textContent);
        if (heart.parentElement.classList.contains('liked')) {
            numberOfLikes++;
            totalNumberOfLikes++;
        } else {
            numberOfLikes--;
            totalNumberOfLikes--;
        }
        $numberOfLikes.textContent = numberOfLikes;
        $totalNumberOfLikes.textContent = totalNumberOfLikes;
    }
}

const manageSortingFunctionality = (array) => {
    const $listbox = document.querySelector('.listbox');
    const $angleUp = document.querySelector('.fa-angle-up');
    const $angleDown = document.querySelector('.fa-angle-down');
    const $sortingOptions = Array.from(document.querySelectorAll('.sorting_option'));
    const $optionsShown = document.querySelectorAll('.dropdown_menu > button');
    let fullyExpandedMenu = false;

    $listbox.addEventListener('click', () => {
        openOrCloseListbox();
    });
    $listbox.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            openOrCloseListbox();
        }
    });

    $sortingOptions.forEach((element) => {
        element.addEventListener('click', () => {
            manageListbox(element, array);
        });
        element.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                manageListbox(element, array);
            }
        });
    }

    );

    function openOrCloseListbox() {
        if (fullyExpandedMenu === false) {
            $sortingOptions.forEach((option) => {
                option.style.display = 'block';
            });
            fullyExpandedMenu = true;
            $angleUp.style.display = 'block';
            $listbox.setAttribute('aria-expanded', 'true');
            $optionsShown[0].focus();
        } else {
            $sortingOptions.forEach((option) => {
                option.style.display = 'none';
            });
            fullyExpandedMenu = false;
        }
        if ($angleDown !== null) {
            $angleDown.style.display = 'none';
        }       
    }

    function manageListbox(element, array) {
        $angleDown.style.display = 'block';

        switch (element.value) {
            case 'popularity':
                array.sort((a, b) => b._likes - a._likes);
                break;
            case 'date':
                array.sort((a, b) => new Date(b._date) - new Date(a._date));
                break;
            case 'title':
                array.sort((a, b) => a._title.localeCompare(b._title));
                break;
        }

        displayMedias(array);
        manageClickOnHeartsBehaviour();
        createLinksOnMediasCards(array);

        let $hiddenButton = document.querySelector('.dropdown_menu .hidden button');
        const $activeOption = document.querySelector('.active_option');
        const clickedOptionPosition = $sortingOptions.indexOf(element);
        const clickedOptionValue = $sortingOptions[clickedOptionPosition].innerText;

        $activeOption.innerText = clickedOptionValue;
        $listbox.setAttribute('aria-label', `tri des médias par ${clickedOptionValue.toLowerCase()}`);
        $listbox.setAttribute('aria-expanded', 'false');
        document.querySelector('.dropdown_menu .hidden').appendChild(element);
        document.querySelector('.dropdown_menu').appendChild($hiddenButton);
        
        $hiddenButton = document.querySelector('.dropdown_menu .hidden button');
        const $optionsShown = document.querySelectorAll('.dropdown_menu > button');
        
        fullyExpandedMenu = false;
        $angleUp.style.display = 'none';
        $hiddenButton.setAttribute('aria-selected', 'true');
        $optionsShown.forEach((option) => {
            option.style.display = 'none';
            option.setAttribute('aria-selected', 'false');
        });
        $listbox.focus();
    }               
}

const createLinksOnMediasCards = (array) => {
    const $mediasCards = document.querySelectorAll('.media_card__media');
    
    $mediasCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            displayLightbox(array, index);
        });
        card.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                displayLightbox(array, index);
            }
        });
    });

    function displayLightbox(array, index) {
        const lightbox = new Lightbox(array, index);
        lightbox.reinitialize();
        lightbox.close();
        lightbox.display();
    }
}


const manageLightboxControls = (array) => {

    const $lightboxCloseButton = document.querySelector('.lightbox__close');
    const $lightboxNextButton = document.querySelector('.lightbox__next');
    const $lightboxPreviousButton = document.querySelector('.lightbox__prev');

    $lightboxCloseButton.addEventListener('click', () => closeLightbox(array));
    $lightboxCloseButton.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            closeLightbox(array);
        }
    });

    $lightboxNextButton.addEventListener('click', () => goToNextMedia(array));
    $lightboxNextButton.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            goToNextMedia(array);
        }
    });

    $lightboxPreviousButton.addEventListener('click', () => goToPreviousMedia(array));
    $lightboxPreviousButton.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            goToPreviousMedia(array);
        }
    });

    function closeLightbox(array) {
        const $mediaWrapper = document.querySelector('.lightbox__container__media');
        let mediaId = parseInt($mediaWrapper.firstChild.dataset.mediaId);
        let index = array.findIndex((media) => media._id === mediaId);
        const lightbox = new Lightbox(array, index);
        lightbox.close();
    }

    function goToNextMedia(array) {
        const $mediaWrapper = document.querySelector('.lightbox__container__media');
        let mediaId = parseInt($mediaWrapper.firstChild.dataset.mediaId);
        let index = array.findIndex((media) => media._id === mediaId);
        const lightbox = new Lightbox(array, index);
        lightbox.next();
    }
    
    function goToPreviousMedia(array) {
        const $mediaWrapper = document.querySelector('.lightbox__container__media');
        let mediaId = parseInt($mediaWrapper.firstChild.dataset.mediaId);
        let index = array.findIndex((media) => media._id === mediaId);
        const lightbox = new Lightbox(array, index);
        lightbox.previous();
    }

}





const currentPage = document.location.pathname;
const app = new App();
switch (currentPage) {
    case '/':
    case '/fisheye/':
    case '/index.html':
    case '/fisheye/index.html':
        app.displayHomePage();
        break;
    case '/photographer.html':
        app.displayPhotographerPage();
        break;
    default:
        app.displayErrorPage();
}
