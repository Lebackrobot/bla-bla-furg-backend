import chatModel from '../../modules/chats/chat.model.js'
import messageModel from '../../modules/messages/message.model.js'
import userModel from '../../modules/users/user.model.js'

const messageService = {
    getAll: async () => {
        const query = await message.findAll()
        return query ? query.dataValues : undefined
    },


    getMessagesByChatId: async (chatId) => {
        const query = await chatModel.findByPk(chatId, {
            include: {
                model: messageModel,
                as: 'messages',
                include: {
                    model: userModel,
                    as: 'user'
                }
            }
        })

        const chat = query ? query.dataValues : undefined

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