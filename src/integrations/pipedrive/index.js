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
        
        const parsedResult = result.data.data.map((deal) => {
            return { id: deal.id, date: deal.won_time, order_value: deal.value }
        })
        return parsedResult
    }


}

module.exports = Pipedrive