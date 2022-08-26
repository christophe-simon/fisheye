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
    
    // Version 3 of this code
    const data = await this.get();
    return data.photographers.find(element => element.id === photographerId);
    
    // Version 2:
    // const data = await this.get();
    // function isThePhotographerIdentifiedById(photographer) {
    //     return photographer.id === photographerId;
    // }
    // return data.photographers.find(isThePhotographerIdentifiedById);
    
    // Version 1:
    // const data = await this.get();
    // for (const photographer of data.photographers) {
    //     if (photographer.id === photographerId) {
    //         return photographer;
    //     }
    // }
    // return null;
  }
}
