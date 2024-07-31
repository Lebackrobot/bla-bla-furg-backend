import dicebearApi from '../../apis/dicebear.api.js'
import invertexto from '../../apis/invertexto.api.js'
import { encryptPassword } from '../../libraries/password-crypto.js'
import { getRandomName } from '../../libraries/random-name.js'
import { userCreateSchema } from '../../modules/users/user.schema.js'
import userService from '../../services/user/user.service.js'
import jwt from 'jsonwebtoken'

const signupController = {
    create: async (request, response) => {
        try {
            const { error, value: payload } = userCreateSchema.validate(request.body)

            if (error) {
                console.error(error)
                return response.status(400).send({ success: false, message: error.details })
            }

            let user = await userService.getByEmail(payload.email) || await userService.getByNickname(payload.nickname)
            
            if (user) {
                return response.status(409).send({ success: false, message: 'Email ou nickname já existe.'})
            }

            payload.password = await encryptPassword(payload.password)
            const newUser = await userService.create(payload)

            const secretKey = process.env.JWT_SECRET_KEY
            const token = jwt.sign({ userId: newUser.id }, secretKey)

            return response.status(201).send({ success: true, info: { token, userId: newUser.id }, message: 'Sucesso ao criar usuário.' })
        }

        catch (error) {
            console.error(error)
            return response.status(500).send({ success: false, message: 'Erro interno no servidor'})
        }
    },

    makeAvatar: async (request, response) => {
        //const name = await invertexto.getRandomName()
        const name = await getRandomName()
        const avatar = await dicebearApi.getImageByName(name)

        return response.status(200).send({ success: true, info: {avatar, name}, message: 'Avatar criado com sucesso.'})
    }
}

export default signupController