const clients = []

const buildMessage = (message) => {
    return `data: ${message}\n\n`
}

const broadcast = async (client, message) => {
    clients.forEach(c => {
        if (client.nickname != c.nickname) {
            c.write(buildMessage(message))
        }
    })
}

const chatController = {
    sendEvents: (request, payloadClient) => {
        try {
            payloadClient.nickname = request.query.nickname
    
            payloadClient.writeHead(200, {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache",
                Connection: "keep-alive"
            })
    


            const client = clients.find((client) => payloadClient.nickname === client && client.nickname)

            if (!client) {
                clients.push(payloadClient)
                console.log(`🖖 ${payloadClient.nickname} connected`)
                
                payloadClient.write(buildMessage(''))
                broadcast(payloadClient, `🖖 ${payloadClient.nickname} joined the chat!`)
            }

            request.on('close', () => {
                console.log('Disconnected')
            })
        }

        catch(error) {
            console.error(error)
        }
    },

    
    sendMessage: async (request, response) => {
        const { nickname, message } = request.body
        const client = { nickname }

        if (!message) {
            return response.status(400).send({ success: false, message: 'Message is empty'})
        }

        const sendMessage = `💬 ${nickname}: ${message}`

        await broadcast(client, sendMessage)
        return response.status(200).send({ success: true, message: 'Sent message!' })
    }
}

export default chatController