import express from 'express'

import chatController from '../controllers/chat-controller.js'

const chatRouter = express.Router()

chatRouter.get('/', chatController.sendEvents)
chatRouter.post('/', chatController.sendMessage)

export default chatRouter