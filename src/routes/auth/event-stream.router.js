import { Router } from 'express'
import eventStreamController from '../../controllers/event-stream.controller.js'

const authEventStreamRouter = Router()

authEventStreamRouter.get('/event-stream', eventStreamController.connectClient)

export default authEventStreamRouter