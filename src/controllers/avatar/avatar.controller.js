import dicebearApi from "../../apis/dicebear.api"
import invertexto from "../../apis/invertexto.api"

const avatarController =  {
    makeAvatar: async (request, response) => {
        const name = await invertexto.getRandomName()
        const avatar = await dicebearApi.getImageByName(name)

        return response.status(200).send({ success: true, avatar, message: 'Avatar criado com sucesso.' })
    }
}

export default avatarController