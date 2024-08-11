import { compare } from 'bcrypt'
import { encryptPassword, verifyPassword } from '../libs/password-crypto.js'
import roomService from '../services/room.service.js'
import userRoomService from '../services/user-room.service.js'
import responseTemplate from './../libs/response-template.js'
import { roomCreateSchema, roomMemberSchema } from './../schemas/room.schema.js'

const roomController = {
    get: async (request, response) => {
        try {
            const rooms = await roomService.get()
            return response.status(200).send({ ...responseTemplate.OK_200, info: { rooms } })
        }
        
        catch (error) {
            console.error(error)
        }

    },

    getById: async (request, response) => {
        try {
            const { id } = request.params
            const room = await roomService.getById(id)

            if (!room) {
                return response.status(404).send(responseTemplate.NOT_FOUND_404)
            }

            return response.status(200).send({ ...responseTemplate.OK_200, info: { room }})
        }

        catch (error) {
            console.error(error)
            return response.status(500).send(responseTemplate.INTERNAL_SERVER_ERROR_500)
        }
    },

    create: async (request, response) => {
        try {
            const { user } = request
            const { error, value: payload } = roomCreateSchema.validate(request.body)
    
            if (error) {
                return response.status(400).send(responseTemplate.BAD_REQUEST_400)
            }

            if (payload.visibility === 'PRIVATE' && !payload.password) {
                return response.status(400).send(responseTemplate.BAD_REQUEST_400)
            }
    
            const room = await roomService.getByName(payload.name)

            if (room) {
                return response.status(409).send({ ...responseTemplate.CONFLICT_409, message: 'Room name already exist.' })
            }

            if (payload.visibility === 'PRIVATE') {
                console.log(payload)
                payload.password = await encryptPassword(payload.password)
            }
    
            const newRoom = await roomService.create(payload)
            await userRoomService.create({ userId: user.id, roomId: newRoom.id, role: 'HOST' })
    
            return response.status(201).send({ ...responseTemplate.CREATED_201, info: { room: newRoom }})
        }

        catch (error) {
            console.error(error)
            return response.status(500).send(responseTemplate.INTERNAL_SERVER_ERROR_500)
        }
    },

    addMember: async (request, response) => {
        try {
            const { user } = request
            const { error, value: payload } = roomMemberSchema.validate(request.body)
    
            if (error) {
                return response.status(400).send(responseTemplate.BAD_REQUEST_400)
            }

            const room = await roomService.getById(payload.roomId)

            if (!room) {
                return response.status(404).send(responseTemplate.NOT_FOUND_404)
            }

            const member = await userRoomService.getMemberByUserIdAndRoomId(user.id, room.id)

            if (member) {
                return response.status(409).send(responseTemplate.CONFLICT_409)
            }

            if (payload.password && !await verifyPassword(payload.password, room.password)) {
                return response.status(400).send({...responseTemplate.BAD_REQUEST_400, message: 'Invalid password'})
            }

            await userRoomService.create({
                userId: user.id,
                roomId: room.id
            })

            return response.status(201).send(responseTemplate.CREATED_201)
        }

        catch (error) {
            console.error(error)
            return response.status(500).send(responseTemplate.INTERNAL_SERVER_ERROR_500)
        }
    }
}

export default roomController