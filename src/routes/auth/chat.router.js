import express from 'express'
import chatController from '../../controllers/chat/chat.controller.js'


const chatRouter = express.Router()

chatRouter.post('/chat', chatController.create)
chatRouter.get('/chat/:id', chatController.getById)
chatRouter.post('/chat/member', chatController.addMember)

export default chatRouter