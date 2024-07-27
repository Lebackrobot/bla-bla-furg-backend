import { Router } from 'express'
import messageController from '../../controllers/message/message.controller.js'

const messageRouter = Router()

messageRouter.get('/messages/:chatId', messageController.getChatMessages)
messageRouter.post('/messages', messageController.create)

export default messageRouter