import chatModel from '../../modules/chats/chat.model.js'
import messageModel from '../../modules/messages/message.model.js'
import userModel from '../../modules/users/user.model.js'

const chatService = {
    get: async () => {
        const query = await chatModel.findAll({
            include: [
                { 
                    model: messageModel, 
                    as: 'messages',
                    include: {
                        model: userModel,
                        as: 'user'
                    },
                    separate: true,
                    order: [['created_at', 'ASC']]
                },
                { model: userModel }
            ]
        })

        const chats = []

        query.forEach(chat => {
            chats.push(chat.dataValues)
        })

        return chats
    },

    getById: async (id) => {
        const query = await chatModel.findByPk(id, {
            include: [{
                model: messageModel,
                as: 'messages',
                include: {
                    model: userModel,
                    as: 'user'
                },
                separate: true,
                order: [['created_at', 'ASC']]
            }]
        })

        return query ? query.dataValues : undefined
    },

    create: async (chat) => {
        const query = await chatModel.create(chat)
        return query ? query.dataValues : undefined
    }
}

export default chatService