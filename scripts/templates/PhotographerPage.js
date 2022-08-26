class PhotographerPage {
  constructor(photographer) {
    this._photographer = photographer;
  }

  createPhotographerPage() {
    // Creation of a main wrapper
    const page = `
        <div class="photographer_presentation">
            <div class="photographer_presentation__data">
                <h1>${this._photographer.name}</h1>
                <p class="place">${this._photographer.city}, ${this._photographer.country}</p>
                <p class="tagline">${this._photographer.tagline}</p>
            </div>
            <div class="photographer_presentation__button">
                <button class="contact_button" tabindex="0">Contactez-moi</button>
            </div>
            <div class="photographer_presentation__picture">
                <img src="assets/photographers/${this._photographer.portrait}" alt="">
            </div>
        </div>
        <div class="photographer_portfolio">
            <div class="photographer_portfolio__sorted_by">
                <p class="legend">Trier par</p>
                <div class="dropdown_menu">
                    <div class="listbox" role="button" tabindex="0" aria-label="trier les médias par ..."
                        aria-haspopup="true" aria-expanded="false" aria-selected="true">
                        <p class="active_option">Popularité</p>
                        <i class="fa-solid fa-angle-down"></i>
                        <i class="fa-solid fa-angle-up"></i>
                    </div>
                    <div class="hidden">
                        <button class="sorting_option" value="popularity" role="listbox" tabindex="0" aria-label="tri des médias par popularité"
                            aria-selected="true">Popularité</button>
                    </div>
                    <button class="sorting_option" value="date" role="listbox" tabindex="0" aria-label="tri des médias par date"
                        aria-selected="false">Date</button>
                    <button class="sorting_option" value="title" role="listbox" tabindex="0" aria-label="tri des médias par titre"
                        aria-selected="false">Titre</button>
                </div>
            </div>
            <section class="photographer_portfolio__medias"></section>
        </div>
        <aside class="aside"></aside>
        `;
    return page;


    // Other way to do it

    // // Creation of div.photographer_presentation__data
    // const $photographerWrapper = document.createElement('div');
    // $photographerWrapper.classList.add('photographer_presentation__data');

    // // div.photographer_presentation__data contains the name of the photographer
    // const $name = document.createElement('h1');
    // $name.textContent = this._photographer.name;

    // // div.photographer_presentation__data contains the place of the photographer
    // const $place = document.createElement('p');
    // $place.classList.add('place');
    // $place.textContent = `${this._photographer.city}, ${this._photographer.country}`;

    // // div.photographer_presentation__data contains the tagline of the photographer
    // const $tagline = document.createElement('p');
    // $tagline.classList.add('tagline');
    // $tagline.textContent = this._photographer.tagline;

    // // We add the name, the place and the tagline to the photographer wrapper
    // $photographerWrapper.appendChild($name);
    // $photographerWrapper.appendChild($place);
    // $photographerWrapper.appendChild($tagline);

    // // Creation of div.photographer_presentation__button
    // const $buttonWrapper = document.createElement('div');
    // $buttonWrapper.classList.add('photographer_presentation__button');

    // // div.photographer_presentation__button contains a button
    // const $button = document.createElement('button');
    // $button.classList.add('contact_button');
    // $button.textContent = 'Contactez-moi';
    // $button.setAttribute('tabindex', 1);

    // // We add the button to the button wrapper
    // $buttonWrapper.appendChild($button);

    // // Creation of div.photographer_presentation__picture
    // const $pictureWrapper = document.createElement('div');
    // $pictureWrapper.classList.add('photographer_presentation__picture');

    // // div.photographer_presentation__picture contains a picture of the photographer
    // const $picture = document.createElement('img');
    // $picture.setAttribute('src', `assets/photographers/${this._photographer.portrait}`);
    // $picture.setAttribute('alt', `photo de ${this._photographer.name}`);

    // // We add the picture to the picture wrapper
    // $pictureWrapper.appendChild($picture);

    // // Creation of div.photographer_presentation
    // const $presentationWrapper = document.createElement('div');
    // $presentationWrapper.classList.add('photographer_presentation');

    // // We add the photographer wrapper, the button wrapper and the picture wrapper to the presentation wrapper
    // $presentationWrapper.appendChild($photographerWrapper);
    // $presentationWrapper.appendChild($buttonWrapper);
    // $presentationWrapper.appendChild($pictureWrapper);

    // // Creation of p.photographer_portfolio__sorted_by
    // const $sortedByWrapper = document.createElement('p');
    // $sortedByWrapper.classList.add('photographer_portfolio__sorted_by');
    // $sortedByWrapper.textContent = 'Trier par ...';

    // // Creation of section.photographer_portfolio__medias
    // const $mediasWrapper = document.createElement('section');
    // $mediasWrapper.classList.add('photographer_portfolio__medias');

    // // Creation of div.photographer_portfolio
    // const $portfolioWrapper = document.createElement('div');
    // $portfolioWrapper.classList.add('photographer_portfolio');

    // // We add the "sorted by" and the medias to the portfolio
    // $portfolioWrapper.appendChild($sortedByWrapper);
    // $portfolioWrapper.appendChild($mediasWrapper);

    // // Creation of aside.aside
    // const $asideWrapper = document.createElement('aside');
    // $asideWrapper.classList.add('aside');

    // // We add the presentation wrapper, the portfolio wrapper and the aside wrapper to the wrapper
    // $mainWrapper.appendChild($presentationWrapper);
    // $mainWrapper.appendChild($portfolioWrapper);
    // $mainWrapper.appendChild($asideWrapper);

    // return $wrapper.innerHTML;

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