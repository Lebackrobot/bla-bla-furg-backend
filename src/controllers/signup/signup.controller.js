import dicebearApi from '../../apis/dicebear.api.js'
import invertexto from '../../apis/invertexto.api.js'
import { encryptPassword } from '../../libraries/password-crypto.js'
import { userCreateSchema } from '../../modules/users/user.schema.js'
import userService from '../../services/user/user.service.js'
import jwt from 'jsonwebtoken'

const signupController = {
    create: async (request, response) => {
        try {
            console.log(request.body)
            const { error, value: payload } = userCreateSchema.validate(request.body)

            if (error) {
                console.error(error)
                return response.status(400).send({ success: false, message: error.details })
            }

            let user = await userService.getByEmail(payload.email) || await userService.getByNickname(payload.nickname)
            
            if (user) {
                return response.status(409).send({ success: false, message: 'Email or nickname alredy exist'})
            }

            if (payload.avatar) {
                payload.avatar = Buffer.from(payload.avatar, 'utf-8')
            }

            payload.password = await encryptPassword(payload.password)
            const newUser = await userService.create(payload)

            const secretKey = process.env.JWT_SECRET_KEY
            const token = jwt.sign({ userId: user.id }, secretKey)

            return response.status(201).send({ success: true, data: { userId: newUser.id, token }, message: 'Success to create user' })
        }

        catch (error) {
            console.error(error)
            return response.status(500).send({ success: false, message: 'Internal server error'})
        }
    },

    makeAvatar: async (request, response) => {
        const name = await invertexto.getRandomName()
        const avatar = await dicebearApi.getImageByName(name)

        return response.status(200).send({ success: true, avatar, message: 'Avatar criado com sucesso.'})
    }
}

export default signupController