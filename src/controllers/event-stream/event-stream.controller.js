let clients = []

const eventStreamController = {
    clientConnection: async (request, client) => {
        
        client.writeHead(200, {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            Connection: "keep-alive"
        })

        try {
            const { nickname, email } = request.user

            client.nickname = nickname
            client.email = email

            const client_online = clients.find(c => c.nickname == nickname)

            if (!client_online) {
                clients.push(client)
            }

            request.on('close', async () => {
                clients = clients.filter(c => c.nickname !== nickname)
                console.log('Disconnected')
            })
        }

        catch (error) {
            console.error(error)
            client.writeHead(500, { "Content-Type": "text/plain" });
            client.end("Internal Server Error");
        }
    }
}

export { clients }
export default eventStreamController