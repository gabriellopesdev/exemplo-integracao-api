const router = require('express').Router()
const OrderController = require('./controllers/orders')

const orderController = new OrderController()

router.get('/', (req, res) => {
   const doc = {
      api: 'Teste Técnico - Back-end - Linkapi',
      repository: 'https://github.com/gabriellopesdev/teste-backend-linkapi',
      endpoints: [{
          route: '[GET] /syncorders',
          description: 'Faz o sincronismo dos dados, buscando oportunidades na API Pipedrive, '+
                        'cadastrando no banco MongoDB e enviando para a API Bling. ' +
                        'Retorna todos os pedidos como resultado.',
        },{
          route: '[GET] /orders',
          description:
            'Retorna os pedidos agrupados, mostrando valor total por data do pedido.',
        }
    ]}
    res.status(200).json(doc)
  })
    
router.get('/syncorders', orderController.create)

router.get('/orders', orderController.getAll)

module.exports = router