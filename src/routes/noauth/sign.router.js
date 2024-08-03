import { Router } from 'express'
import signController from '../../controllers/sign.controller.js'

const signRouter = Router()

signRouter.post('/signin', signController.signin)
signRouter.post('/signup', signController.signup)

export default signRouter