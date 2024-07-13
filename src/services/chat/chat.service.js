import chatModel from '../../modules/chats/chat.model.js'

const chatService = {
    getById: async (id) => {
        const query = await chatModel.findByPk(id)
        return query ? query.dataValues : undefined
    },

    create: async (chat) => {
        const query = await chatModel.create(chat)
        return query ? query.dataValues : undefined
    }
}

export default chatService