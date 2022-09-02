class Aside {
    constructor(photographer, medias) {
        this._photographer = photographer;
        this._medias = medias;
    }

    getTotalLikes() {
        return this._medias.reduce(
            (previousValue, currentValue) => previousValue + currentValue.likes, 0
        );
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

    }
}