
/**
 * property {HTMLElement} element
 */
 class Lightbox {

    constructor(array, position) {
        this._array = array;
        this._position = position;
    }

    /*static init() {
        const links = document.querySelectorAll('a[href$=".png"], a[href$=".jpg"], a[href$=".jpeg"]')
            .forEach(link => link.addEventListener('click', e=> {
                e.preventDefault();
                new Lightbox(e.currentTarget.getAttribute('href'));
            })
        );
    }*/

    /**
     * @param {string} url URL of the picture
     */
    // constructor() {
        // /*this.element = this.buildLightbox(url);*/
        // /*this.loadImage(url);
        // this.onKeyUp = this.onKeyUp.bind(this);*/
        // /*document.body.appendChild(this.element);*/
        // /*document.addEventListener('keyup', this.onKeyUp);*/
    // }

    display() {
        const $lightbox = document.getElementById('lightbox');
        $lightbox.showModal();
        const $mediaWrapper = document.querySelector('.lightbox__container__media');
        const media = this._array[this._position];
        
        if (media instanceof Image) {
            const imageCardTemplate = new ImageCard(media);
            imageCardTemplate.createLightboxImageCard();
        } else if (media instanceof Video) {
            const videoCardTemplate = new VideoCard(media)
            videoCardTemplate.createLightboxVideoCard();
        }
        const $title = document.querySelector('.lightbox__container__title');
        const title = media._title;
        $title.textContent = title;
    }

    reinitialize() {
        const $mediaWrapper = document.querySelector('.lightbox__container__media');
        const $titleWrapper = document.querySelector('.lightbox__container__title');
        if ($mediaWrapper.firstChild) {
            $mediaWrapper.firstChild.remove();
        }
        $titleWrapper.textContent = '';
    }


    /**
     * @param {string} url URL of the picture
     */
    // loadImage(url) {
    //     this.url = null;
    //     const image = new Image();
    //     const container = this.element.querySelector('.lightbox__container');
    //     const loader = document.createElement('.div');
    //     loader.classList.add('lightbox__loader');
    //     container.appendChild(loader);
    //     image.onload = function() {
    //         console.log('chargé');
    //         /* container.removeChild(loader);
    //         container.appendChild(image);
    //         this.url = url; */
    //     }
    //     image.src = url
    // }

    /**
     * @param {KeyboardEvent} e 
     */
    onKeyUp(e) {
        if (e.key === 'Escape') {
            this.close(e);
        }
    }

    /**
     * Close the lightbox
     * @param {MouseEvent|KeyboardEvent} e 
     */
    close(e) {
        // e.preventDefault();
        //this.element.classList.add(fadeOut);
        // window.setTimeout(() => {
        //     this.element.parentElement.removeChild(this.element)
        // }, 500)
        // document.removeEventListener('keyup', this.onKeyUp);
        const $lightbox = document.getElementById('lightbox');
        $lightbox.style.display = 'none';
    }

    /**
    * @param {MouseEvent|KeyboardEvent} e 
    */
    next (e) {
    e.preventDefault()
    let i = this.images.findIndex(image => image === this.url)
    if (i === this.images.length - 1) {
      i = -1
    }
    this.loadImage(this.images[i + 1])
    }

    /**
    * @param {MouseEvent|KeyboardEvent} e 
    */
    prev (e) {
    e.preventDefault()
    let i = this.images.findIndex(image => image === this.url)
    if (i === 0) {
      i = this.images.length
    }
    this.loadImage(this.images[i - 1])
    }



    /**
     * @param {string} title Title of the media 
     * @param {string} url URL of the media
     * @return {HTMLElement}
     */
    // buildLightbox(title, url) {
    //     const lightbox = document.getElementById('lightbox');
    //     lightbox.innerHTML = `<button class="lightbox__close">Fermer<i class="fa-solid fa-xmark"></i></button>
    //     <button class="lightbox__next">Suivant<i class="fa-solid fa-angle-right"></i></button>
    //     <button class="lightbox__prev">Précédent<i class="fa-solid fa-angle-left"></i></button>
    //     <div class="lightbox__container1">
    //         <div class="lightbox__container2">
    //             <div class="lightbox__container__media">
    //                 <!--<div class="lightbox__loader"></div>-->
    //                 <img src="${url}" alt="">
    //             </div>
    //             <p class="lightbox__container__title">
    //                 ${title}
    //             </p>
    //         </div>
    //     </div>`;
        /*dom.querySelector('.lightbox__close').addEventListener('click', this.close.bind(this));
        dom.querySelector('.lightbox__next').addEventListener('click', this.next.bind(this));
        dom.querySelector('.lightbox__prev').addEventListener('click', this.prev.bind(this));*/
    //     return lightbox;
    // }

}

/*Lightbox.init();*/