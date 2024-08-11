import amqp from 'amqplib'
import { config } from 'dotenv'

config()

const rabbitConnect = async () => {
    const RABBIT_URL = process.env.RABBIT_URL
    const RABBIT_QUEUE = process.env.RABBIT_QUEUE_NAME

    let connection 

    try {
        connection = await amqp.connect(RABBIT_URL)
        const channel = await connection.createChannel()
        
        await channel.assertQueue(RABBIT_QUEUE, { durable: true });
        console.log('🐇 successful connecting to Rabbit')

    }

    catch (error) {
        console.error(error)
    }

    finally {
        if (connection) {
            await connection.close()
        }
    }
}

const rabbitPublish = async (message) => {
    const RABBIT_URL = process.env.RABBIT_URL
    const RABBIT_QUEUE = process.env.RABBIT_QUEUE_NAME

    let connection

    try {
        connection = await amqp.connect(RABBIT_URL)

        const channel = await connection.createChannel()
        await channel.assertQueue(RABBIT_QUEUE, { durable: true })

        channel.sendToQueue(RABBIT_QUEUE, Buffer.from(JSON.stringify(message)))
        console.log('🐇 send message to rabbit!')
    }

    catch (error) {
        console.error(error)
    }
}

export { rabbitConnect, rabbitPublish }
