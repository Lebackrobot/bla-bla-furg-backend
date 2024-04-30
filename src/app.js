import express from 'express'
import { sequelize } from '../config/db-connect.js'
import { routes } from './routes/index.js'

const app = express()
routes(app)

try {
    sequelize.authenticate() 
    console.log('🗃️ Success to connect on db')
}

catch (error) {
    console.error(error)
}

export default app