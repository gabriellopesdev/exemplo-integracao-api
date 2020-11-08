const Order = require('../../models/order')
const Pipedrive = require('../../integrations/pipedrive')

async function syncOrders() {
    const pipedrive = new Pipedrive()
    try {
        const pipeOrders = await pipedrive.getDeals()
        await Promise.all(
            pipeOrders.map(async (pipeOrder) => {
                await Order.findOneAndUpdate({ id_pipedrive: pipeOrder.id }, 
                                        pipeOrder, 
                                        { upsert: true })
            })
        ) 
        return pipeOrders 
    } catch (error) {
        return { erro: 'An error ocurred. Try again ' + error }
    }       
  }

module.exports = syncOrders