const axios = require('axios')

class Pipedrive {
    constructor() {
        this.api = axios.create({
            baseURL: process.env.URL_PIPEDRIVE,
            timeout: 5000,
        })
        this.key = process.env.KEY_PIPEDRIVE
    }

    async getDeals() {
        const result = await this.api.get('deals?status=won&start=0&api_token=' + this.key)        
        return result.data.data
    }
}

module.exports = Pipedrive