import { prisma } from '../../config/db-connect.js'

const roomService = {
    get: async () => {
        return await prisma.room.findMany()
    },

    getById: async (id) => {
        return await prisma.room.findUnique({ where: { id }})
    },

    create: async (room) => {
        return await prisma.room.create(room)
    }
}

export default roomService