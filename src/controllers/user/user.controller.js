import userService from "../../services/user/user.service"

const userController = {
    getByEmail: async (request, response) => {
        const { email } = request.params

        if (!email) {
            return response.status(404).message({ success: false, message: 'Usuário não encontrado.'})
        }

        const user = await userService.getByEmail(email)

        return response.status(200).message({ success: true, message: 'Usuário encontrado com sucesso.'})
    }
}

export default userController