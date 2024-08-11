import { prisma } from '../../config/db-connect.js'

const roomService = {
    get: async () => {
        return await prisma.room.findMany({
            include: {
                members: true
            }
        })
    },

    getByName: async (name) => {
        return await prisma.room.findFirst({
            where: {
                name: {
                    contains: name,
                    mode: 'insensitive',
                }
            }
        })
    },

    getById: async (id) => {
        return await prisma.room.findUnique({
            where: { id: parseInt(id) },
            include: {
                members: {
                    include: {
                        user: true
                    }
                }
            }
        })

    },

    create: async (room) => {
        return await prisma.room.create({ data: { ...room }})
    },

    getRoomMemberById: async (roomId) => {
        const room = await prisma.room.findUnique({
            where: {
                id: parseInt(roomId)
            },

            include: {
                members: true
            }
        })

        return room ? room.members : []
    }
}

export default roomService