import { messageCreateSchema } from '../../modules/messages/message.schema.js'
import chatService from '../../services/chat/chat.service.js'
import messageService from '../../services/message/message.service.js'
import userChatService from '../../services/user-chat/user-chat.service.js'

const messageController = {
    create: async (request, response) => {
        try {
            const { id: userId } = request.user
            const { error, value: payload } = messageCreateSchema.validate(request.body)

            if (error) {
                console.error(error)
                return response.status(400).send({ success: false, message: error.details })
            }

            const chat = await chatService.getById(payload.chatId)

            if (!chat) {
                return response.status(404).send({ success: false, message: 'Not found chat'})
            }

            const userChat = await userChatService.getByUserIdAndChatId(userId, chat.id)

            if (!userChat) {
                return response.status(401).send({ success: false, message: 'Unauthorized'})
            }

            const { id: chatId } = chat
            const { content } = payload

            const message = await messageService.create({ content, chat_id: chatId, user_id: userId })
            return response.status(200).send({ message: true, data: { message }, message: 'Success to get message'})
        }

        catch (error) {
            console.error(error)
            return response.status(500).send({ success: false, message: 'Internal server error'})
        }
    },

    getAll: async (request, response) => {
        try {
            const messages = messageService.getAll()
            return response.status(200).send({ success: true, data: { messages }, message: 'Success to get mesages' })
        }

        catch (error) {
            console.error(error)
            return response.status(500).send({ success: false, message: 'Internal server error'})
        }
    }
}

export default messageController