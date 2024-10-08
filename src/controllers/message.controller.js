import responseTemplate from '../libs/response-template.js'
import { messageCreateSchema } from '../schemas/message.schema.js'
import messageService from '../services/message.service.js'
import roomService from '../services/room.service.js'
import userRoomService from '../services/user-room.service.js'
import { ONLINE_CLIENTS } from '../controllers/event-stream.controller.js'

const messageBroadcast = async (user, room, message) => {
    ONLINE_CLIENTS.forEach(clientSocket => {

        if (clientSocket.nickname != user.nickname) {
            const responseJson = JSON.stringify({ roomId: room.id, message })

            const roomMember = room.members.find(member => member.user.nickname === user.nickname)

            if (roomMember) {
                clientSocket.write(`data: ${responseJson}\n\n`)
            }
        }
    })
}

const messageController = {
    getByRoomId: async (request, response) => {
        try {
            const { roomId } = request.params
            const messages = await messageService.getByRoomId(roomId)

            return response.status(200).send({ ...responseTemplate.OK_200, info: { messages }})
        }

        catch (error) {
            console.error(error)
            return response.status(false).send(responseTemplate.INTERNAL_SERVER_ERROR_500)
        }
    },

    create: async (request, response) => {
        try {
            const { user } = request
            const { error, value: payload } = messageCreateSchema.validate(request.body)

            if (error) {
                return response.status(400).send(responseTemplate.BAD_REQUEST_400)
            }

            const room = await roomService.getById(payload.roomId)
            

            if (!room) {
                return response.status(404).send(responseTemplate.NOT_FOUND_404)
            }
            
            const member = await userRoomService.getMemberByUserIdAndRoomId(user.id, room.id)
            
            if (!member) {
                return response.status(404).send(responseTemplate.NOT_FOUND_404)
            }


            const message = await messageService.create({ ...payload, userId: user.id})
            
            // 🐇 Abordando a ideia do Rabbit MQ
            // await rabbitPublish(newMessage)

            messageBroadcast(user, room, message)

            return response.status(201).send(responseTemplate.CREATED_201)
        }

        catch (error) {
            console.error(error)
            return response.status(500).send(responseTemplate.INTERNAL_SERVER_ERROR_500)
        }
    }
}

export default messageController