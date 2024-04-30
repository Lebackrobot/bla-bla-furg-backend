import express from 'express'
import signinController from '../../controllers/signin/signin.controller.js'

const signinRouter = express.Router() 

signinRouter.post('/signin', signinController.signin)

export default signinRouter