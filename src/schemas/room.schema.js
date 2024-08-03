import Joi from 'joi'

const roomCreateSchema = Joi.object({
    name: Joi.string().required(),
    password: Joi.string(),
    description: Joi.string().required(),
    visibility: Joi.string().valid('PUBLIC', 'PRIVATE').default('PUBLIC').required(),
    type: Joi.string().valid('RANDOM', 'STUDY', 'REMINDER').default('RANDOM').required()
})

const roomMemberSchema = Joi.object({
    roomId: Joi.number().required(),
    userId: Joi.number()
})


export { roomCreateSchema, roomMemberSchema }