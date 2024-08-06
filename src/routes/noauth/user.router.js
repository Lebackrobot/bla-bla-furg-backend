import { Router } from 'express'
import userController from '../../controllers/users.controller.js'

const noauthUserRouter = Router()

noauthUserRouter.get('/users/:nickname', userController.getUserByNickname)

export default noauthUserRouter