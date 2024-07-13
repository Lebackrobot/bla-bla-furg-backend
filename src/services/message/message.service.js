import messageModel from '../../modules/messages/message.model.js'

const messageService = {
    getAll: async () => {
        const query = await message.findAll()
        return query ? query.dataValues : undefined
    },

    create: async (message) => {
        const query = await messageModel.create(message)
        return query ? query.dataValues : undefined
    }

}

export default messageService