import { prisma } from '../../config/db-connect.js'

const userService = {
    getById: async (id) => {
        return await prisma.user.findUnique({
            where: { id: parseInt(id) }
        })
    }, 
    
    getByNickname: async (nickname) => {
        return await prisma.user.findUnique({
            where: { nickname}
        })
    },

    create: async () => {
        return await prisma.user.create({ data: group })
    },
}

export default userService