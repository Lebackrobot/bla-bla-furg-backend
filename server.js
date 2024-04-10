import { createServer } from 'net'

let clients = []

const broadcast = (sender, header, message) => { 
    const payload = JSON.stringify({header, body: { message }})

    clients.forEach(client => {
        if (client !== sender) {
            client.write(payload)
        }
    })
}


const server = createServer(client =>  {
    client.setEncoding('utf-8')

    client.on('data', (request) => {
        const { header, body } = JSON.parse(request)

        if (header == 'CONNECTION_REQUEST') {
            client.nickname = body.nickname
            client.channels = []
            
            const params = {
                client,
                header: 'CLIENT_CONNECTION_RESPONSE',
                message: `🟢  ${client.nickname} connected to server`
            }
            
            clients.push(client)

            client.write(JSON.stringify({ header: params.header, body: { message: `🟢 You connected to server` } }))
            console.log(params.message)

            broadcast(...Object.values(params))
        }
        
        if (header == 'CLIENT_MESSAGE_REQUEST') {
            const { message } = body



            const params = {
                client,
                header: 'CLIENT_NOTIFY',
                message: `💬 ${client.nickname}: ${message}`,
            }

            broadcast(...Object.values(params))
        }

        if (header == 'JOIN_CHANNEL_REQUEST') {
            const { channel } = body

            if (client.channels.includes(channel)) {
                return
            }

            const params = { 
                client, 
                header: 'SERVER_NOTIFY', 
                message: `👋 ${client.nickname} joined the chat ${channel}`
            }
            
            client.channels.push(channel)

            console.log(params.message)
            broadcast(...Object.values(params))

        }

    })

    client.on('end', () => {
        clients = clients.filter(targetClient => targetClient !== client)
        broadcast(client, 'SERVER_NOTIFY', `🔴 ${client.nickname} left the chat`)

        console.log(`🔴 ${client.nickname} left the chat`)
    })
})

const port = 6667
server.listen(port, () => {
    console.log(`💬 IRC server listen on port ${port}`)
})