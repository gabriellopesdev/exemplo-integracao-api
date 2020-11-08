const Order = require('../../models/order')
const Pipedrive = require('../../integrations/pipedrive')
const Bling = require('../../integrations/bling')

async function syncOrders() {
    const pipedrive = new Pipedrive()
    const bling = new Bling()
    try {
        const pipeOrders = await pipedrive.getDeals()
        await Promise.all(
            pipeOrders.map(async (pipeOrder) => {
                const parsedPipeOrder =  { 
                    id: pipeOrder.id, 
                    date: pipeOrder.won_time, 
                    order_value: pipeOrder.value 
                }
                await Order.findOneAndUpdate({ id_pipedrive: pipeOrder.id }, 
                                        parsedPipeOrder, 
                                        { upsert: true, rawResult:true}, async function(err, feedback) {
                                            if(!feedback.lastErrorObject.updatedExisting) {
                                                await bling.createOrder(pipeOrder)
                                            }
                                        })
            })
        ) 
        return pipeOrders.map((order) => {
            return { 
                id: order.id, 
                customer: order.person_id.name,
                date: order.won_time, 
                order_value: order.value 
            }
        })
    } catch (error) {
        return { erro: 'An error ocurred. Try again ' + error }
        
    }       
  }

module.exports = syncOrders