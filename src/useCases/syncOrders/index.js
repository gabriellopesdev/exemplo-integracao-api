const Order = require('../../models/order')
const Pipedrive = require('../../integrations/pipedrive')
const Bling = require('../../integrations/bling')

async function syncOrders() {
    const pipedrive = new Pipedrive()
    const bling = new Bling()
    try {
        const pipeOrders = await pipedrive.getDeals()
        const resultPipeOrders = []
        await Promise.all(
            pipeOrders.map(async (pipeOrder) => {
                const orderDate = new Date(pipeOrder.won_time)
                const formatedDate = orderDate.getFullYear() + '-' + 
                                     orderDate.getMonth() + '-' +
                                     orderDate.getDate()
                const parsedPipeOrder =  { 
                    id: pipeOrder.id, 
                    customer: pipeOrder.person_id.name,
                    date: formatedDate, 
                    order_value: pipeOrder.value 
                }
                resultPipeOrders.push(parsedPipeOrder)
                await Order.findOneAndUpdate({ id_pipedrive: pipeOrder.id }, 
                                        parsedPipeOrder, 
                                        { upsert: true, rawResult:true }, async function(err, feedback) {
                                            if (err) return 
                                            if(!feedback.lastErrorObject.updatedExisting) {
                                                await bling.createOrder(pipeOrder)
                                            }
                                        })
            })
        ) 
        return resultPipeOrders
    } catch (error) {
        return { erro: 'An error ocurred. Try again ' + error }
        
    }       
  }

module.exports = syncOrders