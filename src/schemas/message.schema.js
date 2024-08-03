import Joi from 'joi'

const messageCreateSchema = Joi.object({
    userId: Joi.integer(),
    roomId: Joi.integer(),
    content: Joi.string()
})

export { messageCreateSchema }