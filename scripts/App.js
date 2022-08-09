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

            const mediasOfThisPhotographer = displayMedias(mediasData);
            // console.log(mediasOfThisPhotographer);

            const $asideWrapper = document.querySelector('.aside');
            const asideTemplate = new Aside(photographer, mediasData);
            $asideWrapper.innerHTML = asideTemplate.createAside();

            manageClickOnHeartsBehaviour();
            manageLighboxFunctionalities(mediasOfThisPhotographer);
            

            manageSortingDropdownMenuFunctionality(mediasOfThisPhotographer);




            const $contactButton = document.querySelector('.contact_button');
            $contactButton.addEventListener('click', displayModal);
            $contactButton.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    displayModal;
                }
            });

            // Addition of the name of the photographer in the modal window title
            const $modalTitle = document.querySelector('.modal header h2');
            $modalTitle.innerHTML = `Contactez-moi<br>${photographer.name}`;
            
            // Creation of the addEventListener on the close button of the modal
            const $modalCloseButton = document.querySelector('.modal header img');
            $modalCloseButton.addEventListener('click', closeModal);
            $modalCloseButton.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    closeModal;
                }
            });

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
        });

        heart.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
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
        });
    });
}

const manageSortingDropdownMenuFunctionality = (array) => {
    const $listbox = document.querySelector('.listbox');
    const $sortingOptions = Array.from(document.querySelectorAll('.sorting_option'));
    const $angleUp = document.querySelector('.fa-angle-up');
    const $angleDown = document.querySelector('.fa-angle-down');
    const $optionShown = document.querySelectorAll('.dropdown_menu > button');
    let fullyExpandedMenu = false;

    $listbox.addEventListener('click', () => {
        if ($angleDown !== null) {
            $angleDown.style.display = 'none';
        }
        if (fullyExpandedMenu === false) {
            $sortingOptions.forEach((option) => {
                option.style.display = 'block';
            });
            $optionShown[0].focus();
            fullyExpandedMenu = true;
            $angleUp.style.display = 'block';
        } else {
            $sortingOptions.forEach((option) => {
                option.style.display = 'none';
            });
            fullyExpandedMenu = false;
        }
    });

    $listbox.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            if ($angleDown !== null) {
                $angleDown.style.display = 'none';
            }
            if (fullyExpandedMenu === false) {
                $sortingOptions.forEach((option) => {
                    option.style.display = 'block';
                });
                $optionShown[0].focus();
                fullyExpandedMenu = true;
                $angleUp.style.display = 'block';
            } else {
                $sortingOptions.forEach((option) => {
                    option.style.display = 'none';
                });
                fullyExpandedMenu = false;
            }
        }
    });

    $sortingOptions.forEach((element) =>
        element.addEventListener('click', () => {
            $angleDown.style.display = 'block';

            switch (element.value) {
                case 'popularity':
                    array.sort((a, b) => b._likes - a._likes);
                break;
                case 'date':
                    array.sort((a, b) => new Date(b._date) - new Date(a._date));
                    array.forEach((elt) => console.log(elt._date))
                break;
                case 'title':
                    array.sort((a, b) => a._title.localeCompare(b._title));
                break;
            }

            
            displayMedias(array);
            manageClickOnHeartsBehaviour();
            manageLighboxFunctionalities(array);

            // new list of options
            const $hiddenButton = document.querySelector('.hidden button');
            const $activeOption = document.querySelector('.active_option');
            const currentButtonPos = $sortingOptions.indexOf(element);
            const clickedOptionValue = $sortingOptions[currentButtonPos].innerText;
            $activeOption.innerText = clickedOptionValue;
            $listbox.setAttribute('aria-label', `liste de tri, trié par ${clickedOptionValue}`);
            document.querySelector('.dropdown_menu').appendChild($hiddenButton);
            document.querySelector('.hidden').appendChild(element);
            
            // close the sortwidget after clicking on an option
            $sortingOptions.forEach((option) => {
                option.style.display = 'none';
            });
            
            fullyExpandedMenu = false;
            $listbox.focus();


            $angleUp.style.display = 'none';
        })

        // element.addEventListener('keypress', (e) => {
        //     if (e.key === 'Enter') {
        //         $angleDown.style.display = 'block';

        //         switch (element.value) {
        //             case 'popularity':
        //             array.sort(function (a, b) {
        //                 return b.likes - a.likes;
        //             });
        //             break;
        //             case 'date':
        //             array.sort(function (a, b) {
        //                 return new Date(b.date) - new Date(a.date);
        //             });
        //             break;
        //             case 'title':
        //             array.sort(function (a, b) {
        //                 return a.title.localeCompare(b.title);
        //             });
        //             break;
        //         }

        //         displayMedias(array);
        //         manageClickOnHeartsBehaviour();
        //         manageLighboxFunctionalities(array);

        //         // new list of options
        //         const $hiddenButton = document.querySelector('.hidden button');
        //         const $activeOption = document.querySelector('.active_option');
        //         const currentButtonPos = $sortingOptions.indexOf(element);
        //         const clickedOptionValue = $sortingOptions[currentButtonPos].innerText;
        //         $activeOption.innerText = clickedOptionValue;
        //         $listbox.setAttribute('aria-label', `liste de tri, trié par ${clickedOptionValue}`);
        //         document.querySelector('.dropdown_menu').appendChild($hiddenButton);
        //         document.querySelector('.hidden').appendChild(element);
                
        //         // close the sortwidget after clicking on an option
        //         $sortingOptions.forEach((option) => {
        //             option.style.display = 'none';
        //         });
                
        //         fullyExpandedMenu = false;
        //         $listbox.focus();


        //         $angleUp.style.display = 'none';
        //     }
        // })
    );
}

