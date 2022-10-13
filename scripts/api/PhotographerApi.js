class PhotographerApi extends Api {
    /**
     * 
     * @param {string} url 
     */
    constructor(url) {
        super(url);
    }

    async getPhotographersData() {
        const data = await this.get();
        return data.photographers;
    }

    async getPhotographerDataByPhotographerId(photographerId) {
    
        const data = await this.get();
        return data.photographers.find(element => element.id === photographerId);
    }
}
