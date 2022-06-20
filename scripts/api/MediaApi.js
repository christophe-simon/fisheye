class MediaApi extends Api {
    /**
     * 
     * @param {string} url 
     */
    constructor(url) {
        super(url);
    }

    async getMediasData() {
        const data = await this.get();
        return data.photographers;
    }

    async getMediasDataByPhotographerId(photographerId) {

        const data = await this.get();
        const photographerMedias = [];
        // for (const media of data.media) {
        //     if (media.photographerId === photographerId) {
        //         photographerMedias.push(media);
        //     }
        // }
    
        data.media.find((media) => {
            if (media.photographerId === photographerId) {
                photographerMedias.push(media);
            }
        });
        return photographerMedias;

    }
}
