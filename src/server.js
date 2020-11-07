const AppController = require('./app')

const app = new AppController().express

app.listen(process.env.PORT || 3000)