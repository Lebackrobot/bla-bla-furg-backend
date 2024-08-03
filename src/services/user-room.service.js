import { prisma } from '../../config/db-connect.js'

const userRoomService = {
    getMemberByUserIdAndRoomId: async (userId, roomId) => {
        return await prisma.userRoom.findFirst({
            where: {
                userId: userId,
                roomId: roomId
            }
        })
    },

    create: async (userRoom) => {
        return await prisma.userRoom.create({ data: {...userRoom}})
    }

}

export default userRoomService