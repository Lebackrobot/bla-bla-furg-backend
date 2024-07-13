import express from 'express'
import eventStreamController from '../../controllers/event-stream/event-stream.controller.js'

const eventStreamRouter = express.Router()

eventStreamRouter.get('/event-stream', eventStreamController.clientConnection)

export default eventStreamRouter