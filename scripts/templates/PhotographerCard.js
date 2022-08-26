class PhotographerCard {
  constructor(photographer) {
    this._photographer = photographer;
  }

  createPhotographerCard() {
    // 1. Creation of a.photographer_card__link
    const $link = document.createElement('a');
    $link.classList.add('photographer_card__link');
    $link.href = `photographer.html?photographer=${this._photographer.id}`;
    $link.setAttribute('tabindex', '0');
    $link.setAttribute('aria-label', this._photographer.name);

    // a.photographer_card__link contains the picture of the photographer
    const $img = document.createElement('img');
    $img.setAttribute('src', this._photographer.portrait);
    $img.setAttribute('alt', this._photographer.name);

    // a.photographer_card__link contains the name of the photographer
    const $name = document.createElement('h2');
    $name.textContent = this._photographer.name;

    // We add the image and the name to the link
    $link.appendChild($img);
    $link.appendChild($name);

    // We add the possibility to "click" on the link by pressing the "Enter" key while the link is focused
    $link.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        window.location.href = `photographer.html?photographer=${this._photographer.id}`;
      }
    });

    // 2. Creation of div.photographer_card__description
    const $description = document.createElement('div');
    $description.classList.add('photographer_card__description');

    //div.photographer_card__description contains the place where lives the photographer
    const $place = document.createElement('p');
    $place.classList.add('place');
    $place.textContent = `${this._photographer.city}, ${this._photographer.country}`;

    //div.photographer_card__description contains the tagline of the photographer
    const $tagline = document.createElement('p');
    $tagline.classList.add('tagline');
    $tagline.textContent = this._photographer.tagline;

    //div.photographer_card__description contains the price of the photographer
    const $price = document.createElement('p');
    $price.classList.add('price');
    $price.textContent = `${this._photographer.price}€/jour`;

    // We add the place, the tagline and the price to the description
    $description.appendChild($place);
    $description.appendChild($tagline);
    $description.appendChild($price);

    // 3. Creation of article.photographer_card
    const $article = document.createElement('article');
    $article.classList.add('photographer_card');

    // We add the link and the description to the article
    $article.appendChild($link);
    $article.appendChild($description);


    return $article;

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