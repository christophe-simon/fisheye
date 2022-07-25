class Aside {
    constructor(photographer, medias) {
        this._photographer = photographer;
        this._medias = medias;
    }

    getTotalLikes() {
        return this._medias.reduce(
          (previousValue, currentValue) => previousValue + currentValue.likes, 0);

        // Other way to do it:
        // let sum = 0
        // for (let element of this._medias) {
        //     sum += element.likes;
        // }
        // return sum;
    }

    createAside() {
        const wrapper = `
            <span class="aside__total_likes">
                <span id="total_number_of_likes">${this.getTotalLikes()}</span> <i class="fa-solid fa-heart" aria-label="likes"></i>
            </span>
            <span class="aside__daily_price">
                250€/jour
            </span>
        `;
        return wrapper;



        // Other way to write it:

        // Creation of span.aside__total_likes
        // const asideTotalLikesElt = document.createElement('span');
        // asideTotalLikesElt.classList.add('aside__total_likes');

        // asideTotalLikesElt.innerHTML = `${this.getTotalLikes()} <i class="fa-solid fa-heart" aria-label="likes"></i>`;

        // // Creation of span.photographer_presentation__button
        // const asideDailyPriceElt = document.createElement('span');
        // asideDailyPriceElt.classList.add('aside__daily_price');

        // asideDailyPriceElt.textContent = `${this._photographer.price}€/jour`;

        // // Creation of a blank element
        // const blankElt = document.createElement('div');

        // blankElt.appendChild(asideTotalLikesElt);
        // blankElt.appendChild(asideDailyPriceElt);

        // return blankElt.innerHTML;

    }
}