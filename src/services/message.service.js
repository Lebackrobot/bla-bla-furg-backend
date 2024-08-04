import { prisma } from '../../config/db-connect.js'

const messageService = {
    getByRoomId: async (roomId) => {
        return await prisma.message.findMany({
            where: { roomId: parseInt(roomId) },
            include: {
                user: true 
            },

            orderBy: {
                createdAt: 'asc'
            }
        })
    },

    create: async (message) => {
        return await prisma.message.create({ data: {...message }})
    }
}

export default messageService