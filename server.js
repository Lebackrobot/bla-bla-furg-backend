import { rabbitConnect } from './config/rabbit-connect.js'
import app from './src/app.js'
import dotenv from 'dotenv'


const startServer = async () => {
    dotenv.config()
    const port = process.env.PORT || 4000

    // await rabbitConnect()
    app.listen(port, () => console.log(`💬 Server listen on port ${port}`))
}

startServer()