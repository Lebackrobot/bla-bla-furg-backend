import { Router } from 'express'
import roomController from '../../controllers/room.controller.js'

const authRoomRouter = Router()

authRoomRouter.post('/rooms', roomController.create)
authRoomRouter.post('/rooms/member', roomController.addMember)

export default authRoomRouter