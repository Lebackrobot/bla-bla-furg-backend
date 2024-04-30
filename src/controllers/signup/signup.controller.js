import { encryptPassword } from '../../libraries/password-crypto.js'
import { userCreateSchema } from '../../modules/users/user.schema.js'
import userService from '../../services/user/user.service.js'

const signupController = {
    createUser: async (request, response) => {
        try {
            const { error, value: payload } = userCreateSchema.validate(request.body)

            if (error) {
                return response.status(400).send({ success: false, message: error.details })
            }

            let user = await userService.getByEmail(payload.email) || await userService.getByNickname(payload.nickname)
            
            if (user) {
                return response.status(409).send({ success: false, message: 'Email or nickname alredy exist'})
            }

            payload.password = await encryptPassword(payload.password)
            const newUser = await userService.createUser(payload)

            return response.status(201).send({ success: true, data: { user: newUser }, message: 'Success to create user' })
        }

        catch (error) {
            console.error(error)
            return response.status(500).send({ success: false, message: 'Internal server error'})
        }
    }
}

export default signupController