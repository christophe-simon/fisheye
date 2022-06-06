function photographerFactory(data) {
    const { name, portrait, id, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;
    const place = `${city}, ${country}`;
    const dailyPrice = `${price}€/jour`;

    function getUserCardDOM() {
        const articleElt = document.createElement('article');
        articleElt.classList.add('photographer_card');

        const linkElt = document.createElement('a');
        linkElt.classList.add('photographer_card__link');
        linkElt.href = `photographer.html?photographer=${id}`;

        const imgElt = document.createElement('img');
        imgElt.setAttribute('src', picture);
        imgElt.setAttribute('alt', name);

        const h2Elt = document.createElement('h2');
        h2Elt.textContent = name;

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

        linkElt.appendChild(imgElt);
        linkElt.appendChild(h2Elt);

        divElt.appendChild(placeElt);
        divElt.appendChild(taglineElt);
        divElt.appendChild(priceElt);

        articleElt.appendChild(linkElt);
        articleElt.appendChild(divElt);

        return (articleElt);
    }
    return { name, picture, getUserCardDOM }
}