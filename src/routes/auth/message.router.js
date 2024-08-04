import { Router } from 'express'
import messageController from '../../controllers/message.controller.js'

const authMessageRouter = Router()

authMessageRouter.post('/messages', messageController.create)
authMessageRouter.get('/messages/:roomId', messageController.getByRoomId)

export default authMessageRouter