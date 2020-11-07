const router = require('express').Router()

router.get('/', (req, res) => {
    return res.send('OK')
})

module.exports = router