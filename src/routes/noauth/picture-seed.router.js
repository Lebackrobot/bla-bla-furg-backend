import { Router } from 'express'
import pictureSeedController from '../../controllers/picture-seed.controller.js'

const noatuhPictureSeedRouter = Router () 

noatuhPictureSeedRouter.get('/picture-seed', pictureSeedController.getRandom)

export default noatuhPictureSeedRouter