import Joi from 'joi'

const messageCreateSchema = Joi.object({
    content: Joi.string().required(),
    chatId: Joi.number().required(),
})

export { messageCreateSchema }