const mongoose = require('mongoose')

class Connection {
    constructor() {
        const url =
            process.env.DATABASE_CON
            mongoose.set('useNewUrlParser', true)
            mongoose.set('useUnifiedTopology', true)
            mongoose.connect(url).then(() => {
                console.log('Database connected')
            })
    }
}

module.exports = Connection