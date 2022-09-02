class Api {
    /**
     * 
     * @param {string} url 
     */
    constructor(url) {
        this._url = url;
    }

    async get() {
        const response = await fetch(this._url);
        const data = await response.json();
        return data;
    }
}