const manageLighboxFunctionalities = (array) => {
    const $links = document.querySelectorAll('.media_card__media');
    
    $links.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const lightbox = new Lightbox(array, index);
            lightbox.reinitialize();
            lightbox.close();
            lightbox.display();
        })
        // .addEventListener('keypress', (e) => {
        //     if (e.key === 'Enter') {
        //         e.preventDefault();
        //         const lightbox = new Lightbox(array, index);
        //         lightbox.reinitialize();
        //         lightbox.display();
        //     }
        // })
    });

    // const $lightbox = document.getElementById('lightbox');
    const $lightboxCloseButton = document.querySelector('.lightbox__close');
    const $lightboxNextButton = document.querySelector('.lightbox__next');
    const $lightboxPreviousButton = document.querySelector('.lightbox__prev');
    const $mediaWrapper = document.querySelector('.lightbox__container__media');
    const $titleWrapper = document.querySelector('.lightbox__container__title');

    $lightboxCloseButton.addEventListener('click', () => {
        let mediaId = parseInt($mediaWrapper.firstChild.dataset.mediaId);
        let index = array.findIndex((media) => media._id === mediaId);
        const lightbox = new Lightbox(array, index);
        lightbox.close();
    });

    $lightboxCloseButton.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            let mediaId = parseInt($mediaWrapper.firstChild.dataset.mediaId);
            let index = array.findIndex((media) => media._id === mediaId);
            const lightbox = new Lightbox(array, index);
            lightbox.close();
        }
    });

    $lightboxNextButton.addEventListener('click', goToNextMedia(array));

    // $lightboxNextButton.addEventListener('click', () => {
    //     let mediaId = parseInt($mediaWrapper.firstChild.dataset.mediaId);
    //     console.log(mediaId);
    //     let index = array.findIndex((media) => media._id === mediaId);
    //     const lightbox = new Lightbox(array, index);
    //     lightbox.next();
    // });

    // $lightboxNextButton.addEventListener('keypress', (e) => {
    //     if (e.key === 'Enter') {
    //         let mediaId = parseInt($mediaWrapper.firstChild.dataset.mediaId);
    //         let index = array.findIndex((media) => media._id === mediaId);
    //         const lightbox = new Lightbox(array, index);
    //         lightbox.next();
    //     }
    // });

    $lightboxPreviousButton.addEventListener('click', goToPreviousMedia);

    $lightboxPreviousButton.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            let mediaId = parseInt($mediaWrapper.firstChild.dataset.mediaId);
            let index = array.findIndex((media) => media._id === mediaId);
            const lightbox = new Lightbox(array, index);
            lightbox.previous();
        }
    });

}

function goToNextMedia(array) {
    const $mediaWrapper = document.querySelector('.lightbox__container__media');
    console.log($mediaWrapper.children.length);
    if ($mediaWrapper.children.length !== 0) {
        let mediaId = parseInt($mediaWrapper.firstChild.dataset.mediaId);
        console.log(mediaId);
        let index = array.findIndex((media) => media._id === mediaId);
        const lightbox = new Lightbox(array, index);
        lightbox.next();
    }
}

function goToPreviousMedia() {
    const $mediaWrapper = document.querySelector('.lightbox__container__media');
    let mediaId = parseInt($mediaWrapper.firstChild.dataset.mediaId);
    let index = array.findIndex((media) => media._id === mediaId);
    const lightbox = new Lightbox(array, index);
    lightbox.previous();
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
