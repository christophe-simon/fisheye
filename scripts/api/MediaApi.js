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
    return data.media.filter(element => element.photographerId === photographerId);

  }
}
