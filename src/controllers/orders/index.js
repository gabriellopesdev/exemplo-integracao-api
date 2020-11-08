const syncOrders = require('../../useCases/syncOrders')
const listOrders = require('../../useCases/listOrders')
class OrderController {

    async create(req, res) {      
        const orders = await syncOrders()
        return res.json( orders )      
    }

    async getAll(req, res) {         
        const orders = await listOrders()
        return res.json( orders )   
    }

}


module.exports = OrderController