import jwt from 'jsonwebtoken'
import { encryptPassword, verifyPassword } from '../libs/password-crypto.js'
import userService from '../services/user.service.js'
import responseTemplate from '../libs/response-template.js'
import { userCreateSchema } from '../schemas/user.schema.js'

const signController = {
    signin: async (request, response) => {
        try {
            const { nickname, password } = request.body

            if (!nickname || !password) {
                return response.status(400).send(responseTemplate.BAD_REQUEST_400)
            }

            const user = await userService.getByNickname(nickname)

            if(!user) {
                return response.status(400).send(responseTemplate.NOT_FOUND_404)
            }

            const authorizedPassword = await verifyPassword(password, user.password)

            if (!authorizedPassword) {
                return response.status(401).send({ ...responseTemplate.UNAUTHORIZED_401 })
            }

            const secretKey = process.env.JWT_SECRET_KEY
            const token = jwt.sign({ userId: user.id }, secretKey);

            return response.status(200).send({ ...responseTemplate.OK_200, info: { token, userId: user.id } })
        }

        catch (error) {
            console.error(error)
            return response.status(500).send(responseTemplate.INTERNAL_SERVER_ERROR_500)
        }

    },

    signup: async (request, response) => {
        try {
            const { error, value: payload } = userCreateSchema.validate(request.body)

            if (error) {
                return response.status(400).send(responseTemplate.BAD_REQUEST_400)
            }

            const user = await userService.getByNickname(payload.nickname)

            if (user) {
                return response.status(409).send(responseTemplate.CONFLICT_409)
            }

            if (error) {
                return response.status(400).send(responseTemplate.BAD_REQUEST_400)
            }


            payload.password = await encryptPassword(payload.password)
            
            const newUser = await userService.create(payload)

            const secretKey = process.env.JWT_SECRET_KEY
            const token = jwt.sign({ userId: newUser.id}, secretKey)

            console.log(newUser.id)

            return response.status(201).send({ ...responseTemplate.CREATED_201, info: { userId: newUser.id, token } })
        }

        catch (error) {
            console.error(error)
            return response.status(500).send(responseTemplate.INTERNAL_SERVER_ERROR_500)
        }
    }
}

export default signController