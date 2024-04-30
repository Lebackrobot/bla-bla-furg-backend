import express from 'express'
import signupController from '../../controllers/signup/signup.controller.js'

const signupRouter = express.Router()

signupRouter.post('/signup', signupController.createUser)


export default signupRouter