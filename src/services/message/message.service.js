import messageModel from '../../modules/messages/message.model.js'
import chatService from '../chat/chat.service.js'

const messageService = {
    getAll: async () => {
        const query = await message.findAll()
        return query ? query.dataValues : undefined
    },

    getMessagesByChatId: async (chatId) => {
        const chat = await chatService.getById(chatId)

        if (!chat) {
            return undefined
        }

        return chat.messages
    },

    create: async (message) => {
        const query = await messageModel.create(message)
        return query ? query.dataValues : undefined
    }

}

export default messageService