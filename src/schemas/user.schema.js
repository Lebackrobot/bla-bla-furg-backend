import Joi from "joi"

const userCreateSchema = Joi.object({
    nickname: Joi.string().required(),
    password: Joi.string().required(),
    avatar: Joi.string().required()
})

export { userCreateSchema }