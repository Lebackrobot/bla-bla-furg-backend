import responseTemplate from '../libs/response-template.js'
import userRoomService from '../services/user-room.service.js'

const userController = {
    getUserByNickname: async (request, response) => {
        try {
            const { nickname } = request.params
            const user = await userRoomService.getUserByNickname(nickname)

            if (!user) {
                return response.status(404).send(responseTemplate.NOT_FOUND_404)
            }

            return response.status(200).send({...responseTemplate.OK_200, info: { user }})
        }

        catch (error) {
            console.error(error)
            return response.status(500).send(responseTemplate.INTERNAL_SERVER_ERROR_500)
        }
    },
}

export default userController