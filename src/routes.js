const router = require('express').Router()
const OrderController = require('./controllers/orders')

const orderController = new OrderController()

router.get('/', (req, res) => {
    return res.send('Server listen')
})
    
router.get('/syncorders', orderController.create)

router.get('/orders', orderController.getAll)

module.exports = router