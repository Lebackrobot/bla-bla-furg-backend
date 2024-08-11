let ONLINE_CLIENTS = []

const eventStreamController = {
    connectClient: async (request, client) => {
        client.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        })

        try {
            const { nickname } = request.user

            client.nickname = nickname

            const member = ONLINE_CLIENTS.find(c => c.nickname == nickname)

            if (!member) {
                console.log('👋 client connection')
                ONLINE_CLIENTS.push(client)
            }

            request.on('close', async () => {
                ONLINE_CLIENTS = ONLINE_CLIENTS.filter(c => c.nickname !== nickname)
                console.log('Disconnected')
            })
        }

        catch (error) {
            console.error(`Erro interno no servidor: ${error}`)
            client.writeHead(500, { "Content-Type": "text/plain" });
            client.end("Internal Server Error");
        }
    }
}

export { ONLINE_CLIENTS }
export default eventStreamController