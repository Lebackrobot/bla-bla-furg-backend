import Joi from 'joi'

const messageCreateSchema = Joi.object({
    roomId: Joi.number().required(),
    content: Joi.string().required(),
    userId: Joi.number(),
})

export { messageCreateSchema }