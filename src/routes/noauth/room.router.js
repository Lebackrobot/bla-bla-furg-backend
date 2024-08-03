import { Router } from 'express'
import roomController from '../../controllers/room.controller.js'

const noauthRoomRouter = Router()

noauthRoomRouter.get('/rooms', roomController.get)
noauthRoomRouter.get('/rooms/:id', roomController.getById)

export default noauthRoomRouter