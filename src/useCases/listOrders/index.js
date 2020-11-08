const Order = require('../../models/order')

async function listOrders() {
    try {
        const orders = await Order.find()       
        return orders
    } catch (error) {
        return { erro: 'An error ocurred. Try again ' + error }
    }       
  }

module.exports = listOrders