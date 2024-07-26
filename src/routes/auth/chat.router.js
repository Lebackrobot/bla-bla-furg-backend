import express from 'express'
import chatController from '../../controllers/chat/chat.controller.js'


const chatRouter = express.Router()

chatRouter.post('/chats', chatController.create)
chatRouter.get('/chats/:id', chatController.getById)
chatRouter.post('/chats/member', chatController.addMember)

export default chatRouter