function photographerFactory(data) {
    const { name, portrait, id, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;
    const place = `${city}, ${country}`;
    const dailyPrice = `${price}€/jour`;

    function getUserCardDOM() {

        // Creation of a.photographer_card__link
        const linkElt = document.createElement('a');
        linkElt.classList.add('photographer_card__link');
        linkElt.href = `photographer.html?photographer=${id}`;
        linkElt.setAttribute('tabindex', 0);
        linkElt.ariaLabel = name;

        const imgElt = document.createElement('img');
        imgElt.setAttribute('src', picture);
        imgElt.setAttribute('alt', '');

        const h2Elt = document.createElement('h2');
        h2Elt.textContent = name;

        linkElt.appendChild(imgElt);
        linkElt.appendChild(h2Elt);

        // Creation of div.photographer_card__description
        const divElt = document.createElement('div');
        divElt.classList.add('photographer_card__description');

        const placeElt = document.createElement('p');
        placeElt.classList.add('place');
        placeElt.textContent = place;

        const taglineElt = document.createElement('p');
        taglineElt.classList.add('tagline');
        taglineElt.textContent = tagline;

        const priceElt = document.createElement('p');
        priceElt.classList.add('price');
        priceElt.textContent = dailyPrice;

        divElt.appendChild(placeElt);
        divElt.appendChild(taglineElt);
        divElt.appendChild(priceElt);

        // Creation of article.photographer_card
        const articleElt = document.createElement('article');
        articleElt.classList.add('photographer_card');

        articleElt.appendChild(linkElt);
        articleElt.appendChild(divElt);


        return articleElt;
    }

    function getSpecificPhotographerDataDOM() {

        // Creation of div.photographer__header__data
        const photographerHeaderDataElt = document.createElement('div');
        photographerHeaderDataElt.classList.add('photographer__header__data');

        const nameElt = document.createElement('h1');
        nameElt.textContent = name;

        const placeElt = document.createElement('p');
        placeElt.classList.add('place');
        placeElt.textContent = place;

        const taglineElt = document.createElement('p');
        taglineElt.classList.add('tagline');
        taglineElt.textContent = tagline;

        photographerHeaderDataElt.appendChild(nameElt);
        photographerHeaderDataElt.appendChild(placeElt);
        photographerHeaderDataElt.appendChild(taglineElt);

        // Creation of div.photographer__header__button
        const photographerHeaderButtonElt = document.createElement('div');
        photographerHeaderButtonElt.classList.add('photographer__header__button');

        const buttonElt = document.createElement('button');
        buttonElt.classList.add('contact_button');
        buttonElt.textContent = 'Contactez-moi';
        buttonElt.addEventListener('click', displayModal);

        photographerHeaderButtonElt.appendChild(buttonElt);

        // Creation of div.photographer__header__picture
        const photographerHeaderPictureElt = document.createElement('div');
        photographerHeaderPictureElt.classList.add('photographer__header__picture');

        const imgElt = document.createElement('img');
        imgElt.setAttribute('src', picture);
        imgElt.setAttribute('alt', name);

        photographerHeaderPictureElt.appendChild(imgElt);

        // Creation of div.photographer__header
        const photographerHeaderElt = document.createElement('div');
        photographerHeaderElt.classList.add('photographer__header');

        photographerHeaderElt.appendChild(photographerHeaderDataElt);
        photographerHeaderElt.appendChild(photographerHeaderButtonElt);
        photographerHeaderElt.appendChild(photographerHeaderPictureElt);

        // Creation of p.photographer__way_of_ordering
        const photographerWayOfOrderingElt = document.createElement('p');
        photographerWayOfOrderingElt.classList.add('photographer__way_of_ordering');
        photographerWayOfOrderingElt.textContent = 'Trier par ...';

        // Creation of section.photographer__photos
        const photorapherPhotosElt = document.createElement('section');
        photorapherPhotosElt.classList.add('photographer__photos');

        // Creation of div.photographer
        const photographerElt = document.createElement('div');
        photographerElt.classList.add('photographer');

        photographerElt.appendChild(photographerHeaderElt);
        photographerElt.appendChild(photographerWayOfOrderingElt);
        photographerElt.appendChild(photorapherPhotosElt);


        return photographerElt;
    }

    return { name, picture, getUserCardDOM, getSpecificPhotographerDataDOM }
}