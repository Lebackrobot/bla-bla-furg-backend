import { messageCreateSchema } from '../../modules/messages/message.schema.js'
import chatService from '../../services/chat/chat.service.js'
import messageService from '../../services/message/message.service.js'
import userChatService from '../../services/user-chat/user-chat.service.js'
import { clients } from '../event-stream/event-stream.controller.js'

const messageBroadcast = async (client, chatId, message) => {

    clients.forEach(async (c) => {
        const { id: userId, nickname } = client

        if (c.nickname != nickname) {
            const userChat = await userChatService.getByUserIdAndChatId(userId, chatId)

            const  responseJson = JSON.stringify({
                chatId: chatId
            })

            if (userChat) {
                c.write(`data: ${responseJson}\n\n`)
            }
        }
    })
}

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
                return response.status(404).send({ success: false, message: 'Chat não encontrado.'})
            }

            const userChat = await userChatService.getByUserIdAndChatId(userId, chat.id)

            if (!userChat) {
                return response.status(401).send({ success: false, message: 'Não autorizado.'})
            }

            const { content } = payload
            const message = await messageService.create({ content, chat_id: chat.id, user_id: userId })
            
            messageBroadcast(request.user, chat.id, message)

            return response.status(200).send({ success: true, info: { message }, message: 'Sucesso para criar a mensagem.'})
        }

        catch (error) {
            console.error(error)
            return response.status(500).send({ success: false, message: 'Erro interno no servidor.'})
        }
    },

    getChatMessages: async (request, response) => {
        try {
            const { chatId } = request.params
            const messages = await messageService.getMessagesByChatId(chatId)

            if (!messages) {
                return response.status(404).send({ success: false, message: 'Chat não encontrado.'})
            }
            
            return response.status(200).send({ success: true, info: { messages }, message: 'Mensagens consultadas com sucesso' })            
        }

        catch (error) {
            console.error(error)
            return response.status(500).send({ success: false, message: 'Erro interno no servidor.'})
        }
    }
}

export default messageController