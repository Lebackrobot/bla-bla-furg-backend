import { Router } from 'express'
import messageController from '../../controllers/message/message.controller.js'

const messageRouter = Router()

messageRouter.get('/messages', messageController.getAll)
messageRouter.post('/messages', messageController.create)

export default messageRouter