const Order = require('../../models/order')

async function listOrders() {
    try {
        const orders = await Order.aggregate([{ 
            $group: { 
                _id: '$date',
                values: { $sum: '$order_value' }
            }
        }])     
        return orders.map((order) => { return { date: order._id, total: order.values } })
    } catch (error) {
        return { erro: 'An error ocurred. Try again ' + error }
    }       
  }

module.exports = listOrders