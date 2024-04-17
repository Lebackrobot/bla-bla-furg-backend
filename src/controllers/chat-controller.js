const clients = []

const buildMessage = (message) => {
    return `data: ${message}\n\n`
}

const broadcast = (client, message) => {
    clients.forEach(c => {
        if (client.username != c.username) {
            c.write(buildMessage(message))
        }
    })
}

const chatController = {
    sendEvents: (request, payloadClient) => {
        try {
            payloadClient.username = request.query.username
    
            payloadClient.writeHead(200, {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache",
                Connection: "keep-alive"
            })
    


            const client = clients.find((client) => payloadClient.username === client && client.username)

            if (!client) {
                console.log(`${payloadClient.username} connected`)
                clients.push(payloadClient)
                payloadClient.write(buildMessage('\n\n'))
                broadcast(payloadClient, `${payloadClient.username} joined the chat!`)
            }

            request.on('close', () => {
                console.log('Disconnected')
            })
        }

        catch(error) {
            console.error(error)
        }
    }

}

export default chatController