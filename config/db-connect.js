import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

const sequelize = new Sequelize(process.env.DB_STRING_CONNECTION, {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
})

export { sequelize }
