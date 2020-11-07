require('dotenv').config()

const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const Connection = require('./config/database')

class AppController {

    constructor() {        
        this.express = express()
        this.middlewares()
        this.routes()
        this.con = new Connection()
    }

  middlewares() {
    this.express.use(express.json())
    this.express.use(cors())
  }

  routes() {
    this.express.use(routes)
  }
}

module.exports = AppController