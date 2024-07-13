import userChatModel from '../../modules/user-chat/user-chat.model.js'

const userChatService = {
    getAll: async () => {
        const query = await userChatModel.findAll()
        return query ? query.dataValues : undefined
    },

    create: async (userChat) => {
        const query = await userChatModel.create(userChat)
        return query ? query.dataValues : undefined
    },

    getByUserIdAndChatId: async (userId, chatId) => {
        const query = await userChatModel.findOne({where: { user_id: userId, chat_id: chatId }})
        return query ? query.dataValues : undefined
    }
}

export default userChatService