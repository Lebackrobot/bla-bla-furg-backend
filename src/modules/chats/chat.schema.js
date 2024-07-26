import Joi from 'joi'

const chatCreateSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    visibility: Joi.string().valid('PUBLIC', 'PRIVATE').required(),
    type: Joi.string().valid('STUDY', 'NOTIFY', 'FUN').required(),
    password: Joi.string()
})

const chatMemberSchema = Joi.object({
    chatId: Joi.number().required(),
    password: Joi.string()
})

export { chatCreateSchema, chatMemberSchema }